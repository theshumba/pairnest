"use client";

import ShinyButton from "@/components/ui/ShinyButton";
import RPGPanel from "@/components/ui/RPGPanel";
import { ArrowLeft, Grid3X3, Hand, Shuffle, Swords } from "lucide-react";
import Link from "next/link";

export default function ArcadeLobby() {
  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-32 scanlines">
      <div className="space-grid" />
      <header className="mb-8 flex items-center gap-4 relative z-10">
        <Link href="/">
          <ShinyButton size="sm" variant="pink" icon={<ArrowLeft size={16} />}>
            EXIT
          </ShinyButton>
        </Link>
        <div className="flex-1 text-right">
          <h1 className="text-4xl font-black italic tracking-tighter text-plastic-cyan drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
            ARCADE ZONE
          </h1>
          <span className="font-data text-plastic-lime">CURRENT STREAK: 5 DAYS</span>
        </div>
      </header>

      <div className="grid gap-6 relative z-10">
        <Link href="/play/tictactoe">
          <RPGPanel className="group hover:border-plastic-cyan transition-colors" glowing>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-plastic-pink to-purple-600 flex items-center justify-center shadow-inner">
                <Grid3X3 size={40} className="text-white drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl text-white group-hover:text-plastic-cyan transition-colors">
                  XO BATTLE
                </h3>
                <p className="font-data text-white/60">PvP • Classic • 50 XP</p>
              </div>
              <ShinyButton size="sm" variant="cyan">
                PLAY
              </ShinyButton>
            </div>
          </RPGPanel>
        </Link>

        <Link href="/play/sync-tap">
          <RPGPanel className="group hover:border-plastic-cyan transition-colors" glowing>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-plastic-cyan to-blue-600 flex items-center justify-center shadow-inner">
                <Hand size={40} className="text-white drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl text-white group-hover:text-plastic-cyan transition-colors">
                  SYNC TAP
                </h3>
                <p className="font-data text-white/60">Realtime • Quick • 10 XP</p>
              </div>
              <ShinyButton size="sm" variant="cyan">
                PLAY
              </ShinyButton>
            </div>
          </RPGPanel>
        </Link>

        <Link href="/play/coincide">
          <RPGPanel className="group hover:border-plastic-cyan transition-colors" glowing>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-plastic-lime to-emerald-600 flex items-center justify-center shadow-inner">
                <Shuffle size={40} className="text-white drop-shadow-md" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-2xl text-white group-hover:text-plastic-cyan transition-colors">
                  COINCIDE
                </h3>
                <p className="font-data text-white/60">Realtime • A/B • 15 XP</p>
              </div>
              <ShinyButton size="sm" variant="cyan">
                PLAY
              </ShinyButton>
            </div>
          </RPGPanel>
        </Link>

        <RPGPanel className="opacity-75">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-xl bg-gray-700 flex items-center justify-center shadow-inner">
              <Swords size={40} className="text-white/20" />
            </div>
            <div className="flex-1">
              <h3 className="font-black text-2xl text-gray-400">RPS DUEL</h3>
              <p className="font-data text-white/40">Coming Soon...</p>
            </div>
          </div>
        </RPGPanel>
      </div>
    </div>
  );
}
