import { NextResponse } from "next/server";
import { DEMO_MODE } from "@/lib/demo";
import { demoUser } from "@/lib/demo";
import { getAlbum, listVaultItemsByAlbum } from "@/lib/demoStore";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ albumId: string }> }
) {
  const { albumId } = await params;
  if (DEMO_MODE) {
    const album = getAlbum(albumId);
    if (!album) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const items = listVaultItemsByAlbum(albumId);
    const safe = items.filter((it) => {
      if (it.visibility !== "me_only") return true;
      const owner = (it.payload as any)?.meta?.ownerUserId;
      return owner ? owner === demoUser().id : false;
    });
    return NextResponse.json({ album, items: safe });
  }

  return NextResponse.json({ error: "Not configured" }, { status: 501 });
}
