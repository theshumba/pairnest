import Link from "next/link";
import { BIOMES } from "@/lib/biomes";
import PlayerCard from "@/components/PlayerCard";
import { RpgPanel } from "@/components/ui/RPGPanel";
import ShinyButton from "@/components/ui/ShinyButton";
import { Leaf, Palette, Shield, Sparkles } from "lucide-react";

export default function NestPage() {
  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tight text-white">
            NEST SYSTEMS
          </h1>
          <p className="font-data text-white/60">Customize your shared space</p>
        </div>
        <ShinyButton variant="glass" size="sm">
          Edit
        </ShinyButton>
      </header>

      <div className="grid gap-6">
        <RpgPanel title="Astronaut ID" glowing>
          <PlayerCard />
        </RpgPanel>

        <RpgPanel title="Love Plant" glowing>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold">Daily care loop</div>
              <div className="text-white/60 text-sm">
                Water once per day to build a shared streak.
              </div>
            </div>
            <Link href="/nest/plant">
              <ShinyButton variant="lime" size="sm" icon={<Leaf size={16} />}>
                OPEN
              </ShinyButton>
            </Link>
          </div>
        </RpgPanel>

        <RpgPanel title="Biomes" glowing>
          <div className="grid gap-3">
            {Object.values(BIOMES).map((biome) => (
              <div
                key={biome.id}
                className="rounded-2xl border-2 border-white/20 bg-black/30 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">{biome.name}</div>
                    <div className="text-white/60 text-sm">{biome.descriptor}</div>
                  </div>
                  <ShinyButton variant="cyan" size="sm" icon={<Palette size={14} />}>
                    SELECT
                  </ShinyButton>
                </div>
              </div>
            ))}
          </div>
        </RpgPanel>

        <RpgPanel title="Comfort Controls" glowing>
          <div className="grid gap-4">
            <div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Prompt Depth</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Light", "Balanced", "Deeper"].map((label) => (
                  <ShinyButton key={label} variant="glass" size="sm">
                    {label}
                  </ShinyButton>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Tone</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Neutral", "Warm", "Romance Removed"].map((label) => (
                  <ShinyButton key={label} variant="glass" size="sm">
                    {label}
                  </ShinyButton>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white/70 text-sm uppercase tracking-wider">Quests</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Off", "Soft", "Active"].map((label) => (
                  <ShinyButton key={label} variant="glass" size="sm">
                    {label}
                  </ShinyButton>
                ))}
              </div>
            </div>
          </div>
        </RpgPanel>

        <RpgPanel title="Notifications" glowing>
          <div className="grid gap-3">
            {[
              "Thought received",
              "Partner check-in complete",
              "Countdown reminder",
              "Weekly recap ready",
              "Keepsake unlocked",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <span className="text-white/70">{item}</span>
                <ShinyButton variant="glass" size="sm" icon={<Shield size={14} />}>
                  TOGGLE
                </ShinyButton>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/60 text-sm">
            <Sparkles size={14} className="text-plastic-lime" />
            Soft alerts only. No pressure loops.
          </div>
        </RpgPanel>
      </div>
    </div>
  );
}
