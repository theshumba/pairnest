"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  current: number;
  max: number;
  color?: "pink" | "cyan" | "lime" | "purple";
  showValue?: boolean;
  className?: string;
}

const COLORS = {
  pink: "bg-plastic-pink shadow-[0_0_15px_#FF00CC]",
  cyan: "bg-plastic-cyan shadow-[0_0_15px_#00FFFF]",
  lime: "bg-plastic-lime shadow-[0_0_15px_#CCFF00]",
  purple: "bg-plastic-purple shadow-[0_0_15px_#9D00FF]",
};

export function StatBar({
  label,
  current,
  max,
  color = "lime",
  showValue = true,
  className,
}: StatBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-end mb-1 px-1">
        <span className="font-plastic font-bold text-xs uppercase text-white/80 tracking-widest">
          {label}
        </span>
        {showValue && (
          <span className="font-data text-lg leading-none text-white text-glow">
            {current}/{max}
          </span>
        )}
      </div>

      <div className="relative h-5 w-full rounded-full border-2 border-white/40 bg-black/60 p-[2px] shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
          className={cn(
            "h-full rounded-full relative overflow-hidden transition-colors",
            COLORS[color]
          )}
        >
          <div className="absolute top-0 left-0 right-0 h-[40%] bg-white/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-[50%] skew-x-[-20deg] animate-shine" />
        </motion.div>
      </div>
    </div>
  );
}

export default StatBar;
