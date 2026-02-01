import { prisma } from "@/lib/db";
import { DEMO_MODE } from "@/lib/demo";

export async function audit(
  nestId: string,
  userId: string,
  action: string,
  meta?: Record<string, unknown>
) {
  if (DEMO_MODE) return;
  const payload = meta ? JSON.stringify(meta) : null;
  await prisma.auditLog
    .create({
      data: {
        nestId,
        userId,
        action,
        meta: payload ?? undefined,
      },
    })
    .catch(() => {});
}
