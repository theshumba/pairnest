import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";

const BodySchema = z.object({
  sessionId: z.string(),
  payload: z.record(z.string(), z.any()),
});

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    return NextResponse.json({ turnId: `turn-${Date.now()}` });
  }

  const { prisma } = await import("@/lib/db");
  const { getSessionUser } = await import("@/lib/auth");
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await prisma.gameSession.findUnique({ where: { id: parsed.data.sessionId } });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const membership = await prisma.nestMember.findFirst({
    where: { userId: user.id, nestId: session.nestId },
  });
  if (!membership) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const turn = await prisma.gameTurn.create({
    data: {
      sessionId: session.id,
      userId: user.id,
      payload: JSON.stringify(parsed.data.payload),
    },
  });

  return NextResponse.json({ turnId: turn.id });
}
