import type { Metadata } from "next";
import { CategoryTrendTemplate } from "@/components/listing/templates/CategoryTrendTemplate";
import type {
  CategoryTrendData,
  CategoryTrendItem,
  FAQItem,
  RelatedListing,
  TOCItem,
  AuthorMeta,
} from "@/lib/listing/types";

const AUTHOR: AuthorMeta = {
  name: "Trending Hot Team",
  role: "AI Policy & Compliance Editorial",
  date: "2026-08-01",
  readTime: "6 min read",
};

const euItems: CategoryTrendItem[] = [
  {
    rank: 1,
    name: "Compliance Checklists",
    definition:
      "Structured playbooks mapping EU AI Act obligations to concrete engineering and governance tasks, helping teams track article-by-article requirements and evidence for each AI system they deploy.",
    growthRate: "+174%",
    growthValue: 174,
    representativeBrands: ["OneTrust", "Credo AI", "Holistic AI", "Securiti AI"],
    keyInsight:
      "Checklist tooling surged as the Act's enforcement dates approached, with teams converting dense legal text into trackable engineering tickets to prove due diligence under audit.",
  },
  {
    rank: 2,
    name: "Risk Assessment Tools",
    definition:
      "Platforms that classify AI systems by risk tier (unacceptable, high, limited, minimal) and generate the corresponding risk assessment records the Act requires before deployment.",
    growthRate: "+139%",
    growthValue: 139,
    representativeBrands: ["Credo AI", "Holistic AI", "OneTrust", "Fairly AI"],
    keyInsight:
      "Automated risk classification became the entry point to compliance, since a system's tier dictates nearly every downstream obligation, making tiering the first question every team must answer.",
  },
  {
    rank: 3,
    name: "Audit Services",
    definition:
      "Third-party and internal audit offerings that review AI systems for conformity with the Act, covering documentation, data governance, transparency, and human oversight controls.",
    growthRate: "+108%",
    growthValue: 108,
    representativeBrands: ["Holistic AI", "Credo AI", "Securiti AI", "Fairly AI"],
    keyInsight:
      "Audit demand spiked as high-risk system providers prepared for conformity assessment, creating a bottleneck of qualified AI auditors and a growing services market around compliance.",
  },
  {
    rank: 4,
    name: "Training Documentation",
    definition:
      "Requirements to document training and test data sources, provenance, and preprocessing, ensuring high-risk systems can demonstrate data governance and bias controls to regulators.",
    growthRate: "+86%",
    growthValue: 86,
    representativeBrands: ["Securiti AI", "OneTrust", "Credo AI", "Holistic AI"],
    keyInsight:
      "Training-data documentation is among the hardest obligations to satisfy retroactively, pushing teams to instrument data lineage now rather than reconstruct it during an audit later.",
  },
  {
    rank: 5,
    name: "Transparency Requirements",
    definition:
      "Obligations to inform users when they interact with AI, label AI-generated content, and disclose system capabilities and limitations, applied across risk tiers and deployment contexts.",
    growthRate: "+71%",
    growthValue: 71,
    representativeBrands: ["OneTrust", "Securiti AI", "Credo AI", "Fairly AI"],
    keyInsight:
      "Transparency rules reach beyond high-risk systems, affecting chatbots, deepfakes, and AI-generated media, which broadened compliance scope to marketing and content teams for the first time.",
  },
  {
    rank: 6,
    name: "High-Risk AI Classification",
    definition:
      "The process of determining whether an AI system falls into a high-risk category (e.g., employment, education, biometrics, essential services), triggering the Act's strictest obligations.",
    growthRate: "+59%",
    growthValue: 59,
    representativeBrands: ["Credo AI", "Holistic AI", "Fairly AI", "OneTrust"],
    keyInsight:
      "High-risk classification is contentious because the annex lists are broad and interpretations vary, making legal review and defensible classification records a board-level concern.",
  },
  {
    rank: 7,
    name: "Third-Party Conformity Assessment",
    definition:
      "Independent assessment by notified bodies required for certain high-risk AI systems before market placement, verifying the system meets the Act's quality, safety, and oversight requirements.",
    growthRate: "+47%",
    growthValue: 47,
    representativeBrands: ["Holistic AI", "Credo AI", "Securiti AI", "Fairly AI"],
    keyInsight:
      "Notified-body capacity is the compliance bottleneck of 2026, with far fewer qualified assessors than systems needing review, creating long lead times for high-risk providers.",
  },
  {
    rank: 8,
    name: "Post-Market Monitoring",
    definition:
      "Ongoing obligations to monitor AI system performance after deployment, log incidents, and report serious malfunctions, ensuring continued conformity throughout the system's lifecycle.",
    growthRate: "+38%",
    growthValue: 38,
    representativeBrands: ["Securiti AI", "OneTrust", "Credo AI", "Holistic AI"],
    keyInsight:
      "Post-market monitoring reframes compliance as continuous rather than one-time, pushing teams to instrument production observability for model drift and incidents, not just pre-launch checks.",
  },
];

const euToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "ranking", title: "Top EU AI Act Compliance Trends", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const euTldr: string[] = [
  "Compliance checklists lead the 2026 ranking with +174% growth as enforcement dates approach and teams convert legal text into trackable tickets.",
  "Automated risk classification (+139%) is the entry point, since a system's risk tier dictates nearly every downstream obligation.",
  "Training-data documentation is among the hardest obligations to satisfy retroactively, pushing early data lineage instrumentation.",
  "Transparency rules reach beyond high-risk systems, broadening compliance scope to marketing and content teams for the first time.",
  "Notified-body capacity is the year's compliance bottleneck, with long lead times for high-risk conformity assessment.",
];

