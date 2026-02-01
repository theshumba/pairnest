"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, PenLine, Timer, Sparkles, Calendar } from "lucide-react";
import ShinyButton from "@/components/ui/ShinyButton";
import EmptyState from "@/components/EmptyState";

type MomentItem = {
  id: string;
  type: "checkin" | "thought_drop" | "together_timer";
  payload: any;
  createdAt: string;
};

const MOMENTS = [
  {
    title: "Daily check‑in",
    description: "Share a small update about your day.",
    href: "/moments/check-in",
    icon: <Heart size={24} />,
    variant: "pink" as const,
  },
  {
    title: "Thought drop",
    description: "A short note they can open later.",
    href: "/moments/thought",
    icon: <PenLine size={24} />,
    variant: "cyan" as const,
  },
  {
    title: "Together timer",
    description: "Quiet time, study, cook, or watch.",
    href: "/moments/together",
    icon: <Timer size={24} />,
    variant: "lime" as const,
  },
  {
    title: "Shared journal",
    description: "Co‑author a private note.",
    href: "/moments/journal",
    icon: <Sparkles size={24} />,
    variant: "purple" as const,
  },
  {
    title: "Date builder",
    description: "Generate a low‑pressure plan together.",
    href: "/moments/date-builder",
    icon: <Calendar size={24} />,
    variant: "cyan" as const,
  },
];

export default function MomentsPage() {
  const [items, setItems] = useState<MomentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/moments/list")
      .then((r) => r.json())
      .then((res) => setItems(res.items ?? []))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const checkins = items.filter((i) => i.type === "checkin").length;
    const thoughts = items.filter((i) => i.type === "thought_drop").length;
    const together = items.filter((i) => i.type === "together_timer").length;
    return { checkins, thoughts, together };
  }, [items]);

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <div className="relative z-10">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black italic tracking-tight text-plastic-pink">
              MOMENTS
            </h1>
            <div className="text-white/60 text-sm">Small signals that add up.</div>
          </div>
          <div className="font-data text-white/60">
            {summary.checkins + summary.thoughts + summary.together} total
          </div>
        </header>

        <div className="grid gap-4">
          {MOMENTS.map((moment) => (
            <div
              key={moment.title}
              className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl border-2 border-white/50 bg-black/30 flex items-center justify-center">
                    {moment.icon}
                  </div>
                  <div>
                    <div className="font-black text-lg">{moment.title}</div>
                    <div className="text-white/60 text-sm">{moment.description}</div>
                  </div>
                </div>
                <Link href={moment.href}>
                  <ShinyButton variant={moment.variant} size="sm">
                    START
                  </ShinyButton>
                </Link>
              </div>
            </div>
          ))}

          <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 backdrop-blur">
            <div className="font-black text-lg">Weekly recap</div>
            <div className="text-white/60 text-sm">A quiet summary of your week.</div>
            <div className="mt-3">
              <ShinyButton variant="glass" size="sm">
                OPEN
              </ShinyButton>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs uppercase tracking-widest text-white/50">Recent</div>
        {loading ? (
          <div className="rounded-3xl border-2 border-white/20 bg-white/10 p-4 text-white/60 mt-2">
            Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="mt-2">
            <EmptyState
              title="No moments yet"
              desc="Start with a check‑in or a thought drop."
              action={
                <Link href="/moments/check-in">
                  <ShinyButton variant="pink" size="sm">
                    CHECK‑IN
                  </ShinyButton>
                </Link>
              }
            />
          </div>
        ) : (
          <div className="grid gap-2 mt-2">
            {items.slice(0, 12).map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-white/20 bg-white/10 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold">{label(m)}</div>
                    <div className="text-white/60 text-sm">{preview(m)}</div>
                  </div>
                  <div className="text-xs text-white/50">{timeAgo(m.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function label(m: MomentItem) {
  if (m.type === "checkin") return "Check in";
  if (m.type === "thought_drop") return "Thought";
  return "Together Time";
}

function preview(m: MomentItem) {
  if (m.type === "checkin") {
    const mood = m.payload?.mood ?? "—";
    const energy = m.payload?.energy ?? "—";
    const note = (m.payload?.note ?? "").trim();
    return note ? `${mood}, ${energy}. ${note}` : `${mood}, ${energy}.`;
  }
  if (m.type === "thought_drop") {
    const text = (m.payload?.text ?? "").trim();
    return text.length > 90 ? `${text.slice(0, 90)}…` : text || "—";
  }
  if (m.type === "together_timer") {
    const minutes = m.payload?.minutes ?? "—";
    const ended = m.payload?.endedAt ? "ended" : "started";
    return `${minutes} min, ${ended}.`;
  }
  return "—";
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
