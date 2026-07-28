import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t py-6">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        <p>© 2026 Trending Hot. Built with Next.js & shadcn/ui.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="https://github.com" className="hover:underline">GitHub</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="https://x.com" className="hover:underline">Twitter</Link>
        </div>
      </div>
    </footer>
  );
}
