import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Trending Hot",
  description:
    "Get in touch with the Trending Hot team. We would love to hear your feedback, suggestions, or inquiries.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Contact Us</h1>
      <div className="space-y-8 text-muted-foreground">
        <section>
          <p className="text-base leading-relaxed">
            We would love to hear from you. Whether you have feedback, feature
            suggestions, bug reports, or just want to say hello, feel free to
            reach out through any of the channels below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Get in Touch
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Email
              </h3>
              <p className="text-sm leading-relaxed">
                For general inquiries and support:
              </p>
              <a
                href="mailto:4526255@qq.com"
                className="text-primary underline underline-offset-4 text-sm mt-1 inline-block"
              >
                4526255@qq.com
              </a>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                GitHub
              </h3>
              <p className="text-sm leading-relaxed">
                Report issues or explore the source code:
              </p>
              <a
                href="https://github.com/trending-hot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 text-sm mt-1 inline-block"
              >
                github.com/trending-hot
              </a>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Twitter / X
              </h3>
              <p className="text-sm leading-relaxed">
                Follow us for updates and announcements:
              </p>
              <a
                href="https://twitter.com/trendinghot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 text-sm mt-1 inline-block"
              >
                @trendinghot
              </a>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1">
                Privacy Inquiries
              </h3>
              <p className="text-sm leading-relaxed">
                For privacy-related concerns:
              </p>
              <a
                href="mailto:4526255@qq.com"
                className="text-primary underline underline-offset-4 text-sm mt-1 inline-block"
              >
                4526255@qq.com
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Response Time
          </h2>
          <p className="text-base leading-relaxed">
            We aim to respond to all inquiries within 24 to 48 hours on business
            days. For urgent matters, email is the fastest way to reach us.
          </p>
        </section>
      </div>
    </div>
  );
}
