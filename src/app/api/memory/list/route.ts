import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await prisma.nestMember.findFirst({
    where: { userId: user.id },
  });
  if (!membership) {
    return NextResponse.json({ error: "No nest" }, { status: 404 });
  }

  const memories = await prisma.memory.findMany({
    where: { nestId: membership.nestId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ memories });
}
