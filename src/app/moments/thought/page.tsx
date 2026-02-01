"use client";

import { useState } from "react";
import ShinyButton from "@/components/ui/ShinyButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTyping } from "@/lib/useTyping";

const TYPES = [
  { k: "miss", label: "Miss you" },
  { k: "gratitude", label: "Gratitude" },
  { k: "update", label: "Update" },
  { k: "memory", label: "Memory" },
  { k: "random", label: "Random" },
] as const;

export default function ThoughtPage() {
  const [subtype, setSubtype] = useState<(typeof TYPES)[number]["k"]>("random");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { partnerTyping, meTypingNow, meStopTyping } = useTyping("moments");

  async function submit() {
    setBusy(true);
    setStatus(null);
    await fetch("/api/moments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "thought_drop",
        payload: { subtype, text: text.trim() },
      }),
    })
      .then(() => {
        setText("");
        setStatus("Sent.");
      })
      .catch(() => setStatus("Could not send."))
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
          Thought Drop
        </h1>
        {partnerTyping ? (
          <span className="ml-auto rounded-2xl border-2 border-white/30 bg-black/30 px-3 py-1 text-xs text-white/80">
            Typing…
          </span>
        ) : null}
      </header>

      <div className="relative z-10 rounded-3xl border-2 border-white/20 bg-white/10 p-5 backdrop-blur space-y-4">
        <div className="text-white/70 text-sm">Pick a vibe and leave a note.</div>

        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t.k}
              className={[
                "text-xs px-3 py-2 rounded-2xl border-2 font-bold",
                subtype === t.k
                  ? "border-plastic-cyan bg-black/40 text-white"
                  : "border-white/20 bg-black/20 text-white/70",
              ].join(" ")}
              onClick={() => setSubtype(t.k)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <textarea
          className="w-full rounded-2xl border-2 border-white/20 bg-black/30 p-4 text-white font-data text-xl outline-none placeholder:text-white/30"
          placeholder={placeholderFor(subtype)}
          rows={6}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            meTypingNow();
          }}
          onBlur={() => meStopTyping()}
        />

        <div>
          <ShinyButton variant="lime" size="lg" onClick={submit} disabled={!text.trim() || busy}>
            SEND
          </ShinyButton>
        </div>

        {status ? <div className="text-xs text-white/60">{status}</div> : null}
      </div>
    </div>
  );
}

function placeholderFor(k: string) {
  if (k === "miss") return "One line is enough…";
  if (k === "gratitude") return "Something small you appreciate…";
  if (k === "update") return "A simple update…";
  if (k === "memory") return "A moment you remember…";
  return "Anything at all…";
}
