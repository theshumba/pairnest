"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/home", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/moments", label: "Moments" },
  { href: "/vault", label: "Vault" },
  { href: "/nest", label: "Nest" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex" }}>
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : ""}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
