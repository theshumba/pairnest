"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import ShinyButton from "@/components/ui/ShinyButton";
import HoloCard from "@/components/memories/HoloCard";

const DEMO_MEMORIES = [
  {
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    title: "Coffee Date",
    date: "02/14/2024",
    rarity: "common" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    title: "Road Trip",
    date: "03/01/2024",
    rarity: "rare" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    title: "First Stream",
    date: "05/20/2024",
    rarity: "epic" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    title: "Lazy Sunday",
    date: "06/10/2024",
    rarity: "common" as const,
  },
];

export default function MemoryBinder() {
  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/">
          <ShinyButton variant="glass" size="sm" icon={<ArrowLeft size={18} />}>
            BACK
          </ShinyButton>
        </Link>
        <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-plastic-pink to-plastic-cyan drop-shadow-sm">
          BINDER
        </h1>
        <ShinyButton variant="lime" size="sm" icon={<Plus size={18} />} />
      </header>

      <div className="grid grid-cols-2 gap-4">
        {DEMO_MEMORIES.map((memory) => (
          <HoloCard key={memory.title} {...memory} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="rounded-full bg-black/40 px-4 py-2 font-data text-white">
          COLLECTED: 4 / 150
        </div>
      </div>
    </div>
  );
}
