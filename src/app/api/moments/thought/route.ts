import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";
import { addMoment } from "@/lib/demoStore";

const BodySchema = z.object({
  subtype: z.enum(["miss", "gratitude", "update", "memory", "random"]),
  text: z.string().min(1).max(600),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const item = addMoment({
      type: "thought_drop",
      payload: parsed.data,
    });
    return NextResponse.json({ ok: true, moment: item });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
