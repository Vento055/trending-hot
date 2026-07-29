"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? "blur(12px)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(8px)",
        backgroundColor: scrolled ? "rgba(10,10,16,0.85)" : "rgba(10,10,16,0.6)",
        borderBottom: "1px solid rgba(168,85,247,0.15)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-[5%]">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "#ffffff" }}>
          <span className="gradient-text">Trending Hot</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-white" style={{ color: "#71717a" }}>
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-white" style={{ color: "#71717a" }}>
            About
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-white" style={{ color: "#71717a" }}>
            Privacy
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white" style={{ color: "#71717a" }}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
