import { NextResponse } from "next/server";
import { z } from "zod";
import { DEMO_MODE, demoUser, demoNestId } from "@/lib/demo";
import { addVaultItem, listVaultItems } from "@/lib/demoStore";
import { audit } from "@/lib/audit";
import { enforceBodyLimit } from "@/lib/requestGuard";

const AddVaultItemSchema = z.object({
  albumId: z.string().optional(),
  visibility: z.enum(["both", "me_only"]).default("both"),
  payload: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("photo"),
      url: z.string().url(),
      caption: z.string().max(140).optional().default(""),
    }),
    z.object({
      type: z.literal("note"),
      text: z.string().min(1).max(1200),
    }),
    z.object({
      type: z.literal("voice"),
      url: z.string().url(),
      seconds: z.number().int().min(1).max(600).optional(),
    }),
  ]),
});

export async function GET(req: Request) {
  if (DEMO_MODE) {
    const { searchParams } = new URL(req.url);
    const albumId = searchParams.get("albumId");
    const items = listVaultItems().filter((it) => (albumId ? it.albumId === albumId : true));
    const safe = items.filter((it) => {
      if (it.visibility !== "me_only") return true;
      const owner = (it.payload as any)?.meta?.ownerUserId;
      return owner ? owner === demoUser().id : false;
    });
    return NextResponse.json({ items: safe });
  }
  return NextResponse.json({ items: [] });
}

export async function POST(req: Request) {
  const tooLarge = enforceBodyLimit(req);
  if (tooLarge) return tooLarge;

  const body = await req.json().catch(() => null);
  const parsed = AddVaultItemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (DEMO_MODE) {
    const payloadWithMeta = {
      ...parsed.data.payload,
      meta: { ownerUserId: demoUser().id },
    };
    const item = addVaultItem({
      albumId: parsed.data.albumId ?? null,
      visibility: parsed.data.visibility,
      payload: payloadWithMeta,
    });
    await audit(demoNestId(), demoUser().id, "vault.item.create", {
      type: (parsed.data.payload as any).type,
      visibility: parsed.data.visibility,
    });
    return NextResponse.json({ item });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
