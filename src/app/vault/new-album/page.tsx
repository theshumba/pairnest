"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ShinyButton from "@/components/ui/ShinyButton";

export default function NewAlbum() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    setBusy(true);
    setError(null);

    const res = await fetch("/api/vault/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim(), description: description.trim() }),
    }).then((r) => r.json());

    setBusy(false);
    if (res?.album?.id) {
      router.push(`/vault/album/${res.album.id}`);
    } else {
      setError(res?.error ?? "Could not create album.");
    }
  }

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur space-y-4">
        <div>
          <div className="text-2xl font-black text-white">New album</div>
          <div className="text-white/60 text-sm">Private by default.</div>
        </div>

        <div>
          <div className="text-xs text-white/60">Title</div>
          <input
            className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="First month"
          />
        </div>

        <div>
          <div className="text-xs text-white/60">Description</div>
          <input
            className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>

        {error ? <div className="text-xs text-red-400">{error}</div> : null}

        <div className="flex gap-2">
          <ShinyButton variant="lime" size="lg" onClick={create} disabled={busy || !title.trim()}>
            CREATE
          </ShinyButton>
          <ShinyButton variant="glass" size="lg" onClick={() => router.push("/vault")}>
            CANCEL
          </ShinyButton>
        </div>
      </div>
    </div>
  );
}
