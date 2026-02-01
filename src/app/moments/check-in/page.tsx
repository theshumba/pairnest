"use client";

import { useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const MOODS = [
  { k: "calm", label: "Calm" },
  { k: "good", label: "Good" },
  { k: "neutral", label: "Neutral" },
  { k: "low", label: "Low" },
  { k: "stressed", label: "Stressed" },
] as const;

const ENERGY = [
  { k: "low", label: "Low" },
  { k: "mid", label: "Mid" },
  { k: "high", label: "High" },
] as const;

export default function CheckInPage() {
  const [mood, setMood] = useState<(typeof MOODS)[number]["k"]>("neutral");
  const [energy, setEnergy] = useState<(typeof ENERGY)[number]["k"]>("mid");
  const [note, setNote] = useState("");
  const [privateToSelf, setPrivateToSelf] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setStatus(null);
    await fetch("/api/moments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "checkin",
        payload: {
          mood,
          energy,
          note: note.trim(),
          privateToSelf,
        },
      }),
    })
      .then(() => setStatus("Saved."))
      .catch(() => setStatus("Could not save."))
      .finally(() => setBusy(false));
  }

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <header className="mb-8 relative z-10 flex items-center gap-4">
        <Link href="/moments">
          <ShinyButton size="sm" variant="pink" icon={<ArrowLeft size={16} />}>
            Back
          </ShinyButton>
        </Link>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Check‑In
        </h1>
      </header>

      <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur space-y-5">
        <div>
          <div className="text-white/70 text-sm">Mood</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <button
                key={m.k}
                className={[
                  "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
                  mood === m.k
                    ? "border-plastic-cyan bg-black/40 text-white"
                    : "border-white/20 bg-black/20 text-white/70",
                ].join(" ")}
                onClick={() => setMood(m.k)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-white/70 text-sm">Energy</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {ENERGY.map((e) => (
              <button
                key={e.k}
                className={[
                  "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
                  energy === e.k
                    ? "border-plastic-pink bg-black/40 text-white"
                    : "border-white/20 bg-black/20 text-white/70",
                ].join(" ")}
                onClick={() => setEnergy(e.k)}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-white/70 text-sm">Optional note</div>
          <textarea
            className="mt-2 w-full rounded-2xl border-2 border-white/20 bg-black/30 p-4 text-white font-data text-xl outline-none placeholder:text-white/30"
            rows={4}
            placeholder="One or two lines…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-white/60">
          <input
            type="checkbox"
            checked={privateToSelf}
            onChange={(e) => setPrivateToSelf(e.target.checked)}
          />
          Keep this visible only to me
        </label>

        <div className="pt-2">
          <ShinyButton variant="lime" size="lg" onClick={submit} disabled={busy}>
            SAVE
          </ShinyButton>
        </div>

        {status ? <div className="text-xs text-white/60">{status}</div> : null}
      </div>
    </div>
  );
}
