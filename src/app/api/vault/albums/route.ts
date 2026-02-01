import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoNestId, demoUser } from "@/lib/demo";
import { addAlbum, listAlbums } from "@/lib/demoStore";
import { audit } from "@/lib/audit";
import { enforceBodyLimit } from "@/lib/requestGuard";

const BodySchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export async function GET() {
  if (DEMO_MODE) {
    return NextResponse.json({ albums: listAlbums() });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}

export async function POST(req: Request) {
  const tooLarge = enforceBodyLimit(req);
  if (tooLarge) return tooLarge;

  const body = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  if (DEMO_MODE) {
    const album = addAlbum(parsed.data);
    await audit(demoNestId(), demoUser().id, "vault.album.create", { title: parsed.data.title });
    return NextResponse.json({ album });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
