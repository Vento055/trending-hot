import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HeaderConditional } from "@/components/HeaderConditional";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trending Hot - Discover What's Trending Across the Internet",
  description: "Discover what's trending, why it's hot, and the forces behind every viral moment.",
  metadataBase: new URL("https://trending-hot.vercel.app"),
  openGraph: {
    title: "Trending Hot",
    description: "Discover what's trending across the internet",
    siteName: "Trending Hot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem("theme");
              if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark");
              }
            })();
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <HeaderConditional />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}