"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { REPORT } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#video", label: "Video" },
  { href: "/results/", label: "Results" },
  { href: "/findings/", label: "Findings" },
  { href: "/team/", label: "Team" },
];

export function Header() {
  const path = usePathname();
  const norm = (p: string) => (p.endsWith("/") ? p : p + "/");

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">
          <img src="/brand/mark-256.png" alt="" width={40} height={40} style={{ borderRadius: 10 }} />
          <span>Laundered Consensus</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={!l.href.includes("#") && norm(path) === l.href ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <a className="pill" href={REPORT.src} target="_blank" rel="noopener noreferrer">
            Report <ArrowUpRight size={12} />
          </a>
        </nav>
      </div>
    </header>
  );
}
