import type { Metadata } from "next";
import {
  PillarGuide,
  type ClusterArticle,
  type RelatedGuide,
} from "@/components/guides/PillarGuide";
import type { FAQItem } from "@/lib/listing/types";

export const metadata: Metadata = {
  title: "Beauty Trends 2026: The Complete Guide",
  description:
    "The complete guide to beauty and wellness trends in 2026 — trending beauty products, nano-hydroxyapatite oral care, toe spacers, foot wellness, and beet gummies supplements.",
  keywords: [
    "beauty trends 2026",
    "trending beauty products",
    "nano hydroxyapatite",
    "toe spacers",
    "foot wellness",
    "beet gummies",
    "wellness trends",
  ],
  openGraph: {
    title: "Beauty Trends 2026: The Complete Guide",
    description:
      "Your comprehensive map of beauty and wellness trends in 2026 — products, ingredients, and emerging categories.",
    url: "/guides/beauty-trends-2026",
    type: "article",
  },
  alternates: {
    canonical: "/guides/beauty-trends-2026",
  },
};

const clusters: ClusterArticle[] = [
  {
    title: "Trending Beauty Products",
    href: "/trending-beauty-products",
    description:
      "The complete ranking of trending beauty products in 2026, ranked by search momentum and consumer interest. Covers skincare, haircare, cosmetics, and wellness categories. Spot the next viral product before it peaks.",
  },
  {
    title: "Nano Hydroxyapatite in Oral Care",
    href: "/nano-hydroxyapatite-trends",
    description:
      "Nano-hydroxyapatite is replacing fluoride in toothpaste as consumers seek natural oral care alternatives in 2026. Explore the science, market growth, and leading brands adopting this remineralizing ingredient. A quiet revolution in dental care.",
  },
  {
    title: "Foot Wellness & Toe Spacers",
    href: "/toe-spacers-trends",
    description:
      "Toe spacers and foot wellness products gained mainstream attention in 2026, driven by the barefoot-movement and biomechanics trends. Discover the products, brands, and science behind foot health. From niche to viral wellness category.",
  },
  {
    title: "Beet Gummies & Supplements",
    href: "/beet-gummies-trends",
    description:
      "Beet gummies and nitric-oxide supplements surged in 2026 as consumers seek performance and cardiovascular benefits in convenient formats. Track the brands, ingredients, and market dynamics. The supplement aisle's new darling.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "What are the biggest beauty trends in 2026?",
    answer:
      "The standout beauty trends of 2026 include nano-hydroxyapatite toothpaste as a fluoride alternative, the rise of foot wellness products like toe spacers, and the surge in beet-based supplement gummies. Consumers increasingly favor science-backed, natural ingredients.",
  },
  {
    question: "Is nano-hydroxyapatite safe and effective?",
    answer:
      "Nano-hydroxyapatite is a biomimetic mineral that remineralizes enamel and is considered a safe, effective alternative to fluoride. Studies show comparable cavity-prevention results, and it is now used by a growing number of oral care brands in 2026.",
  },
  {
    question: "Why are toe spacers trending?",
    answer:
      "Toe spacers gained popularity in 2026 as part of the broader foot wellness and barefoot-movement trend. Advocates claim they improve alignment, relieve foot pain, and support natural foot mechanics — driving a new category of wellness products.",
  },
  {
    question: "Do beet gummies actually work?",
    answer:
      "Beet gummies deliver dietary nitrates that may support cardiovascular health and exercise performance by boosting nitric oxide. While individual results vary, the category has grown rapidly in 2026 as consumers seek convenient, functional supplements.",
  },
  {
    question: "Where can I find trending beauty products?",
    answer:
      "Our trending beauty products ranking tracks the fastest-rising items across skincare, haircare, cosmetics, and wellness by search momentum and consumer interest. It is updated regularly to catch emerging trends early.",
  },
];

const related: RelatedGuide[] = [
  {
    title: "Health & Wellness Trends 2026",
    href: "/guides/health-wellness-trends-2026",
    description: "Supplements, wellness gadgets, and preventive health trends.",
  },
  {
    title: "E-Commerce Trends 2026",
    href: "/guides/ecommerce-trends-2026",
    description: "Online retail, DTC brands, and digital commerce growth.",
  },
];

export default function BeautyTrends2026GuidePage() {
  return (
    <PillarGuide
      title="Beauty Trends 2026: The Complete Guide"
      subtitle="Your comprehensive map of beauty and wellness trends — trending products, breakthrough ingredients, and emerging categories shaping the industry."
      clusters={clusters}
      faqs={faqs}
      related={related}
    />
  );
}
