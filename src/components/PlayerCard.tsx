"use client";

import { useMemo, useRef, useState } from "react";
import { Star, Flame, Shield } from "lucide-react";
import StatBar from "@/components/ui/StatBar";

type PlayerCardProps = {
  name?: string;
  title?: string;
  level?: number;
  streakDays?: number;
  coins?: number;
  bio?: string;
};

export default function PlayerCard({
  name = "Nova",
  title = "Astronaut ID",
  level = 42,
  streakDays = 12,
  coins = 9000,
  bio = "Co-pilot in the Love Nest. Calm, curious, and ready to explore.",
}: PlayerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const transform = useMemo(
    () => `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    [tilt]
  );

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  }

  return (
    <div className="relative">
      <div className="absolute -inset-3 rounded-[2.75rem] bg-gradient-to-r from-plastic-pink/40 via-plastic-cyan/40 to-plastic-lime/40 blur-xl" />
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={resetTilt}
        className="relative rounded-[2.5rem] border-4 border-white/60 bg-gradient-to-br from-[#1d0b2b] via-[#2a0a3d] to-[#14071f] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-150"
        style={{ transform }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[2.25rem] opacity-50"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.35), transparent 45%)`,
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">
                {title}
              </div>
              <div className="text-3xl font-black text-white">{name}</div>
            </div>
            <div className="h-14 w-14 rounded-2xl border-2 border-white/70 bg-gradient-to-br from-plastic-cyan to-plastic-pink flex items-center justify-center text-black font-black">
              {String(name).slice(0, 2).toUpperCase()}
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-3 text-sm text-white/70">
            {bio}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl border border-white/20 bg-black/40 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-white/70">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                Coins
              </div>
              <div className="text-white font-bold">{coins}</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/40 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-white/70">
                <Flame size={12} className="text-orange-400 fill-orange-400" />
                Streak
              </div>
              <div className="text-white font-bold">{streakDays}d</div>
            </div>
            <div className="rounded-xl border border-white/20 bg-black/40 p-2 text-center">
              <div className="flex items-center justify-center gap-1 text-white/70">
                <Shield size={12} className="text-plastic-lime" />
                Level
              </div>
              <div className="text-white font-bold">{level}</div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <StatBar label="Relationship Level" current={level} max={100} color="pink" />
            <StatBar label="Bond Energy" current={72} max={100} color="cyan" />
          </div>

          <div className="mt-4 text-xs text-white/60 uppercase tracking-widest">
            Pairnest • Galaxy Plastic
          </div>
        </div>
      </div>
    </div>
  );
}
