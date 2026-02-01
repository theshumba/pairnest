import { cookies } from "next/headers";
import { DEMO_MODE, demoUser } from "@/lib/demo";

export async function getSessionUser() {
  if (DEMO_MODE) {
    return demoUser();
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("pn_session")?.value;
  if (!sessionId) return null;

  const { prisma } = await import("@/lib/db");
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session.user;
}
