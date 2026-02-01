import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoNestId, demoUser } from "@/lib/demo";
import { addMoment } from "@/lib/demoStore";
import { audit } from "@/lib/audit";
import { enforceBodyLimit } from "@/lib/requestGuard";

const CheckInPayloadSchema = z.object({
  mood: z.enum(["calm", "good", "neutral", "low", "stressed"]),
  energy: z.enum(["low", "mid", "high"]),
  note: z.string().max(240).optional().default(""),
  privateToSelf: z.boolean().optional().default(false),
});

const ThoughtDropPayloadSchema = z.object({
  subtype: z.enum(["miss", "gratitude", "update", "memory", "random"]),
  text: z.string().min(1).max(600),
});

const TogetherTimerPayloadSchema = z.object({
  minutes: z.number().int().min(1).max(180),
  startedAt: z.string(),
  endedAt: z.string().optional(),
  reflection: z
    .object({
      felt: z.enum(["lighter", "same", "closer", "calmer"]).optional(),
      note: z.string().max(240).optional(),
    })
    .optional(),
});

const CreateMomentStrictSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("checkin"), payload: CheckInPayloadSchema }),
  z.object({ type: z.literal("thought_drop"), payload: ThoughtDropPayloadSchema }),
  z.object({ type: z.literal("together_timer"), payload: TogetherTimerPayloadSchema }),
]);

export async function POST(req: Request) {
  const tooLarge = enforceBodyLimit(req);
  if (tooLarge) return tooLarge;

  const body = await req.json().catch(() => null);
  const parsed = CreateMomentStrictSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const item = addMoment({
      type: parsed.data.type,
      payload: parsed.data.payload,
    });
    await audit(demoNestId(), demoUser().id, "moment.create", { type: parsed.data.type });
    return NextResponse.json({ moment: item });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
