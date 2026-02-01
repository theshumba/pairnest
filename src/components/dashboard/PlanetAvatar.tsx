"use client";

import { motion } from "framer-motion";

export default function PlanetAvatar({ mood = "happy" }: { mood?: "happy" | "sleepy" | "party" }) {
  return (
    <div className="relative h-64 w-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-white/10"
      >
        <div className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-plastic-cyan shadow-[0_0_10px_#00FFFF]" />
      </motion.div>

      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M30 70 L 35 90 L 65 90 L 70 70 Z" fill="#E67E22" stroke="white" strokeWidth="2" />
        <rect x="25" y="65" width="50" height="10" rx="2" fill="#D35400" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="45" r="25" fill="#2ECC71" stroke="white" strokeWidth="2" />
        <path d="M25 45 Q 15 35 25 25" fill="#27AE60" stroke="white" strokeWidth="2" />
        <path d="M75 45 Q 85 35 75 25" fill="#27AE60" stroke="white" strokeWidth="2" />
        <circle cx="42" cy="45" r="3" fill="black" />
        <circle cx="58" cy="45" r="3" fill="black" />
        <path d="M45 52 Q 50 56 55 52" stroke="black" strokeWidth="2" fill="none" />
        {mood === "party" && (
          <path d="M35 25 L 50 5 L 65 25" fill="#FF00CC" stroke="white" strokeWidth="2" />
        )}
      </motion.svg>

      <div className="absolute bottom-0 left-1/2 h-4 w-32 -translate-x-1/2 rounded-[100%] bg-black/40 blur-md" />
    </div>
  );
}
