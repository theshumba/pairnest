"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children?: ReactNode;
  variant?: "pink" | "cyan" | "lime" | "purple" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: ReactNode;
  active?: boolean;
}

const VARIANTS = {
  pink: "bg-gradient-to-b from-[#FF66CC] to-[#CC0099] border-[#FF99DD] shadow-[0_6px_0_#880066]",
  cyan: "bg-gradient-to-b from-[#5de6de] to-[#3b8d99] border-[#AEEEEE] shadow-[0_6px_0_#2a6a75]",
  lime: "bg-gradient-to-b from-[#EAFF00] to-[#AACC00] border-[#F4FF99] shadow-[0_6px_0_#668800]",
  purple: "bg-gradient-to-b from-[#D480FF] to-[#8000FF] border-[#EABFFF] shadow-[0_6px_0_#4B0099]",
  glass:
    "bg-white/10 backdrop-blur-md border-white/40 shadow-[0_6px_0_rgba(255,255,255,0.1)] hover:bg-white/20",
};

const SIZES = {
  sm: "h-10 px-4 text-xs",
  md: "h-14 px-6 text-sm",
  lg: "h-20 px-8 text-lg w-full",
  xl: "h-32 w-full text-2xl flex-col gap-4",
};

export default function ShinyButton({
  children,
  variant = "cyan",
  size = "md",
  icon,
  className,
  active,
  ...props
}: ShinyButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98, y: 4, boxShadow: "none" }}
      className={cn(
        "relative rounded-2xl border-4 font-plastic font-bold uppercase text-white transition-all duration-100",
        "flex items-center justify-center gap-2 select-none",
        "before:absolute before:inset-0 before:rounded-xl before:bg-gloss-gradient before:opacity-60",
        VARIANTS[variant],
        SIZES[size],
        active && "brightness-125 ring-4 ring-white ring-offset-2 ring-offset-[#2A0A3D]",
        className
      )}
      {...props}
    >
      <div className="absolute top-1 left-2 right-2 h-1/2 rounded-t-lg bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      {icon && <span className="relative z-10 text-[1.4em] drop-shadow-md">{icon}</span>}
      {children && (
        <span className="relative z-10 drop-shadow-md tracking-wider">{children}</span>
      )}
    </motion.button>
  );
}
