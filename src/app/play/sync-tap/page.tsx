"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import RPGPanel from "@/components/ui/RPGPanel";
import { ArrowLeft } from "lucide-react";
import { useSocket } from "@/components/SocketProvider";

export default function SyncTapPage() {
  const { socket, nestId, userId } = useSocket();
  const [mine, setMine] = useState(0);
  const [theirs, setTheirs] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!socket) return;
    const handler = (payload: any) => {
      if (!payload || payload.nestId !== nestId) return;
      if (payload.userId === userId) return;
      setTheirs((x) => x + 1);
      setPulse(true);
      setTimeout(() => setPulse(false), 180);
    };
    socket.on("sync_tap", handler);
    return () => {
      socket.off("sync_tap", handler);
    };
  }, [socket, nestId, userId]);

  function tap() {
    if (!socket || !nestId || !userId) return;
    setMine((x) => x + 1);
    socket.emit("sync_tap", { nestId, userId, tapId: "default" });
    setPulse(true);
    setTimeout(() => setPulse(false), 180);
  }

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <header className="mb-6 relative z-10 flex items-center gap-4">
        <Link href="/play">
          <ShinyButton size="sm" variant="pink" icon={<ArrowLeft size={16} />}>
            Back
          </ShinyButton>
        </Link>
        <h1 className="text-3xl font-black text-white uppercase tracking-wider">
          Sync Tap
        </h1>
      </header>

      <RPGPanel className="relative z-10">
        <div className="text-white/70 text-sm">Tap together in real time.</div>

        <div className="mt-5 rounded-3xl border-2 border-white/20 bg-black/30 p-8 text-center">
          <div className="text-xs text-white/50">You · Them</div>
          <div className="mt-2 text-4xl font-black text-white">
            {mine} · {theirs}
          </div>
          <div className="mt-3 text-xs text-white/60">{pulse ? "⋆" : " "}</div>
        </div>

        <div className="mt-6">
          <ShinyButton variant="lime" size="lg" onClick={tap}>
            TAP
          </ShinyButton>
        </div>
      </RPGPanel>
    </div>
  );
}
