import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateInviteCode } from "@/lib/invite";
import { getSessionUser } from "@/lib/auth";
import { audit } from "@/lib/audit";

export async function POST() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const code = generateInviteCode();
  const nest = await prisma.nest.create({
    data: {
      code,
      codeExpiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
      members: {
        create: [{ userId: user.id, role: "member" }],
      },
      settings: JSON.stringify({ promptDepth: "light" }),
    },
  });

  await audit(nest.id, user.id, "nest.create", { code });

  return NextResponse.json({ nestId: nest.id, code });
}
