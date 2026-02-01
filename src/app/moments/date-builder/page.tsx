"use client";

import AppShell from "@/components/AppShell";
import { useState } from "react";

const TIMES = ["15m", "30m", "60m", "2h"];
const BUDGETS = ["Free", "$", "$$"];
const ENERGY = ["Low", "Medium", "High"];

export default function DateBuilderPage() {
  const [time, setTime] = useState("30m");
  const [budget, setBudget] = useState("Free");
  const [energy, setEnergy] = useState("Low");

  return (
    <AppShell>
      <div className="section">
        <h2 className="heading-serif" style={{ fontSize: 24 }}>
          Date builder
        </h2>
        <div className="card" style={{ padding: 16 }}>
          <div className="subtle">Time</div>
          <div className="inline-actions">
            {TIMES.map((item) => (
              <button
                key={item}
                className="btn btn-secondary"
                onClick={() => setTime(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="subtle" style={{ marginTop: 12 }}>
            Budget
          </div>
          <div className="inline-actions">
            {BUDGETS.map((item) => (
              <button
                key={item}
                className="btn btn-secondary"
                onClick={() => setBudget(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="subtle" style={{ marginTop: 12 }}>
            Energy
          </div>
          <div className="inline-actions">
            {ENERGY.map((item) => (
              <button
                key={item}
                className="btn btn-secondary"
                onClick={() => setEnergy(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="card" style={{ padding: 12, marginTop: 12 }}>
            <div style={{ fontWeight: 600 }}>Suggestions</div>
            <div className="subtle">
              {time} · {budget} · {energy}
            </div>
            <div className="list" style={{ marginTop: 8 }}>
              <div className="card" style={{ padding: 10 }}>
                Cozy watch party with a shared snack
              </div>
              <div className="card" style={{ padding: 10 }}>
                Virtual café visit + a quick walk
              </div>
              <div className="card" style={{ padding: 10 }}>
                Puzzle night with a playlist
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
