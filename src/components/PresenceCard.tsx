"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/components/SocketProvider";

export default function PresenceCard() {
  const { socket, nestId, userId } = useSocket();
  const [status, setStatus] = useState<"online" | "away" | "offline">("offline");

  useEffect(() => {
    if (!socket) return;

    function handlePresence(payload: { userId: string; status: string }) {
      if (payload.userId === userId) return;
      if (payload.status === "online") setStatus("online");
      if (payload.status === "offline") setStatus("offline");
    }

    socket.on("presence.update", handlePresence);
    return () => {
      socket.off("presence.update", handlePresence);
    };
  }, [socket, userId]);

  useEffect(() => {
    if (!socket || !nestId) return;
    const interval = setInterval(() => {
      socket.emit("together.heartbeat", { nestId, startedAt: Date.now() });
    }, 30000);

    return () => clearInterval(interval);
  }, [socket, nestId]);

  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 600 }}>Partner</div>
          <div className="subtle" style={{ fontSize: 13 }}>
            {status === "online" ? "Here now" : "Offline"}
          </div>
        </div>
        <div className="inline-actions">
          <button className="btn btn-primary">Together Time</button>
          <button className="btn btn-secondary">Send Thought</button>
        </div>
      </div>
      {status === "online" && (
        <div className="card" style={{ padding: 12, marginTop: 12 }}>
          <div style={{ fontWeight: 600 }}>Together now</div>
          <div className="subtle">Start a quick timer or play a game.</div>
          <div className="inline-actions" style={{ marginTop: 8 }}>
            <button className="btn btn-secondary">5 min timer</button>
            <button className="btn btn-secondary">Quick game</button>
          </div>
        </div>
      )}
    </div>
  );
}
