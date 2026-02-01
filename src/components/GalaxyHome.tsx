"use client";

import { useEffect, useMemo, useState } from "react";
import { Gamepad2, Heart, Camera, Settings, Star, Flame, Sparkles } from "lucide-react";
import ShinyButton from "@/components/ui/ShinyButton";
import StatBar from "@/components/ui/StatBar";
import PlanetAvatar from "@/components/dashboard/PlanetAvatar";
import Link from "next/link";
import { useSocket } from "@/components/SocketProvider";

type Presence = "online" | "away" | "offline";

export default function GalaxyHome() {
  const [loading, setLoading] = useState(true);
  const [presence, setPresence] = useState<Presence>("offline");
  const [growth, setGrowth] = useState({ points: 0, stage: "soil" });
  const [counts, setCounts] = useState({ vault: 0, games: 0, moments: 0 });
  const [shelf, setShelf] = useState<{ kind: string; targetId: string }[]>([]);
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);
  const { socket, nestId } = useSocket();

  useEffect(() => {
    async function load() {
      try {
        const [nestRes, vaultRes, gamesRes, momentsRes, pinsRes, albumsRes] =
          await Promise.all([
          fetch("/api/nest/get").then((r) => r.json()),
          fetch("/api/vault").then((r) => r.json()),
          fetch("/api/stats/games").then((r) => r.json()),
          fetch("/api/stats/moments").then((r) => r.json()),
          fetch("/api/vault/shelf").then((r) => r.json()),
          fetch("/api/vault/albums").then((r) => r.json()),
        ]);

        const presenceValues = (nestRes?.presence ?? []).map((p: { presence: Presence }) => p.presence);
        const inferred: Presence = presenceValues.includes("online")
          ? "online"
          : presenceValues.includes("away")
          ? "away"
          : "offline";

        setPresence(inferred);
        setGrowth({
          points: nestRes?.nest?.growthPoints ?? 0,
          stage: nestRes?.nest?.growthStage ?? "soil",
        });
        setCounts({
          vault: nestRes ? (vaultRes?.items?.length ?? 0) : 0,
          games: gamesRes?.count ?? 0,
          moments: momentsRes?.count ?? 0,
        });
        setShelf(pinsRes?.pins ?? []);
        setAlbums(albumsRes?.albums ?? []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    if (!socket || !nestId) return;
    const handler = (payload: any) => {
      if (!payload || payload.nestId !== nestId) return;
      const status = payload.status as Presence;
      if (status) setPresence(status);
    };
    socket.on("presence.update", handler);
    return () => {
      socket.off("presence.update", handler);
    };
  }, [socket, nestId]);

  const emptyNest = useMemo(
    () => counts.vault === 0 && counts.games === 0 && counts.moments === 0,
    [counts]
  );

  const todayCards = useMemo(() => {
    if (emptyNest) {
      return [
        {
          title: "Start something light",
          body: "A 60‑second icebreaker to kick off the Nest.",
          href: "/play?autostart=this-or-that",
          cta: "Start",
        },
      ];
    }
    if (presence === "online") {
      return [
        {
          title: "Play together now",
          body: "Quick sync game while you’re both here.",
          href: "/play?autostart=sync-tap",
          cta: "Play",
        },
        {
          title: "Together Time",
          body: "A calm timer with no pressure.",
          href: "/moments/together",
          cta: "Start",
        },
      ];
    }
    return [
      {
        title: "Leave a thought",
        body: "A small note they can open later.",
        href: "/moments/thought",
        cta: "Write",
      },
      {
        title: "Pick a game for later",
        body: "Async works when schedules don’t match.",
        href: "/play",
        cta: "Browse",
      },
    ];
  }, [emptyNest, presence]);

  const pinnedAlbumId = shelf.find((p) => p.kind === "album")?.targetId;
  const pinnedAlbum = albums.find((a) => a.id === pinnedAlbumId);

  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4a1a63] via-[#2a0a3d] to-[#1a0526]">
      <header className="sticky top-0 z-20 flex items-center justify-between bg-black/20 p-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-white bg-plastic-pink shadow-lg">
              <Heart className="fill-white text-white" size={24} />
            </div>
            <div className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-plastic-cyan text-[10px] font-black text-black">
              42
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-plastic text-xs font-bold uppercase tracking-wider text-white/60">
              Lvl 42
            </span>
            <span className="font-data text-xl text-white">LOVE NEST</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-data text-lg text-white">9,000</span>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 px-3 py-1">
            <Flame size={14} className="text-orange-500 fill-orange-500" />
            <span className="font-data text-lg text-white">12</span>
          </div>
        </div>
      </header>

      <section className="relative flex flex-1 flex-col items-center justify-center py-8">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 [transform:perspective(500px)_rotateX(60deg)_scale(2)]" />

        <div className="animate-bounce-slow relative mb-4 rounded-2xl border-2 border-black bg-white px-4 py-2 shadow-lg">
          <p className="font-plastic text-lg font-bold text-black">
            {presence === "online" ? "Here now!" : presence === "away" ? "BRB..." : "Miss you!"}
          </p>
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-black bg-white" />
        </div>

        <PlanetAvatar mood="happy" />

        <div className="mt-8 w-64 space-y-2">
          <StatBar label="Love" current={80} max={100} color="pink" />
          <StatBar label="Growth" current={Math.min(100, growth.points * 2)} max={100} color="lime" />
        </div>
      </section>

      <section className="px-6 pb-4 space-y-3">
        <div className="text-xs uppercase tracking-widest text-white/50">Today</div>
        {loading ? (
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white/60">
            Loading your Nest…
          </div>
        ) : (
          todayCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
            >
              <div className="text-sm font-bold uppercase">{card.title}</div>
              <div className="text-white/70 text-sm mt-1">{card.body}</div>
              <div className="mt-3">
                <Link href={card.href}>
                  <ShinyButton variant="cyan" size="md" icon={<Sparkles size={16} />}>
                    {card.cta}
                  </ShinyButton>
                </Link>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="px-6 pb-6 space-y-3">
        <div className="text-xs uppercase tracking-widest text-white/50">Shelf</div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold uppercase">Pinned album</div>
              <div className="text-white/70 text-sm">
                {pinnedAlbum ? pinnedAlbum.title : "Empty"}
              </div>
            </div>
            {pinnedAlbum ? (
              <Link href={`/vault/album/${pinnedAlbum.id}`}>
                <ShinyButton variant="glass" size="sm">
                  OPEN
                </ShinyButton>
              </Link>
            ) : (
              <Link href="/vault">
                <ShinyButton variant="glass" size="sm">
                  PICK
                </ShinyButton>
              </Link>
            )}
          </div>
        </div>
      </section>

      <nav className="z-30 rounded-t-[2.5rem] border-t-4 border-white/20 bg-white/10 p-6 backdrop-blur-xl pb-10">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/play" className="col-span-2">
            <ShinyButton variant="cyan" size="lg" icon={<Gamepad2 />}>
              PLAY
            </ShinyButton>
          </Link>
          <Link href="/memories" className="col-span-2">
            <ShinyButton variant="pink" size="lg" icon={<Camera />}>
              PICS
            </ShinyButton>
          </Link>
          <Link href="/vibe" className="col-span-1">
            <ShinyButton variant="lime" size="md" icon={<Heart />} />
          </Link>
          <Link href="/settings" className="col-span-1">
            <ShinyButton variant="purple" size="md" icon={<Settings />} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
