import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";

const BodySchema = z.object({
  text: z.string(),
  locked: z.boolean().optional(),
  hideFromResurface: z.boolean().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    return NextResponse.json({ memoryId: `demo-journal-${Date.now()}` });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
