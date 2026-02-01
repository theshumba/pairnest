"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import RPGPanel from "@/components/ui/RPGPanel";
import { ArrowLeft } from "lucide-react";
import { useSocket } from "@/components/SocketProvider";

type Choice = "A" | "B" | null;

export default function CoincidePage() {
  const { socket, nestId, userId } = useSocket();
  const [myChoice, setMyChoice] = useState<Choice>(null);
  const [theirChoice, setTheirChoice] = useState<Choice>(null);

  useEffect(() => {
    if (!socket || !nestId || !userId) return;
    socket.emit("game.join", { nestId, userId, gameKey: "coincide", roomId: "default" });

    const handler = (payload: any) => {
      if (!payload || payload.nestId !== nestId) return;
      if (payload.gameKey !== "coincide") return;
      if (payload.roomId !== "default") return;
      if (payload.userId === userId) return;
      if (payload.action?.type === "choose") setTheirChoice(payload.action.choice as Choice);
      if (payload.action?.type === "reset") {
        setMyChoice(null);
        setTheirChoice(null);
      }
    };

    socket.on("game.action", handler);
    return () => {
      socket.off("game.action", handler);
    };
  }, [socket, nestId, userId]);

  const both = useMemo(() => !!myChoice && !!theirChoice, [myChoice, theirChoice]);
  const match = useMemo(() => both && myChoice === theirChoice, [both, myChoice, theirChoice]);

  function choose(c: "A" | "B") {
    if (!socket || !nestId || !userId) return;
    setMyChoice(c);
    socket.emit("game.action", {
      nestId,
      userId,
      gameKey: "coincide",
      roomId: "default",
      action: { type: "choose", choice: c },
    });
  }

  function reset() {
    if (!socket || !nestId || !userId) return;
    setMyChoice(null);
    setTheirChoice(null);
    socket.emit("game.action", {
      nestId,
      userId,
      gameKey: "coincide",
      roomId: "default",
      action: { type: "reset" },
    });
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
          Coincide
        </h1>
      </header>

      <RPGPanel className="relative z-10">
        <div className="text-white/70 text-sm">Pick the same choice. No score.</div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            className={choiceBtn(myChoice === "A")}
            onClick={() => choose("A")}
          >
            A
          </button>
          <button
            className={choiceBtn(myChoice === "B")}
            onClick={() => choose("B")}
          >
            B
          </button>
        </div>

        <div className="mt-5 rounded-2xl border-2 border-white/20 bg-black/30 p-4">
          <div className="text-xs text-white/50">Status</div>
          <div className="text-sm text-white mt-1">
            You: {myChoice ?? "—"} · Them: {theirChoice ?? "—"}
          </div>
          <div className="text-xs text-white/60 mt-2">
            {both ? (match ? "Same choice." : "Different choice.") : "Waiting for both."}
          </div>
        </div>

        <div className="mt-5">
          <ShinyButton variant="cyan" size="lg" onClick={reset}>
            RESET
          </ShinyButton>
        </div>
      </RPGPanel>
    </div>
  );
}

function choiceBtn(active: boolean) {
  return [
    "rounded-2xl border-2 px-4 py-10 text-xl font-black transition",
    active
      ? "border-plastic-cyan bg-black/40 text-white"
      : "border-white/20 bg-black/20 text-white/70 hover:bg-black/35",
  ].join(" ");
}
