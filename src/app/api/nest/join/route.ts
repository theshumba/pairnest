import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { audit } from "@/lib/audit";

const BodySchema = z.object({
  code: z.string().min(3),
});

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  const nest = await prisma.nest.findUnique({
    where: { code: parsed.data.code },
    include: { members: true },
  });

  if (!nest) {
    return NextResponse.json({ error: "Code not found" }, { status: 404 });
  }

  if (nest.codeUsed) {
    return NextResponse.json({ error: "Code already used" }, { status: 409 });
  }

  if (nest.codeExpiresAt && nest.codeExpiresAt < new Date()) {
    return NextResponse.json({ error: "Code expired" }, { status: 410 });
  }

  if (nest.members.length >= 2) {
    return NextResponse.json({ error: "Nest full" }, { status: 409 });
  }

  await prisma.nestMember.create({
    data: { nestId: nest.id, userId: user.id, role: "member" },
  });

  await prisma.nest.update({
    where: { id: nest.id },
    data: { codeUsed: true },
  });

  await audit(nest.id, user.id, "nest.join", { code: parsed.data.code });

  return NextResponse.json({ nestId: nest.id });
}
