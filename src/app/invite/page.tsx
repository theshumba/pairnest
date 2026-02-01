"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function InviteContent() {
  const params = useSearchParams();
  const code = params.get("code") || "LOFT-92";
  const link = `https://pairnest.io/invite/${code}`;

  return (
    <main className="container" style={{ padding: "64px 0" }}>
      <h2 className="heading-serif" style={{ fontSize: 26 }}>
        Invite the other person
      </h2>
      <p className="subtle">This link is single-use and expires.</p>
      <div className="section">
        <div className="card" style={{ padding: 20 }}>
          <p className="subtle" style={{ fontSize: 12 }}>
            Invite link
          </p>
          <div className="inline-actions" style={{ marginTop: 8 }}>
            <input className="input" readOnly value={link} />
            <button className="btn btn-secondary">Copy</button>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <p className="subtle" style={{ fontSize: 12 }}>
            Invite code
          </p>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
          >
            {code}
          </div>
          <div className="inline-actions" style={{ marginTop: 12 }}>
            <button className="btn btn-secondary">Copy code</button>
            <button className="btn btn-ghost">Regenerate</button>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <h3>Waiting for the other person...</h3>
          <p className="subtle">
            You can close this and come back anytime.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function InvitePage() {
  return (
    <div className="page">
      <div className="biome-bg" />
      <div className="ambient" />
      <Suspense fallback={<div className="container" style={{ padding: "64px 0" }}>Loading...</div>}>
        <InviteContent />
      </Suspense>
    </div>
  );
}
