import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";

const BodySchema = z.object({
  gameKey: z.string(),
  mode: z.enum(["async", "realtime"]),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    return NextResponse.json({ sessionId: `demo-${parsed.data.gameKey}` });
  }

  const { prisma } = await import("@/lib/db");
  const { getSessionUser } = await import("@/lib/auth");
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const membership = await prisma.nestMember.findFirst({ where: { userId: user.id } });
  if (!membership) return NextResponse.json({ error: "No nest" }, { status: 404 });

  const session = await prisma.gameSession.create({
    data: {
      nestId: membership.nestId,
      gameKey: parsed.data.gameKey,
      mode: parsed.data.mode,
      status: "active",
      gameState: JSON.stringify({}),
    },
  });

  return NextResponse.json({ sessionId: session.id });
}
