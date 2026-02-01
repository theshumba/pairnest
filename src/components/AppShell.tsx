import { ReactNode } from "react";
import BiomeBackground from "@/components/BiomeBackground";
import BottomNav from "@/components/BottomNav";
import { BiomeId } from "@/lib/biomes";

interface AppShellProps {
  children: ReactNode;
  biomeId?: BiomeId;
}

export default function AppShell({ children, biomeId }: AppShellProps) {
  return (
    <div className="page">
      <BiomeBackground biomeId={biomeId} />
      <main className="container" style={{ padding: "32px 0 88px" }}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
