"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="px-4 py-10 text-center" style={{ background: "#0a2a1f" }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
        © 2026 Trending Hot ·{" "}
        <Link href="/about" className="transition hover:text-[#7ddc3f]">About</Link>
        {" · "}
        <Link href="/privacy" className="transition hover:text-[#7ddc3f]">Privacy</Link>
        {" · "}
        <Link href="/contact" className="transition hover:text-[#7ddc3f]">Contact</Link>
      </p>
    </footer>
  );
}