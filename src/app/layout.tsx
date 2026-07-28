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
  title: "Trending Hot - Discover Tomorrow's Money-Making Trends",
  description: "Discover tomorrow's money-making trends before everyone else sees them. AI-curated opportunity signals from Google Trends and Reddit.",
  metadataBase: new URL("https://www.trending-hot.com"),
  openGraph: {
    title: "Trending Hot",
    description: "Discover tomorrow's money-making trends before everyone else sees them.",
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