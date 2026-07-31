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
  role: "Beauty & Lifestyle Editorial",
  date: "2026-07-31",
  readTime: "9 min read",
};

const beautyItems: CategoryTrendItem[] = [
  {
    rank: 1,
    name: "Glass Skin & Skin Flooding",
    definition:
      "A multi-step hydration layering technique originating from K-beauty that produces a translucent, dewy, poreless complexion by flooding the skin barrier with humectants and lightweight essences.",
    growthRate: "+86%",
    growthValue: 86,
    representativeBrands: ["Laneige", "Peach & Lily", "Tirtir", "SoonJung"],
    keyInsight:
      "Search interest in 'glass skin' more than doubled year-over-year, with TikTok hashtag views crossing 4B as the trend crossed over from K-beauty niches into mainstream Western routines.",
  },
  {
    rank: 2,
    name: "Skin Barrier Repair",
    definition:
      "Products focused on rebuilding the skin's protective lipid barrier using ceramides, niacinamide, panthenol, and fatty acids, positioned as a recovery regimen after over-exfoliation.",
    growthRate: "+74%",
    growthValue: 74,
    representativeBrands: ["Dr. Jart+", "Skinfix", "La Roche-Posay", "Byoma"],
    keyInsight:
      "Barrier care has shifted from a corrective treatment to a daily essential, with ceramide-based moisturizers now outselling traditional anti-aging creams among under-35 shoppers.",
  },
  {
    rank: 3,
    name: "Exosome Skincare",
    definition:
      "Regenerative formulations using cell-derived vesicles (often plant or salmon-derived) that signal skin cells to renew, promising faster repair and anti-aging effects than traditional peptides.",
    growthRate: "+68%",
    growthValue: 68,
    representativeBrands: ["CTASA", "ExoSkin", "Ploma", "Beautique"],
    keyInsight:
      "Exosomes are the new 'it' ingredient in professional aesthetics, and a wave of at-home serums is bringing the category to e-commerce, despite regulatory grey zones in several markets.",
  },
  {
    rank: 4,
    name: "Skinification of the Scalp",
    definition:
      "Treating the scalp as an extension of facial skincare, with chemical exfoliants, serums, and microbiome-focused products designed to improve hair health through a healthy scalp environment.",
    growthRate: "+61%",
    growthValue: 61,
    representativeBrands: ["Oribe", "Nécessaire", "Act+Acre", "Living Proof"],
    keyInsight:
      "Scalp serums are one of the fastest-growing sub-categories in haircare, as consumers import their facial skincare habits (acids, niacinamide, probiotics) upward to the hairline.",
  },
  {
    rank: 5,
    name: "Lip Oils & Glosses",
    definition:
      "Hybrid lip products that combine the shine of a gloss with the nourishment of an oil, often formulated with plant oils, squalane, and a sheer tint for a 'your lips but better' finish.",
    growthRate: "+57%",
    growthValue: 57,
    representativeBrands: ["Dior", "Haus Labs", "Rare Beauty", "Summer Fridays"],
    keyInsight:
      "Lip oil is cannibalizing matte lipstick sales as the 'clean girl' aesthetic persists; the category saw double-digit unit growth while traditional lipsticks declined.",
  },
  {
    rank: 6,
    name: "Salmon PDRN & PDRN Serums",
    definition:
      "Formulations built on polydeoxyribonucleotide (PDRN), typically derived from salmon DNA, used to support tissue regeneration, soothing, and skin healing, popularized by Korean clinics.",
    growthRate: "+52%",
    growthValue: 52,
    representativeBrands: ["Rejuran", "Vitaminride", "Healer's Skin"],
    keyInsight:
      "PDRN moved from in-clinic injectables into topical serums in 2026, with salmon-derived ingredients becoming a recognizable consumer buzzword across Asian beauty markets.",
  },
  {
    rank: 7,
    name: "At-Home LED & Devices",
    definition:
      "FDA-cleared LED face masks and handheld devices (red, near-infrared, blue light) that bring professional-grade light therapy into the home, marketed for anti-aging and acne.",
    growthRate: "+44%",
    growthValue: 44,
    representativeBrands: ["CurrentBody", "Omnilux", "TheraBody", "Dr. Dennis Gross"],
    keyInsight:
      "LED device ownership is now a status marker in skincare communities, with red-light masks becoming the most-screenshotted bathroom accessory on social media.",
  },
  {
    rank: 8,
    name: "Mushroom & Mycelium Skincare",
    definition:
      "Products harnessing adaptogenic mushrooms (reishi, tremella, chaga) and mycelium-derived ferment filtrates for antioxidant, hydrating, and stress-recovery benefits.",
    growthRate: "+39%",
    growthValue: 39,
    representativeBrands: ["Youth To The People", "Shroom", "Frownies", "Origins"],
    keyInsight:
      "Mushroom actives ride the convergence of adaptogens and skin barrier wellness, appealing to consumers seeking 'natural-but-clinical' positioning.",
  },
];

const beautyToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "ranking", title: "Top Beauty Trends", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const beautyTldr: string[] = [
  "Glass skin and skin flooding top the 2026 beauty trend ranking with +86% year-over-year growth, driven by K-beauty and TikTok virality.",
  "Skin barrier repair has become a daily essential rather than a corrective treatment, with ceramide moisturizers outselling traditional anti-aging creams.",
  "Exosomes and salmon PDRN are the breakout regenerative ingredients, moving from clinics into at-home serums.",
  "Scalp skincare and at-home LED devices show 50%+ growth as consumers extend facial routines to the scalp and bring pro devices home.",
  "Lip oils are replacing matte lipsticks as the dominant lip format, reflecting the persistence of the 'clean girl' aesthetic.",
];

const beautyFaqs: FAQItem[] = [
  {
    question: "What are the biggest beauty trends in 2026?",
    answer:
      "The standout beauty trends in 2026 are glass skin and skin flooding (+86% growth), skin barrier repair (+74%), exosome skincare (+68%), and the skinification of the scalp (+61%). These trends reflect a broader shift toward hydration, barrier health, and regenerative ingredients across both mass and prestige beauty.",
  },
  {
    question: "What is glass skin?",
    answer:
      "Glass skin refers to a smooth, translucent, dewy complexion achieved through multi-step hydration layering. The technique originated in K-beauty and involves applying lightweight essences, toners, and humectants in sequence to 'flood' the skin with moisture, resulting in a poreless, glass-like finish.",
  },
  {
    question: "Are exosomes and PDRN safe in skincare?",
    answer:
      "Exosome and PDRN skincare are growing rapidly but exist in a regulatory grey area in many markets. While clinical and professional use is well established, at-home topical products vary widely in quality. Consumers should look for transparent sourcing, third-party testing, and avoid unverified injectable-grade claims in over-the-counter products.",
  },
  {
    question: "How are the beauty trend growth rates calculated?",
    answer:
      "Growth rates reflect year-over-year change in combined consumer signals, including search interest (Google Trends), social hashtag volume (TikTok, Instagram), and retail sales velocity from public marketplace data. Percentages are directional and intended to compare relative momentum, not absolute market size.",
  },
  {
    question: "Which brands represent each trend?",
    answer:
      "Representative brands are drawn from the products most associated with each trend on social media and in retail. For example, Laneige and Peach & Lily represent glass skin, Dr. Jart+ and Skinfix lead barrier repair, and CurrentBody and Omnilux dominate at-home LED. The lists are illustrative rather than exhaustive rankings.",
  },
];

const beautyRelated: RelatedListing[] = [
  {
    title: "Most Visited Websites in Japan",
    href: "/listings/most-visited-websites-in-japan",
    description:
      "Japan's internet landscape, where Yahoo Japan, Rakuten, and LINE continue to dominate.",
  },
  {
    title: "AI Industry Statistics 2026",
    href: "/ai-statistics",
    description:
      "The most important artificial intelligence statistics for 2026, organized by theme.",
  },
  {
    title: "Top Skincare Brands 2026",
    href: "/listings/top-skincare-brands-2026",
    description:
      "A brand-level ranking of the leading skincare companies by market share and growth.",
  },
];

const beautyData: CategoryTrendData = {
  type: "A",
  category: "Beauty Products",
  year: "2026",
  items: beautyItems,
  methodology:
    "This ranking of 2026 beauty product trends is based on year-over-year growth in a blended index of consumer demand signals. The index combines search interest (Google Trends), social media hashtag volume and engagement (TikTok, Instagram), and retail sales velocity from public marketplace data. Growth percentages compare July 2026 against July 2025. Representative brands are illustrative of each trend and are not ranked. The list is editorially curated to highlight categories with both measurable momentum and sustained consumer interest.",
  faqs: beautyFaqs,
  related: beautyRelated,
  tldr: beautyTldr,
  toc: beautyToc,
  author: AUTHOR,
  introduction:
    "The beauty industry in 2026 is defined by a single throughline: hydration, barrier health, and regeneration. From the viral explosion of 'glass skin' techniques to the rise of exosome and PDRN actives, consumers are prioritizing skin that looks healthy and resilient over coverage and correction. This trend ranking tracks the eight fastest-growing beauty product categories of 2026, ranked by year-over-year growth in combined search, social, and retail signals. Each entry includes a definition, representative brands, and an editorial insight into why the trend is accelerating.",
};

export const metadata: Metadata = {
  title: "Top Beauty Trends 2026: Glass Skin, Barrier Care, Exosomes & More",
  description:
    "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate. Discover glass skin, skin barrier repair, exosome skincare, lip oils, and at-home LED devices with representative brands and insights.",
  metadataBase: new URL("https://trending-hot.com"),
  alternates: {
    canonical: "/trending-beauty-products",
  },
  openGraph: {
    title:
      "Top Beauty Trends 2026: Glass Skin, Barrier Care, Exosomes & More | Trending Hot",
    description:
      "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate with representative brands and editorial insights.",
    url: "https://trending-hot.com/trending-beauty-products",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Top Beauty Trends 2026: Glass Skin, Barrier Care, Exosomes & More | Trending Hot",
    description:
      "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate with representative brands and editorial insights.",
  },
};

export default function TrendingBeautyProductsPage() {
  return <CategoryTrendTemplate data={beautyData} />;
}
