"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ShinyButton from "@/components/ui/ShinyButton";

type Album = { id: string; title: string };

function VaultAddContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const [albums, setAlbums] = useState<Album[]>([]);

  const [type, setType] = useState<"photo" | "note" | "voice">("note");
  const [visibility, setVisibility] = useState<"both" | "me_only">("both");
  const [albumId, setAlbumId] = useState<string>("");

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [seconds, setSeconds] = useState<number>(12);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/vault/albums")
      .then((r) => r.json())
      .then((res) => setAlbums(res.albums ?? []));
  }, []);

  useEffect(() => {
    const a = sp.get("albumId");
    if (a) setAlbumId(a);
  }, [sp]);

  async function submit() {
    setBusy(true);
    setError(null);

    const payload =
      type === "note"
        ? { type: "note", text: text.trim() }
        : type === "photo"
        ? { type: "photo", url: url.trim(), caption: caption.trim() }
        : { type: "voice", url: url.trim(), seconds };

    const res = await fetch("/api/vault/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        albumId: albumId || undefined,
        visibility,
        payload,
      }),
    }).then((r) => r.json());

    setBusy(false);
    if (res?.item?.id) {
      if (albumId) router.push(`/vault/album/${albumId}`);
      else router.push("/vault");
    } else {
      setError(res?.error ?? "Could not save.");
    }
  }

  const canSubmit =
    (type === "note" && !!text.trim()) ||
    (type === "photo" && isUrl(url.trim())) ||
    (type === "voice" && isUrl(url.trim()));

  return (
    <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur space-y-4">
      <div>
        <div className="text-2xl font-black text-white">Add to Vault</div>
        <div className="text-white/60 text-sm">Private by default. You control visibility.</div>
      </div>

      <div>
        <div className="text-xs text-white/60">Type</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["note", "photo", "voice"] as const).map((k) => (
            <button
              key={k}
              className={[
                "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
                type === k
                  ? "border-plastic-cyan bg-black/40 text-white"
                  : "border-white/20 bg-black/20 text-white/70",
              ].join(" ")}
              onClick={() => setType(k)}
            >
              {k === "note" ? "Note" : k === "photo" ? "Photo" : "Voice"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs text-white/60">Visibility</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            className={[
              "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
              visibility === "both"
                ? "border-plastic-pink bg-black/40 text-white"
                : "border-white/20 bg-black/20 text-white/70",
            ].join(" ")}
            onClick={() => setVisibility("both")}
          >
            Both of us
          </button>
          <button
            className={[
              "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
              visibility === "me_only"
                ? "border-plastic-pink bg-black/40 text-white"
                : "border-white/20 bg-black/20 text-white/70",
            ].join(" ")}
            onClick={() => setVisibility("me_only")}
          >
            Only me
          </button>
        </div>
      </div>

      <div>
        <div className="text-xs text-white/60">Album</div>
        <select
          className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
        >
          <option value="">No album</option>
          {albums.map((a) => (
            <option key={a.id} value={a.id}>
              {a.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        {type === "note" ? (
          <>
            <div className="text-xs text-white/60">Note</div>
            <textarea
              className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-4 text-white outline-none"
              rows={6}
              placeholder="Write anything…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </>
        ) : type === "photo" ? (
          <>
            <div className="text-xs text-white/60">Photo URL</div>
            <input
              className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
              placeholder="https://…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="text-xs text-white/60 mt-3">Caption</div>
            <input
              className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
              placeholder="Optional"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </>
        ) : (
          <>
            <div className="text-xs text-white/60">Voice URL</div>
            <input
              className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
              placeholder="https://…"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <div className="text-xs text-white/60 mt-3">Seconds</div>
            <input
              type="number"
              className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-3 text-white outline-none"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value || "0", 10))}
            />
          </>
        )}
      </div>

      {error ? <div className="text-xs text-red-400">{error}</div> : null}

      <div className="flex gap-2">
        <ShinyButton variant="lime" size="lg" onClick={submit} disabled={busy || !canSubmit}>
          SAVE
        </ShinyButton>
        <ShinyButton variant="glass" size="lg" onClick={() => router.push("/vault")}>
          CANCEL
        </ShinyButton>
      </div>
    </div>
  );
}

export default function VaultAdd() {
  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <Suspense fallback={<div className="text-white p-4">Loading...</div>}>
        <VaultAddContent />
      </Suspense>
    </div>
  );
}

function isUrl(s: string) {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}
