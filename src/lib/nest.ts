import { DEMO_MODE, demoNestId } from "@/lib/demo";

export async function getActiveNestForUser(userId: string) {
  if (DEMO_MODE) {
    return {
      id: demoNestId(),
      biomeId: "cloud_loft",
      growthStage: 2,
      growthPoints: 18,
    } as const;
  }

  const { prisma } = await import("@/lib/db");
  const membership = await prisma.nestMember.findFirst({
    where: { userId },
    include: { nest: true },
  });

  return membership?.nest ?? null;
}
