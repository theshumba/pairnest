"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";

type Album = { id: string; title: string; description: string; createdAt: string };
type Item = { id: string; visibility: string; payload: any; createdAt: string };

export default function AlbumPage() {
  const params = useParams<{ albumId: string }>();
  const albumId = params.albumId;

  const [album, setAlbum] = useState<Album | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [pins, setPins] = useState<Array<{ kind: string; targetId: string }>>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/vault/album/${albumId}`).then((r) => r.json()),
      fetch("/api/vault/shelf").then((r) => r.json()),
    ]).then(([res, p]) => {
      setAlbum(res.album ?? null);
      setItems(res.items ?? []);
      setPins(p.pins ?? []);
    });
  }, [albumId]);

  const isPinned = pins.some((p) => p.kind === "album" && p.targetId === albumId);

  async function pin() {
    setBusy(true);
    await fetch("/api/vault/shelf/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind: "album", targetId: albumId }),
    }).finally(() => setBusy(false));

    const p = await fetch("/api/vault/shelf").then((r) => r.json());
    setPins(p.pins ?? []);
  }

  if (!album) {
    return (
      <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
        <div className="space-grid" />
        <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-4 text-white/60">
          Loading…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <div className="relative z-10 space-y-4">
        <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs text-white/50 uppercase tracking-widest">Album</div>
              <div className="text-2xl font-black text-white">{album.title}</div>
              {album.description ? (
                <div className="text-white/60 text-sm mt-1">{album.description}</div>
              ) : null}
            </div>
            <div className="flex gap-2">
              <ShinyButton variant="cyan" size="sm" onClick={pin} disabled={busy}>
                {isPinned ? "PINNED" : "PIN"}
              </ShinyButton>
              <Link href={`/vault/add?albumId=${albumId}`}>
                <ShinyButton variant="lime" size="sm">ADD</ShinyButton>
              </Link>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 text-white/60">
            No items yet.
          </div>
        ) : (
          <div className="grid gap-2">
            {items.map((it) => (
              <div key={it.id} className="rounded-2xl border border-white/20 bg-white/10 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">{itemLabel(it)}</div>
                    <div className="text-white/60 text-sm">{itemPreview(it)}</div>
                    <div className="mt-2 flex gap-2 text-xs text-white/50">
                      <span>{it.visibility === "me_only" ? "Only me" : "Both"}</span>
                      <span>{timeAgo(it.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function itemLabel(it: any) {
  const t = it.payload?.type;
  if (t === "photo") return "Photo";
  if (t === "voice") return "Voice note";
  return "Note";
}

function itemPreview(it: any) {
  const t = it.payload?.type;
  if (t === "photo") return (it.payload?.caption ?? "").trim() || "Photo saved.";
  if (t === "voice") return "Voice note saved.";
  const text = (it.payload?.text ?? "").trim();
  return text.length > 140 ? text.slice(0, 140) + "…" : text || "—";
}

function timeAgo(iso: string) {
  const t = new Date(iso).getTime();
  const s = Math.max(0, Date.now() - t);
  const m = Math.floor(s / 60000);
  if (m < 1) return "now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
