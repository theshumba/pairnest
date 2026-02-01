"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "@/components/SocketProvider";

type Channel = "moments" | "vault" | "games";

export function useTyping(channel: Channel) {
  const { socket, nestId, userId } = useSocket();
  const [partnerTyping, setPartnerTyping] = useState(false);
  const stopTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handler = (payload: any) => {
      if (!payload || payload.channel !== channel) return;
      if (payload.userId === userId) return;
      setPartnerTyping(!!payload.isTyping);
    };

    socket.on("typing", handler);
    return () => {
      socket.off("typing", handler);
    };
  }, [socket, channel, userId]);

  function meTypingNow() {
    if (!socket || !nestId || !userId) return;
    socket.emit("typing", { nestId, userId, channel, isTyping: true });
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = setTimeout(() => {
      socket.emit("typing", { nestId, userId, channel, isTyping: false });
    }, 1200);
  }

  function meStopTyping() {
    if (!socket || !nestId || !userId) return;
    if (stopTimer.current) clearTimeout(stopTimer.current);
    socket.emit("typing", { nestId, userId, channel, isTyping: false });
  }

  return { partnerTyping, meTypingNow, meStopTyping };
}
