"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          🔥 Trending Hot
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-foreground/80 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-foreground/80 transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-foreground/80 transition-colors">
            Privacy
          </Link>
          <Link href="/contact" className="hover:text-foreground/80 transition-colors">
            Contact
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleDark} aria-label="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
          </Button>
        </nav>
      </div>
    </header>
  );
}
