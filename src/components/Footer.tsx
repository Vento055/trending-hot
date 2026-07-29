"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="px-[5%] py-10 text-center" style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}>
      <p style={{ color: "#71717a", fontSize: "0.8rem" }}>
        {"\u00A9"} 2026 Trending Hot {" \u00B7 "}{" "}
        <Link href="/about" className="transition hover:text-[#a855f7]">About</Link>
        {" \u00B7 "}
        <Link href="/privacy" className="transition hover:text-[#a855f7]">Privacy</Link>
        {" \u00B7 "}
        <Link href="/contact" className="transition hover:text-[#a855f7]">Contact</Link>
      </p>
    </footer>
  );
}
