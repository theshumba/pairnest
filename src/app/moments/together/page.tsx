"use client";

import { useEffect, useMemo, useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import { ArrowLeft, Timer } from "lucide-react";
import Link from "next/link";

const DURATIONS = [5, 10, 20, 45];
const VIBES = ["Quiet", "Study", "Cook", "Watch"];

export default function TogetherPage() {
  const [mins, setMins] = useState(10);
  const [active, setActive] = useState(false);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [felt, setFelt] = useState<"lighter" | "same" | "closer" | "calmer" | "">("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [momentId, setMomentId] = useState<string | null>(null);

  useEffect(() => {
    if (!active || !startedAt) return;
    const start = new Date(startedAt).getTime();
    const t = setInterval(() => setElapsedMs(Date.now() - start), 500);
    return () => clearInterval(t);
  }, [active, startedAt]);

  const elapsed = useMemo(() => formatElapsed(elapsedMs), [elapsedMs]);

  async function start() {
    setBusy(true);
    setStatus(null);
    const now = new Date().toISOString();
    await fetch("/api/moments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "together_timer",
        payload: { minutes: mins, startedAt: now },
      }),
    })
      .then(async (r) => {
        const res = await r.json();
        setMomentId(res?.moment?.id ?? null);
        setStartedAt(now);
        setElapsedMs(0);
        setActive(true);
        setStatus("Started.");
      })
      .catch(() => setStatus("Could not start."))
      .finally(() => setBusy(false));
  }

  async function end() {
    if (!startedAt) return;
    setBusy(true);
    setStatus(null);
    const endedAt = new Date().toISOString();
    await fetch("/api/moments/together", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: momentId,
        minutes: mins,
        startedAt,
        endedAt,
        reflection: {
          felt: felt || undefined,
          note: note.trim() || undefined,
        },
      }),
    })
      .then(() => {
        setActive(false);
        setStatus("Ended.");
      })
      .catch(() => setStatus("Could not end."))
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
          Together Time
        </h1>
      </header>

      <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-white/70 text-sm">Status</div>
            <div className="text-lg font-bold">{active ? "Active" : "Idle"}</div>
          </div>
          <div className="text-white/60 text-xs">Target {mins}m</div>
        </div>

        {!active ? (
          <>
            <div>
              <div className="text-white/70 text-sm">Duration</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {DURATIONS.map((m) => (
                  <button
                    key={m}
                    className={[
                      "px-3 py-2 rounded-2xl border-2 text-xs font-bold",
                      m === mins
                        ? "border-plastic-cyan bg-black/40 text-white"
                        : "border-white/20 bg-black/20 text-white/70",
                    ].join(" ")}
                    onClick={() => setMins(m)}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <ShinyButton variant="cyan" size="lg" onClick={start} disabled={busy}>
                START
              </ShinyButton>
            </div>
            <div className="text-xs text-white/60">
              This is a shared window, not a productivity timer.
            </div>
          </>
        ) : (
          <>
            <div className="rounded-2xl border-2 border-white/10 bg-black/30 p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <Timer size={16} /> Elapsed
              </div>
              <div className="text-3xl font-black mt-2">{elapsed}</div>
              <div className="text-xs text-white/60 mt-1">Target {mins} min</div>
            </div>

            <div className="space-y-2">
              <div className="text-white/70 text-sm">Optional reflection</div>
              <div className="flex flex-wrap gap-2">
                {(["closer", "calmer", "lighter", "same"] as const).map((k) => (
                  <button
                    key={k}
                    className={[
                      "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
                      felt === k
                        ? "border-plastic-pink bg-black/40 text-white"
                        : "border-white/20 bg-black/20 text-white/70",
                    ].join(" ")}
                    onClick={() => setFelt(k)}
                  >
                    {labelFelt(k)}
                  </button>
                ))}
              </div>
              <textarea
                className="w-full rounded-2xl border-2 border-white/20 bg-black/30 p-4 text-white font-data text-xl outline-none placeholder:text-white/30"
                rows={3}
                placeholder="One line…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <ShinyButton variant="pink" size="lg" onClick={end} disabled={busy}>
                END
              </ShinyButton>
            </div>
          </>
        )}

        {status ? <div className="text-xs text-white/60">{status}</div> : null}
      </div>
    </div>
  );
}

function formatElapsed(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function labelFelt(k: "lighter" | "same" | "closer" | "calmer") {
  if (k === "closer") return "Closer";
  if (k === "calmer") return "Calmer";
  if (k === "lighter") return "Lighter";
  return "Same";
}