const euFaqs: FAQItem[] = [
  {
    question: "What is the EU AI Act and when does it apply?",
    answer:
      "The EU AI Act is the European Union's risk-based regulation governing the development, deployment, and use of artificial intelligence. It classifies systems by risk tier (unacceptable, high, limited, minimal) and applies obligations progressively, with different provisions entering force across 2025 and 2026. It applies to providers, deployers, importers, and distributors placing AI systems on the EU market, regardless of where they are based.",
  },
  {
    question: "Which AI systems are considered high-risk under the Act?",
    answer:
      "High-risk systems include those used in employment, education, essential public services, law enforcement, migration, and justice, as well as certain biometric and critical-infrastructure applications listed in the Act's annexes. These systems trigger the strictest obligations, including risk management, data governance, transparency, human oversight, and conformity assessment before deployment.",
  },
  {
    question: "Do I need a third-party conformity assessment?",
    answer:
      "Certain high-risk AI systems require conformity assessment by an EU notified body before they can be placed on the market, while others allow self-assessment. The requirement depends on the system's function and the annex under which it falls. Providers should confirm the applicable route early, as notified-body capacity is limited and lead times in 2026 can be long.",
  },
  {
    question: "What documentation must high-risk AI providers maintain?",
    answer:
      "High-risk providers must maintain technical documentation covering the system's design, data governance, training and test data provenance, risk management measures, transparency, accuracy, and human oversight. They must also keep records, implement post-market monitoring, and register the system in an EU database. Documentation must be available to authorities on request.",
  },
  {
    question: "Which tools help with EU AI Act compliance?",
    answer:
      "Governance platforms like OneTrust, Credo AI, Holistic AI, Securiti AI, and Fairly AI offer risk classification, documentation management, audit support, and monitoring. They help map obligations to evidence and track readiness, though legal interpretation of classification and obligations still requires specialist advice, especially for borderline high-risk systems.",
  },
  {
    question: "How are the EU AI Act compliance growth rates calculated?",
    answer:
      "Growth rates reflect year-over-year change in combined enterprise and ecosystem signals, including search interest (Google Trends), vendor product announcements, job postings for AI governance roles, and adoption indicators from governance platforms. Percentages are directional and intended to compare relative momentum across sub-categories, not absolute market size.",
  },
];

const euRelated: RelatedListing[] = [
  {
    title: "AI Coding Agents Trends 2026",
    href: "/ai-coding-agents-trends",
    description:
      "The 10 fastest-growing AI coding agent trends in 2026, ranked by growth rate.",
  },
  {
    title: "AI Voice Cloning Trends 2026",
    href: "/ai-voice-cloning-trends",
    description:
      "The 8 fastest-growing AI voice cloning trends in 2026, ranked by growth rate.",
  },
  {
    title: "AI Video Generation Trends 2026",
    href: "/ai-video-generation-trends",
    description:
      "The 10 fastest-growing AI video generation trends in 2026, ranked by growth.",
  },
  {
    title: "AI Industry Statistics 2026",
    href: "/ai-statistics",
    description:
      "The most important artificial intelligence statistics for 2026, organized by theme.",
  },
];

const euData: CategoryTrendData = {
  type: "A",
  category: "EU AI Act Compliance",
  year: "2026",
  items: euItems,
  methodology:
    "This ranking of 2026 EU AI Act compliance trends is based on year-over-year growth in a blended index of enterprise and ecosystem signals. The index combines search interest (Google Trends), vendor product and funding announcements, job postings for AI governance and compliance roles, and adoption indicators from governance platforms. Growth percentages compare July 2026 against July 2025. Representative brands are illustrative of each trend and are not ranked. The list is editorially curated to highlight categories with both measurable momentum and sustained enterprise interest.",
  faqs: euFaqs,
  related: euRelated,
  tldr: euTldr,
  toc: euToc,
  author: AUTHOR,
  introduction:
    "The EU AI Act's phased enforcement has turned AI governance from a policy debate into an engineering deadline in 2026. As key obligations take effect, teams are racing to classify risk tiers, document training data, and prepare for conformity assessment. This ranking tracks the eight fastest-growing EU AI Act compliance trends of 2026, ranked by year-over-year growth in combined search, vendor, and hiring signals. Each entry includes a definition, representative brands, and an editorial insight into why the trend is accelerating.",
};

export const metadata: Metadata = {
  title: "EU AI Act Compliance Trends 2026: Risk, Audit, Documentation",
  description:
    "The 8 fastest-growing EU AI Act compliance trends in 2026, ranked by growth. Discover compliance checklists, risk assessment, audits, transparency and monitoring with brands.",
  metadataBase: new URL("https://trending-hot.com"),
  alternates: {
    canonical: "/eu-ai-act-trends",
  },
  openGraph: {
    title: "EU AI Act Compliance Trends 2026 | Trending Hot",
    description:
      "The 8 fastest-growing EU AI Act compliance trends in 2026, ranked by growth rate with representative brands and editorial insights.",
    url: "https://trending-hot.com/eu-ai-act-trends",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "EU AI Act Compliance Trends 2026 | Trending Hot",
    description:
      "The 8 fastest-growing EU AI Act compliance trends in 2026, ranked by growth rate with representative brands and editorial insights.",
  },
};

export default function EuAiActTrendsPage() {
  return <CategoryTrendTemplate data={euData} />;
}
