import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoNestId, demoUser } from "@/lib/demo";
import { pinShelf } from "@/lib/demoStore";
import { audit } from "@/lib/audit";

const BodySchema = z.object({
  kind: z.enum(["album", "item"]),
  targetId: z.string(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const pin = pinShelf(parsed.data.kind, parsed.data.targetId);
    await audit(demoNestId(), demoUser().id, "shelf.pin", {
      kind: parsed.data.kind,
      targetId: parsed.data.targetId,
    });
    return NextResponse.json({ pin });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
