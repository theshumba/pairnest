import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { DEMO_MODE, demoNestId } from "@/lib/demo";

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({
      nestId: demoNestId(),
      biomeId: "cloud_loft",
      growthStage: "sprout",
      growthPoints: 7,
    });
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const membership = await prisma.nestMember.findFirst({
    where: { userId: user.id },
    include: { nest: true },
  });

  if (!membership) {
    return NextResponse.json({ error: "No nest" }, { status: 404 });
  }

  const { nest } = membership;

  return NextResponse.json({
    nestId: nest.id,
    biomeId: nest.biomeId,
    growthStage: nest.growthStage,
    growthPoints: nest.growthPoints,
  });
}
