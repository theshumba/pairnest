"use client";

import RPGPanel from "@/components/ui/RPGPanel";

export default function EmptyState({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <RPGPanel className="relative z-10">
      <div className="text-white font-bold uppercase text-sm">{title}</div>
      <div className="text-white/70 text-sm mt-2">{desc}</div>
      {action ? <div className="mt-4">{action}</div> : null}
    </RPGPanel>
  );
}
