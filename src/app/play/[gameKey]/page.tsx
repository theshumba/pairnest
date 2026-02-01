"use client";

import AppShell from "@/components/AppShell";
import { useMemo, useState } from "react";
import { THIS_OR_THAT_DECK } from "@/lib/content";

interface GamePageProps {
  params: { gameKey: string };
}

const EMOJIS = [
  "😀",
  "🙂",
  "😌",
  "🥹",
  "😴",
  "🤍",
  "✨",
  "🌿",
  "🌤️",
  "🌙",
  "🔥",
  "🌊",
];

type GameState = "idle" | "playing" | "waiting" | "reveal";

export default function GamePage({ params }: GamePageProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [story, setStory] = useState<string[]>([]);
  const [storyLine, setStoryLine] = useState("");
  const [state, setState] = useState<GameState>("idle");
  const [choice, setChoice] = useState<string | null>(null);

  const prompt = useMemo(() => THIS_OR_THAT_DECK[0], []);

  async function start(mode: "async" | "realtime") {
    const res = await fetch("/api/game/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameKey: params.gameKey, mode }),
    });
    const data = await res.json();
    if (res.ok) {
      setSessionId(data.sessionId);
      setState("playing");
      setResult(null);
    }
  }

  async function submitTurn(payload: Record<string, unknown>) {
    if (!sessionId) return;
    await fetch("/api/game/turn", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, payload }),
    });
  }

  async function saveKeepsake(content: Record<string, unknown>) {
    await fetch("/api/memory/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "keepsake", content }),
    });
    setResult("Keepsake saved to Vault");
  }

  function renderGame() {
    switch (params.gameKey) {
      case "this-or-that":
        return (
          <div className="card" style={{ padding: 16 }}>
            <div className="subtle">Prompt</div>
            <h3>
              {prompt.optionA} vs {prompt.optionB}
            </h3>
            {state === "playing" && (
              <div className="inline-actions" style={{ marginTop: 12 }}>
                <button
                  className={`btn ${choice === "A" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => {
                    setChoice("A");
                    submitTurn({ choice: "A", promptId: prompt.id });
                    setState("waiting");
                    setResult("Waiting for partner…");
                  }}
                >
                  {prompt.optionA}
                </button>
                <button
                  className={`btn ${choice === "B" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => {
                    setChoice("B");
                    submitTurn({ choice: "B", promptId: prompt.id });
                    setState("waiting");
                    setResult("Waiting for partner…");
                  }}
                >
                  {prompt.optionB}
                </button>
              </div>
            )}
            {state === "waiting" && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setState("reveal");
                  setResult("Revealed (demo)");
                }}
              >
                Reveal now (demo)
              </button>
            )}
            {state === "reveal" && (
              <div className="card" style={{ padding: 12, marginTop: 12 }}>
                <div style={{ fontWeight: 600 }}>Reveal</div>
                <div className="subtle">You chose {choice}</div>
                <button
                  className="btn btn-secondary"
                  onClick={() => saveKeepsake({ game: "this-or-that", choice })}
                >
                  Save keepsake
                </button>
              </div>
            )}
          </div>
        );
      case "emoji-mood":
        return (
          <div className="card" style={{ padding: 16 }}>
            <div className="subtle">Pick your mood</div>
            <div className="inline-actions" style={{ marginTop: 12 }}>
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  className="btn btn-secondary"
                  onClick={() => {
                    submitTurn({ emoji });
                    setResult("Waiting for partner…");
                    setState("waiting");
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
            {state === "waiting" && (
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setState("reveal");
                  setResult("Reveal (demo)");
                }}
              >
                Reveal now (demo)
              </button>
            )}
          </div>
        );
      case "two-sentence-story":
        return (
          <div className="card" style={{ padding: 16 }}>
            <div className="subtle">Add one line</div>
            <textarea
              className="input"
              value={storyLine}
              onChange={(e) => setStoryLine(e.target.value)}
              placeholder="Write your sentence..."
            />
            <div className="inline-actions" style={{ marginTop: 12 }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!storyLine.trim()) return;
                  const next = [...story, storyLine.trim()];
                  setStory(next);
                  submitTurn({ line: storyLine.trim(), index: next.length - 1 });
                  setStoryLine("");
                }}
              >
                Submit line
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => saveKeepsake({ story })}
              >
                Save keepsake
              </button>
            </div>
            <div style={{ marginTop: 12 }}>
              {story.map((line, idx) => (
                <div key={idx} className="card" style={{ padding: 8 }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      case "sync-tap":
        return (
          <div className="card" style={{ padding: 16, textAlign: "center" }}>
            <div className="subtle">Tap at the same time</div>
            <button
              className="btn btn-primary"
              onClick={() => {
                const diff = Math.floor(Math.random() * 200);
                setResult(`${diff}ms difference. Try again if you want.`);
              }}
            >
              Tap now
            </button>
          </div>
        );
      default:
        return (
          <div className="card" style={{ padding: 16 }}>
            <div className="subtle">Game shell</div>
            <p className="subtle">
              This game UI will be implemented next.
            </p>
          </div>
        );
    }
  }

  return (
    <AppShell>
      <div className="section">
        <div className="card" style={{ padding: 16 }}>
          <div className="subtle">Game session</div>
          <h2 className="heading-serif" style={{ fontSize: 24 }}>
            {params.gameKey.replace(/-/g, " ")}
          </h2>
          <div className="inline-actions" style={{ marginTop: 12 }}>
            <button className="btn btn-primary" onClick={() => start("async")}
            >
              Start async
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => start("realtime")}
            >
              Start together
            </button>
          </div>
          {sessionId && (
            <p className="subtle" style={{ marginTop: 8 }}>
              Session created: {sessionId}
            </p>
          )}
        </div>

        {renderGame()}

        {result && (
          <div className="card" style={{ padding: 16 }}>
            <div className="subtle">Result</div>
            <div>{result}</div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
