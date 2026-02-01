"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextValue = {
  socket: Socket | null;
  nestId: string | null;
  userId: string | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  nestId: null,
  userId: null,
  connected: false,
});

export function useSocket() {
  return useContext(SocketContext);
}

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [nestId, setNestId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const client = io("/nest", { path: "/socket.io" });
    setSocket(client);
    setConnected(client.connected);

    client.on("connect", () => setConnected(true));
    client.on("disconnect", () => setConnected(false));

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

      setNestId(data.nestId);
      setUserId(data.userId);
      socket.emit("presence.join", {
        nestId: data.nestId,
        userId: data.userId,
      });
    }

    joinPresence();

    return () => {
      if (!socket || !nestId || !userId) return;
      socket.emit("presence.leave", { nestId, userId });
    };
  }, [socket, nestId, userId]);

  const value = useMemo(
    () => ({ socket, nestId, userId, connected }),
    [socket, nestId, userId, connected]
  );

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
