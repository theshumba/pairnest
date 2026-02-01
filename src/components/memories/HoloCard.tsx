"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoloCardProps {
  image: string;
  date: string;
  title: string;
  rarity?: "common" | "rare" | "epic";
}

export default function HoloCard({ image, date, title, rarity = "common" }: HoloCardProps) {
  const BORDERS = {
    common: "border-gray-300",
    rare: "border-plastic-cyan shadow-[0_0_15px_#00FFFF]",
    epic: "border-plastic-pink shadow-[0_0_20px_#FF00CC]",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 10, zIndex: 10 }}
      className={cn(
        "group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl border-[6px] bg-white p-1.5 shadow-xl transition-all",
        BORDERS[rarity]
      )}
    >
      <div className="relative h-[75%] w-full overflow-hidden rounded-lg bg-gray-900 border-2 border-black/10">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-holo-foil opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="mt-2 flex flex-col items-center justify-center text-center">
        <span className="font-data text-xs uppercase tracking-widest text-gray-500">{date}</span>
        <span className="font-plastic text-sm font-bold leading-tight text-gray-800">{title}</span>
      </div>

      <div
        className="absolute bottom-2 right-2 h-4 w-4 rounded-full border border-white shadow-sm"
        style={{
          backgroundColor: rarity === "epic" ? "#FF00CC" : rarity === "rare" ? "#00FFFF" : "#A0AEC0",
        }}
      />
    </motion.div>
  );
}
