"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PlasticInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: "pink" | "cyan" | "lime";
}

export const PlasticInput = forwardRef<HTMLInputElement, PlasticInputProps>(
  ({ className, label, variant = "cyan", ...props }, ref) => {
    const BORDER_COLORS = {
      pink: "focus:border-plastic-pink focus:shadow-[0_0_15px_#FF00CC]",
      cyan: "focus:border-plastic-cyan focus:shadow-[0_0_15px_#00FFFF]",
      lime: "focus:border-plastic-lime focus:shadow-[0_0_15px_#CCFF00]",
    };

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="ml-2 font-bold uppercase tracking-wider text-white text-xs drop-shadow-md">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              "w-full h-12 px-4 rounded-xl border-4 border-white/50 bg-black/40 text-white font-data text-xl placeholder:text-white/30",
              "outline-none transition-all duration-300",
              "shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]",
              BORDER_COLORS[variant],
              className
            )}
            {...props}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>
    );
  }
);

PlasticInput.displayName = "PlasticInput";
