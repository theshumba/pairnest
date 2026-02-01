import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";
import { addMoment, updateMoment } from "@/lib/demoStore";

const BodySchema = z.object({
  id: z.string().optional(),
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

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    if (parsed.data.id) {
      const updated = updateMoment(parsed.data.id, parsed.data);
      return NextResponse.json({ ok: true, moment: updated });
    }

    const item = addMoment({
      type: "together_timer",
      payload: parsed.data,
    });
    return NextResponse.json({ ok: true, moment: item });
  }

  return NextResponse.json({ ok: true });
}
