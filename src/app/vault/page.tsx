"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import EmptyState from "@/components/EmptyState";

type Album = { id: string; title: string; description: string; createdAt: string };
type Item = { id: string; visibility: string; payload: any; createdAt: string; albumId?: string | null };

export default function VaultIndex() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/vault/albums").then((r) => r.json()),
      fetch("/api/vault/items").then((r) => r.json()),
    ])
      .then(([a, i]) => {
        setAlbums(a.albums ?? []);
        setItems(i.items ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs text-white/50 uppercase tracking-widest">Vault</div>
            <div className="text-3xl font-black italic text-white">Private keepsakes</div>
          </div>
          <Link href="/vault/add">
            <ShinyButton variant="cyan" size="sm">ADD</ShinyButton>
          </Link>
        </div>

        <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-bold">Albums</div>
              <div className="text-white/60 text-sm">Group memories by theme.</div>
            </div>
            <Link href="/vault/new-album">
              <ShinyButton variant="lime" size="sm">NEW</ShinyButton>
            </Link>
          </div>

          {loading ? (
            <div className="text-white/60 text-sm mt-3">Loading…</div>
          ) : albums.length === 0 ? (
            <div className="mt-3">
              <EmptyState
                title="No albums yet"
                desc="Create one to group photos and notes."
                action={
                  <Link href="/vault/new-album">
                    <ShinyButton variant="lime" size="sm">NEW ALBUM</ShinyButton>
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="mt-3 grid gap-2">
              {albums.slice(0, 6).map((a) => (
                <Link key={a.id} href={`/vault/album/${a.id}`}>
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-3 hover:bg-black/40 transition">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold">{a.title}</div>
                      <span className="text-xs text-white/50">OPEN</span>
                    </div>
                    {a.description ? (
                      <div className="text-white/60 text-sm mt-1">{a.description}</div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur">
          <div className="text-lg font-bold">Recent</div>
          <div className="text-white/60 text-sm">Latest items in your Vault.</div>

          {loading ? (
            <div className="text-white/60 text-sm mt-3">Loading…</div>
          ) : items.length === 0 ? (
            <div className="mt-3">
              <EmptyState
                title="No items yet"
                desc="Add a photo, note, or voice to start your vault."
                action={
                  <Link href="/vault/add">
                    <ShinyButton variant="cyan" size="sm">ADD ITEM</ShinyButton>
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="mt-3 grid gap-2">
              {items.slice(0, 8).map((it) => (
                <div key={it.id} className="rounded-2xl border border-white/20 bg-black/30 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold">{itemLabel(it)}</div>
                      <div className="text-white/60 text-sm">{itemPreview(it)}</div>
                    </div>
                    <div className="text-xs text-white/50">{timeAgo(it.createdAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  return text.length > 90 ? text.slice(0, 90) + "…" : text || "—";
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
