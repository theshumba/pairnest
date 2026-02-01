"use client";

import { ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface RealtimeProviderProps {
  children: ReactNode;
}

export default function RealtimeProvider({ children }: RealtimeProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const client = io("/nest", { path: "/socket.io" });
    setSocket(client);

    return () => {
      client.disconnect();
    };
  }, []);

  useEffect(() => {
    async function joinPresence() {
      if (!socket) return;
      const res = await fetch("/api/session/me");
      const data = await res.json();
      if (!res.ok || !data.nestId) return;

      socket.emit("presence.join", {
        nestId: data.nestId,
        userId: data.userId,
      });
    }

    joinPresence();

    return () => {
      if (!socket) return;
      // Best-effort leave
      socket.emit("presence.leave", { nestId: "", userId: "" });
    };
  }, [socket]);

  return <>{children}</>;
}
