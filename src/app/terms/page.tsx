import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Trending Hot",
  description:
    "Terms of Service for Trending Hot. Read the terms and conditions governing your use of our platform.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Trending Hot",
    description: "Terms and conditions governing your use of Trending Hot.",
    url: "https://www.trending-hot.com/terms",
  },
};


import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", backgroundColor: "#0a0a10" }}
    >
      <div className="mx-auto max-w-3xl px-[5%] py-12">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm transition hover:text-white mb-10"
          style={{ color: "#71717a" }}
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Title */}
        <h1 className="font-bold tracking-tight mb-2" style={{ color: "#ffffff", fontSize: "1.875rem" }}>
          Terms of Service
        </h1>
        <p className="mb-10" style={{ color: "#71717a", fontSize: "0.85rem" }}>
          Last updated: July 29, 2026
        </p>

        {/* Sections */}
        <div className="space-y-8">
          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              By accessing or using the Trending Hot website (https://www.trending-hot.com), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our Service. These terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update or modify these terms at any time without prior notice, and your continued use of the Service following any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              2. Use License
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Permission is granted to temporarily access and use the materials on Trending Hot for personal, non-commercial, transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or mirror the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by Trending Hot at any time.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              3. Disclaimer
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              The materials on Trending Hot are provided on an as-is basis. Trending Hot makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Trending Hot does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              4. Limitations
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              In no event shall Trending Hot or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Trending Hot, even if Trending Hot or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              5. Intellectual Property
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              All content displayed on Trending Hot, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, and software, is the property of Trending Hot or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of Trending Hot and is protected by international copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              6. Third-Party Links
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Trending Hot may include links to third-party websites or services that are not owned or controlled by Trending Hot. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit. Your use of any third-party websites or services is at your own risk and subject to the applicable terms and policies of those third parties.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              7. User Responsibilities
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of any account information and for all activities that occur under your account. You must not use the Service in any way that could damage, disable, overburden, or impair the site or interfere with any other party's use and enjoyment of the Service. You may not attempt to gain unauthorized access to any portion of the Service, other accounts, computer systems, or networks connected to the Service.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              8. Modifications to Terms
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              Trending Hot reserves the right to revise and update these Terms of Service at any time without prior notice. Changes will be effective immediately upon being posted on this page. The last updated date at the top of this page indicates when the most recent revisions were made. We encourage you to review these terms periodically to stay informed of any updates. Your continued use of the Service after any modifications constitutes your acknowledgment of the modifications and your consent to abide by the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              9. Governing Law
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in the applicable jurisdiction. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="font-semibold mb-3" style={{ color: "#ffffff", fontSize: "1.15rem" }}>
              10. Contact Information
            </h2>
            <p style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: "1.7" }}>
              If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:4526255@qq.com" className="underline" style={{ color: "#a855f7" }}>4526255@qq.com</a> or visit our <Link href="/contact" className="underline" style={{ color: "#a855f7" }}>Contact page</Link>. We will make every effort to respond to your inquiry in a timely manner.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 text-center" style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}>
          <Link
            href="/"
            className="text-sm transition hover:text-white"
            style={{ color: "#71717a" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}