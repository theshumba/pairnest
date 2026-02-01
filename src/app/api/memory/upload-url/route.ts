import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE } from "@/lib/demo";
import { enforceBodyLimit } from "@/lib/requestGuard";

const BodySchema = z.object({
  filename: z.string(),
  mime: z.string(),
});

export async function POST(req: Request) {
  const tooLarge = enforceBodyLimit(req);
  if (tooLarge) return tooLarge;

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    return NextResponse.json({
      url: "https://example.com/upload",
      fields: {},
      assetKey: `demo/${parsed.data.filename}`,
    });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
