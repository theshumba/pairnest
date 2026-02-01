"use client";

import { ReactNode } from "react";

export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-plastic-bg text-white md:h-[90vh] md:w-[460px] md:rounded-[3rem] md:border-[12px] md:border-plastic-pink md:shadow-[0_0_60px_#FF00CC]">
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,3px_100%] opacity-20" />
      <div className="absolute top-0 left-1/2 z-40 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-black/80 backdrop-blur-md md:hidden" />
      <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth no-scrollbar">
        {children}
      </main>
    </div>
  );
}
