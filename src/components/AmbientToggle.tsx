"use client";

import { useEffect, useRef, useState } from "react";
import { BiomeId } from "@/lib/biomes";

function getTone(biomeId: BiomeId) {
  switch (biomeId) {
    case "forest_cabin":
      return { freq: 164, gain: 0.01 };
    case "cloud_loft":
    default:
      return { freq: 198, gain: 0.008 };
  }
}

export default function AmbientToggle({
  label,
  biomeId = "cloud_loft",
}: {
  label?: string;
  biomeId?: BiomeId;
}) {
  const [on, setOn] = useState(false);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!on) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (gainRef.current) {
        gainRef.current.disconnect();
        gainRef.current = null;
      }
      if (ctxRef.current) {
        ctxRef.current.close();
        ctxRef.current = null;
      }
      return;
    }

    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const tone = getTone(biomeId);

    osc.type = "sine";
    osc.frequency.value = tone.freq;
    gain.gain.value = tone.gain;

    osc.connect(gain).connect(ctx.destination);
    osc.start();

    ctxRef.current = ctx;
    oscRef.current = osc;
    gainRef.current = gain;

    return () => {
      osc.stop();
      osc.disconnect();
      gain.disconnect();
      ctx.close();
    };
  }, [on, biomeId]);

  return (
    <button
      className="btn btn-secondary"
      onClick={() => setOn((prev) => !prev)}
      aria-pressed={on}
    >
      {label || "Ambient"}: {on ? "On" : "Off"}
    </button>
  );
}
