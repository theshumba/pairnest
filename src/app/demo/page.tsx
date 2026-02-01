"use client";

import Link from "next/link";
import { Gamepad2, Heart, Camera, Leaf, Sparkles } from "lucide-react";
import ShinyButton from "@/components/ui/ShinyButton";
import RPGPanel from "@/components/ui/RPGPanel";

const LINKS = [
  { href: "/", label: "HOME", icon: <Sparkles size={18} />, variant: "pink" as const },
  { href: "/play", label: "PLAY", icon: <Gamepad2 size={18} />, variant: "cyan" as const },
  { href: "/moments", label: "MOMENTS", icon: <Heart size={18} />, variant: "lime" as const },
  { href: "/vault", label: "VAULT", icon: <Camera size={18} />, variant: "purple" as const },
  { href: "/nest/plant", label: "PLANT", icon: <Leaf size={18} />, variant: "glass" as const },
  { href: "/play/sync-tap", label: "SYNC TAP", icon: <Gamepad2 size={18} />, variant: "cyan" as const },
  { href: "/play/coincide", label: "COINCIDE", icon: <Gamepad2 size={18} />, variant: "pink" as const },
  { href: "/moments/check-in", label: "CHECK‑IN", icon: <Heart size={18} />, variant: "pink" as const },
  { href: "/moments/thought", label: "THOUGHT", icon: <Heart size={18} />, variant: "cyan" as const },
  { href: "/moments/together", label: "TOGETHER", icon: <Heart size={18} />, variant: "lime" as const },
  { href: "/vault/add", label: "ADD VAULT ITEM", icon: <Camera size={18} />, variant: "purple" as const },
  { href: "/vault/new-album", label: "NEW ALBUM", icon: <Camera size={18} />, variant: "glass" as const },
];

export default function DemoPage() {
  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24 scanlines">
      <div className="space-grid" />
      <div className="relative z-10 space-y-4">
        <header className="flex flex-col gap-2">
          <div className="text-xs uppercase tracking-widest text-white/60">Demo</div>
          <h1 className="text-4xl font-black italic text-plastic-pink">PAIRNEST DEMO HUB</h1>
          <p className="text-white/70 text-sm">
            Jump straight into every feature without email or onboarding.
          </p>
        </header>

        <RPGPanel className="relative z-10">
          <div className="grid grid-cols-2 gap-3">
            {LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                <ShinyButton variant={item.variant} size="md" icon={item.icon}>
                  {item.label}
                </ShinyButton>
              </Link>
            ))}
          </div>
        </RPGPanel>
      </div>
    </div>
  );
}
