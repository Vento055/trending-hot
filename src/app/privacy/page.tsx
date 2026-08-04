import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Trending Hot",
  description:
    "Privacy Policy for Trending Hot. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Privacy Policy
      </h1>
      <div className="space-y-8 text-muted-foreground">
        <p className="text-sm leading-relaxed">
          Last updated: July 28, 2026
        </p>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Introduction
          </h2>
          <p className="text-base leading-relaxed">
            Trending Hot (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website
            https://www.trending-hot.com (the &ldquo;Service&rdquo;). Please
            read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Information We Collect
          </h2>
          <p className="text-base leading-relaxed">
            We collect information in the following ways:
          </p>
          <ul className="mt-3 space-y-3">
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">
                Anonymous Analytics Logs.
              </span>
              {" "}
              When you access the Service, our servers automatically collect
              standard log information, including your IP address, browser type,
              operating system, referring URLs, access times, and pages viewed.
              This data is anonymized and used solely for operational monitoring
              and performance optimization.
            </li>
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">
                Vercel Analytics.
              </span>
              {" "}
              We use Vercel Analytics to collect anonymous usage data, including
              page views, visitor counts, and referrer information. Vercel
              Analytics does not use cookies and does not collect personally
              identifiable information (PII). For more details, please refer
              to{" "}
              <a
                href="https://vercel.com/docs/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Vercel Analytics documentation
              </a>
              .
            </li>
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">
                Google AdSense Cookies.
              </span>
              {" "}
              Our Service uses Google AdSense to display advertisements. Google
              uses cookies to serve ads based on your prior visits to our
              website and other sites on the Internet. You may opt out of
              personalized advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                Google Ads Settings
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            How We Use Your Information
          </h2>
          <p className="text-base leading-relaxed">
            We use the collected information for the following purposes:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="text-base leading-relaxed">
              To operate and maintain the Service
            </li>
            <li className="text-base leading-relaxed">
              To monitor and analyze usage patterns and trends
            </li>
            <li className="text-base leading-relaxed">
              To improve the performance and user experience of the Service
            </li>
            <li className="text-base leading-relaxed">
              To serve relevant advertisements through Google AdSense
            </li>
            <li className="text-base leading-relaxed">
              To detect, prevent, and address technical issues
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Third-Party Services
          </h2>
          <p className="text-base leading-relaxed">
            We may share anonymous, aggregated data with third-party service
            providers that help us operate and improve the Service. These third
            parties include:
          </p>
          <ul className="mt-3 space-y-2 list-disc list-inside">
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">Vercel</span> &mdash;
              Hosting and analytics infrastructure
            </li>
            <li className="text-base leading-relaxed">
              <span className="font-medium text-foreground">Google AdSense</span>
              {" "}
              &mdash; Advertising services
            </li>
          </ul>
          <p className="text-base leading-relaxed mt-3">
            These third-party services have their own privacy policies
            addressing how they use such information. We encourage you to review
            their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Cookies
          </h2>
          <p className="text-base leading-relaxed">
            Cookies are small data files stored on your device. We do not
            directly use cookies for tracking or personal data collection.
            However, third-party services integrated with our Service (such as
            Google AdSense) may use cookies to serve personalized
            advertisements. You can instruct your browser to refuse all cookies
            or to indicate when a cookie is being sent. If you do not accept
            cookies, some portions of our Service may not function as expected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Data Retention
          </h2>
          <p className="text-base leading-relaxed">
            We retain anonymous analytics data for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy. Log data is
            typically retained for a period of 30 days. Aggregated and
            anonymized data may be retained indefinitely for analytical
            purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Children&apos;s Privacy
          </h2>
          <p className="text-base leading-relaxed">
            Our Service does not address anyone under the age of 13. We do not
            knowingly collect personally identifiable information from children
            under 13. If you are a parent or guardian and you are aware that
            your child has provided us with personal information, please contact
            us so that we can take necessary action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Changes to This Privacy Policy
          </h2>
          <p className="text-base leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &ldquo;Last updated&rdquo; date at the top of this
            page. You are advised to review this Privacy Policy periodically for
            any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Contact Us
          </h2>
          <p className="text-base leading-relaxed">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            <li className="text-base leading-relaxed">
              By email:{" "}
              <a
                href="mailto:4526255@qq.com"
                className="text-primary underline underline-offset-4"
              >
                4526255@qq.com
              </a>
            </li>
            <li className="text-base leading-relaxed">
              By visiting our{" "}
              <a
                href="/contact"
                className="text-primary underline underline-offset-4"
              >
                Contact page
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
