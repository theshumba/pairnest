"use client";

import ShinyButton from "@/components/ui/ShinyButton";
import { ArrowLeft, CloudRain, Sun, Zap, Coffee, Moon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const MOODS = [
  { id: "happy", icon: <Sun size={32} />, label: "Sunny", color: "text-yellow-400" },
  { id: "sad", icon: <CloudRain size={32} />, label: "Rainy", color: "text-blue-400" },
  { id: "energetic", icon: <Zap size={32} />, label: "Wired", color: "text-orange-400" },
  { id: "tired", icon: <Moon size={32} />, label: "Sleepy", color: "text-purple-400" },
  { id: "chill", icon: <Coffee size={32} />, label: "Chill", color: "text-green-400" },
];

export default function VibeCheck() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-plastic-bg p-4 scanlines">
      <div className="space-grid" />
      <header className="mb-8 relative z-10">
        <Link href="/">
          <ShinyButton size="sm" variant="pink" icon={<ArrowLeft size={16} />}>
            Back
          </ShinyButton>
        </Link>
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-black text-white uppercase tracking-wider">
            Current Status
          </h1>
          <p className="text-white/60 font-data text-lg">
            Update your signal for your partner
          </p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelected(mood.id)}
            className={`
              h-32 rounded-3xl border-4 flex flex-col items-center justify-center gap-2 transition-all duration-200
              ${selected === mood.id
                ? "bg-white border-plastic-pink shadow-[0_0_20px_#FF00CC]"
                : "bg-black/30 border-white/20 hover:bg-black/50"}
            `}
          >
            <div className={selected === mood.id ? "text-black" : mood.color}>
              {mood.icon}
            </div>
            <span className={`font-black uppercase ${selected === mood.id ? "text-black" : "text-white"}`}>
              {mood.label}
            </span>
          </motion.button>
        ))}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10">
          <div className="bg-black/30 rounded-2xl p-4 border-2 border-white/10 mb-6">
            <textarea
              placeholder="Add a note? (Optional)"
              className="w-full bg-transparent text-white font-data text-xl outline-none h-20 placeholder:text-white/20"
            />
          </div>
          <ShinyButton variant="lime" size="lg">
            BROADCAST VIBE
          </ShinyButton>
        </motion.div>
      )}
    </div>
  );
}
