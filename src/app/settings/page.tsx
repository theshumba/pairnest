"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Palette, Shield } from "lucide-react";
import ShinyButton from "@/components/ui/ShinyButton";
import { PlasticToggle } from "@/components/ui/PlasticToggle";
import { useState } from "react";
import { RpgPanel } from "@/components/ui/RPGPanel";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const [privacy, setPrivacy] = useState(true);

  return (
    <div className="min-h-full bg-plastic-bg p-4 pb-24">
      <header className="mb-8 flex items-center gap-4">
        <Link href="/">
          <ShinyButton size="sm" variant="glass" icon={<ArrowLeft size={16} />}>
            BACK
          </ShinyButton>
        </Link>
        <h1 className="text-3xl font-black italic tracking-tighter text-white">SYSTEMS</h1>
      </header>

      <div className="grid gap-4">
        <RpgPanel title="Notifications" glowing>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-plastic-cyan" />
              <div>
                <div className="font-bold">Vibe Pings</div>
                <div className="text-white/60 text-sm">Soft alerts only</div>
              </div>
            </div>
            <PlasticToggle checked={notifications} onCheckedChange={setNotifications} variant="cyan" />
          </div>
        </RpgPanel>

        <RpgPanel title="Theme" glowing>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="text-plastic-pink" />
              <div>
                <div className="font-bold">CRT Scanlines</div>
                <div className="text-white/60 text-sm">Retro overlay</div>
              </div>
            </div>
            <PlasticToggle checked={scanlines} onCheckedChange={setScanlines} variant="pink" />
          </div>
        </RpgPanel>

        <RpgPanel title="Privacy" glowing>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-plastic-lime" />
              <div>
                <div className="font-bold">Private Nest</div>
                <div className="text-white/60 text-sm">Two-person only</div>
              </div>
            </div>
            <PlasticToggle checked={privacy} onCheckedChange={setPrivacy} variant="cyan" />
          </div>
        </RpgPanel>
      </div>
    </div>
  );
}
