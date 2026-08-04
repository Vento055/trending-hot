import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HeaderConditional } from "@/components/HeaderConditional";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Trending Hot - Discover What's Trending Across the Internet",
    template: "%s | Trending Hot",
  },
  description:
    "Real-time insights powered by Google Trends and Reddit. Discover trending topics, analyze signals, and stay ahead of every viral moment.",
  metadataBase: new URL("https://www.trending-hot.com"),
  openGraph: {
    title: "Trending Hot - Discover What's Trending Across the Internet",
    description:
      "Real-time insights powered by Google Trends and Reddit. Discover trending topics, analyze signals, and stay ahead of every viral moment.",
    url: "https://www.trending-hot.com",
    siteName: "Trending Hot",
    type: "website",
    images: [
      {
        url: "https://www.trending-hot.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trending Hot - Real-Time AI and Tech Signals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <HeaderConditional />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
