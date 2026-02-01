import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";
import { addMoment } from "@/lib/demoStore";

const BodySchema = z.object({
  mood: z.enum(["calm", "good", "neutral", "low", "stressed"]),
  energy: z.enum(["low", "mid", "high"]),
  note: z.string().max(240).optional(),
  privateToSelf: z.boolean().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const item = addMoment({
      type: "checkin",
      payload: parsed.data,
    });
    return NextResponse.json({ ok: true, moment: item });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
