"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function HeaderConditional() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Header />;
}