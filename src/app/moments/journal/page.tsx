"use client";

import AppShell from "@/components/AppShell";
import { useState } from "react";

export default function JournalPage() {
  const [text, setText] = useState("");
  const [locked, setLocked] = useState(false);
  const [hidden, setHidden] = useState(false);

  async function submit() {
    await fetch("/api/moments/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, locked, hideFromResurface: hidden }),
    });
    setText("");
  }

  return (
    <AppShell>
      <div className="section">
        <h2 className="heading-serif" style={{ fontSize: 24 }}>
          Shared journal
        </h2>
        <div className="card" style={{ padding: 16 }}>
          <textarea
            className="input"
            style={{ minHeight: 140 }}
            placeholder="Write something you want to keep together…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input
              type="checkbox"
              checked={locked}
              onChange={(e) => setLocked(e.target.checked)}
            />
            Lock until both open
          </label>
          <label style={{ display: "flex", gap: 8 }}>
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
            />
            Hide from resurfacing
          </label>
          <button className="btn btn-primary" onClick={submit}>
            Save entry
          </button>
        </div>
      </div>
    </AppShell>
  );
}
