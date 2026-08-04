import type { Metadata } from "next";
import { CompanyListTemplate } from "@/components/listing/templates/CompanyListTemplate";
import type {
  CompanyListData,
  CompanyItem,
  FAQItem,
  RelatedListing,
  TOCItem,
  AuthorMeta,
} from "@/lib/listing/types";

const AUTHOR: AuthorMeta = {
  name: "Trending Hot Team",
  role: "AI & Startups Editorial",
  date: "2026-07-31",
  readTime: "12 min read",
};

const companies: CompanyItem[] = [
  {
    rank: 1,
    name: "OpenAI",
    description:
      "Creator of the GPT family of foundation models and the ChatGPT assistant, driving the consumer and enterprise generative AI category with broad model, API, and subscription offerings.",
    keyMetric: "$500B",
    keyMetricLabel: "Valuation",
    website: "https://openai.com",
    founded: "2015",
    funding: "$17.9B raised",
  },
  {
    rank: 2,
    name: "Anthropic",
    description:
      "AI safety lab behind the Claude family of large language models, focused on interpretable, steerable, and reliable AI for enterprise and developer use cases.",
    keyMetric: "$61.5B",
    keyMetricLabel: "Valuation",
    website: "https://www.anthropic.com",
    founded: "2021",
    funding: "$13.7B raised",
  },
  {
    rank: 3,
    name: "Scale AI",
    description:
      "Data infrastructure and labeling platform powering frontier model training and evaluation for leading AI labs, governments, and enterprises.",
    keyMetric: "$29B",
    keyMetricLabel: "Valuation",
    website: "https://scale.com",
    founded: "2016",
    funding: "$1.3B raised",
  },
  {
    rank: 4,
    name: "Perplexity AI",
    description:
      "Answer engine combining real-time web retrieval with large language models, delivering cited, conversational answers to consumer and pro search queries.",
    keyMetric: "$9B",
    keyMetricLabel: "Valuation",
    website: "https://www.perplexity.ai",
    founded: "2022",
    funding: "$500M raised",
  },
  {
    rank: 5,
    name: "Mistral AI",
    description:
      "Paris-based builder of open-weight and commercial large language models, championing European AI sovereignty with efficient, portable model architectures.",
    keyMetric: "$6.2B",
    keyMetricLabel: "Valuation",
    website: "https://mistral.ai",
    founded: "2023",
    funding: "$1B raised",
  },
  {
    rank: 6,
    name: "Midjourney",
    description:
      "Independent research lab and image generation service whose text-to-image models set the aesthetic benchmark for AI art across creative and design workflows.",
    keyMetric: "$6B",
    keyMetricLabel: "Valuation",
    website: "https://www.midjourney.com",
    founded: "2021",
    funding: "Bootstrapped",
  },
  {
    rank: 7,
    name: "Cohere",
    description:
      "Enterprise-focused language model company providing retrieval-augmented generation, embeddings, and customized models tailored to business data and privacy requirements.",
    keyMetric: "$5.5B",
    keyMetricLabel: "Valuation",
    website: "https://cohere.com",
    founded: "2019",
    funding: "$970M raised",
  },
  {
    rank: 8,
    name: "Glean",
    description:
      "Workplace AI search and assistant platform that connects to enterprise data sources to deliver grounded answers and agents across an organization's knowledge base.",
    keyMetric: "$4.6B",
    keyMetricLabel: "Valuation",
    website: "https://www.glean.com",
    founded: "2019",
    funding: "$260M raised",
  },
  {
    rank: 9,
    name: "Hugging Face",
    description:
      "Open platform and hub for machine learning models, datasets, and applications, serving as the default collaboration layer for the open-source AI community.",
    keyMetric: "$4.5B",
    keyMetricLabel: "Valuation",
    website: "https://huggingface.co",
    founded: "2016",
    funding: "$395M raised",
  },
  {
    rank: 10,
    name: "Grammarly",
    description:
      "AI writing assistance platform integrating generative grammar, tone, and clarity suggestions across productivity tools, with an expanding enterprise footprint.",
    keyMetric: "$13B",
    keyMetricLabel: "Valuation",
    website: "https://www.grammarly.com",
    founded: "2009",
    funding: "$400M raised",
  },
  {
    rank: 11,
    name: "DeepL",
    description:
      "Neural machine translation and writing platform renowned for high-fidelity, context-aware translation across 30+ languages for businesses and consumers.",
    keyMetric: "$2B",
    keyMetricLabel: "Valuation",
    website: "https://www.deepl.com",
    founded: "2017",
    funding: "$100M raised",
  },
  {
    rank: 12,
    name: "Runway",
    description:
      "Creative AI studio building video generation and editing tools, including text-to-video and image-to-video models used across film, advertising, and design.",
    keyMetric: "$3B",
    keyMetricLabel: "Valuation",
    website: "https://runwayml.com",
    founded: "2018",
    funding: "$300M raised",
  },
  {
    rank: 13,
    name: "Inflection AI",
    description:
      "Consumer AI studio originally behind the Pi assistant, now focused on enterprise conversational AI and custom foundation models for large organizations.",
    keyMetric: "$1.5B",
    keyMetricLabel: "Valuation",
    website: "https://inflection.ai",
    founded: "2022",
    funding: "$1.5B raised",
  },
  {
    rank: 14,
    name: "AI21 Labs",
    description:
      "Israeli NLP company developing the Jamba family of language models and an enterprise platform for building reliable text-generation applications at scale.",
    keyMetric: "$1.4B",
    keyMetricLabel: "Valuation",
    website: "https://www.ai21.com",
    founded: "2017",
    funding: "$336M raised",
  },
  {
    rank: 15,
    name: "Character.ai",
    description:
      "Conversational AI platform letting users create and chat with custom AI characters, building one of the largest consumer engagement bases in generative AI.",
    keyMetric: "$1B",
    keyMetricLabel: "Valuation",
    website: "https://character.ai",
    founded: "2021",
    funding: "$193M raised",
  },
  {
    rank: 16,
    name: "Adept",
    description:
      "AI agent company building models that can take actions across software tools and websites, with continuing enterprise tooling development following strategic partnerships.",
    keyMetric: "$1B",
    keyMetricLabel: "Valuation",
    website: "https://www.adept.ai",
    founded: "2022",
    funding: "$415M raised",
  },
  {
    rank: 17,
    name: "Stability AI",
    description:
      "Open-source generative AI company behind the Stable Diffusion image models, providing customizable foundation models for image, video, and audio generation.",
    keyMetric: "$1B",
    keyMetricLabel: "Valuation",
    website: "https://stability.ai",
    founded: "2020",
    funding: "$100M raised",
  },
  {
    rank: 18,
    name: "Synthesis AI",
    description:
      "Synthetic data platform generating photorealistic, privacy-compliant training data to improve computer vision and perception model performance.",
    keyMetric: "$1B",
    keyMetricLabel: "Valuation",
    website: "https://synthesis.ai",
    founded: "2019",
    funding: "$55M raised",
  },
  {
    rank: 19,
    name: "Tome",
    description:
      "Generative storytelling and presentation platform that turns prompts and documents into designed slide decks and narratives for knowledge workers.",
    keyMetric: "$620M",
    keyMetricLabel: "Valuation",
    website: "https://tome.app",
    founded: "2020",
    funding: "$94M raised",
  },
  {
    rank: 20,
    name: "Descript",
    description:
      "AI-powered audio and video editing studio that lets creators edit recorded content by editing text, with transcription, voice cloning, and screen recording built in.",
    keyMetric: "$553M",
    keyMetricLabel: "Valuation",
    website: "https://www.descript.com",
    founded: "2017",
    funding: "$100M raised",
  },
];

const aiToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "ranking", title: "Top AI Companies", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const aiTldr: string[] = [
  "OpenAI leads the 2026 AI startup ranking with a $500B valuation, followed by Anthropic at $61.5B and Scale AI at $29B.",
  "Capital is concentrating into a handful of foundation-model and data-infrastructure companies, with the top 5 accounting for the majority of total funding.",
  "Open-weight players like Mistral AI and Hugging Face are carving out a European and community-driven counterweight to closed frontier labs.",
  "Vertical and applied AI startups (Perplexity, Glean, Descript, Tome) are scaling on distribution and retention rather than model novelty alone.",
  "Creative AI companies (Midjourney, Runway, Stability AI) remain the most influential brand builders in the generative media category.",
];

const aiFaqs: FAQItem[] = [
  {
    question: "Which AI startup has the highest valuation in 2026?",
    answer:
      "OpenAI holds the highest valuation among AI startups in 2026 at approximately $500 billion, making it the most valuable private AI company in the world. Anthropic ranks second at roughly $61.5 billion, followed by Scale AI at around $29 billion. These three companies absorb the majority of total AI venture capital deployed.",
  },
  {
    question: "How are these AI startups ranked?",
    answer:
      "Startups are ranked primarily by their most recent publicly reported valuation, with total funding raised and category influence used as secondary signals. Valuations reflect the latest known funding round as of mid-2026 and may include secondary market transactions. The ranking favors independent companies and excludes acquired or majority-owned subsidiaries where data is no longer separable.",
  },
  {
    question: "What is the difference between foundation model and applied AI startups?",
    answer:
      "Foundation model startups like OpenAI, Anthropic, and Mistral AI build the core large language and multimodal models that power the broader ecosystem. Applied AI startups such as Perplexity, Glean, Descript, and Tome build products on top of these models, focusing on specific workflows like search, enterprise knowledge, or content creation. Both categories are growing, but value capture is concentrating at the foundation layer.",
  },
  {
    question: "Are open-source AI startups viable competitors to closed labs?",
    answer:
      "Open-weight companies like Mistral AI, Hugging Face, and Stability AI have proven viable by serving enterprise buyers that need portability, customization, and data residency. While they typically trail closed frontier labs on raw benchmark performance, they compete on cost, control, and deployment flexibility, and have attracted substantial funding and enterprise adoption in 2026.",
  },
  {
    question: "How much funding have the top AI startups raised?",
    answer:
      "The top 20 AI startups in this ranking have collectively raised tens of billions of dollars, with OpenAI alone raising roughly $17.9 billion and Anthropic around $13.7 billion. Total AI venture funding reached approximately $456 billion in 2025 according to PitchBook, with a disproportionate share flowing to a small number of foundation-model and infrastructure companies.",
  },
  {
    question: "Which AI startups are profitable?",
    answer:
      "Relatively few leading AI startups are profitable in 2026, as most reinvest revenue into compute, talent, and research. Midjourney is widely reported to be profitable while remaining bootstrapped, and companies like Grammarly and DeepL with mature enterprise revenue streams are closer to profitability than pure foundation-model labs. The broader cohort remains focused on growth and market share over near-term profitability.",
  },
];

const aiRelated: RelatedListing[] = [
  {
    title: "Trending Beauty Products 2026",
    href: "/trending-beauty-products",
    description:
      "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate.",
  },
  {
    title: "AI Industry Statistics 2026",
    href: "/ai-statistics",
    description:
      "The most important artificial intelligence statistics for 2026, covering market size, adoption, and funding.",
  },
  {
    title: "Best AI Writing Tools for Students",
    href: "/best-ai-writing-tools-for-students",
    description:
      "A comparison of the leading AI writing and research tools built for student workflows.",
  },
  {
    title: "Most Visited Websites in Japan",
    href: "/most-visited-websites-in-japan",
    description:
      "Japan's 50 most visited websites, led by Yahoo Japan, Google, and Amazon.",
  },
];

const aiData: CompanyListData = {
  type: "C",
  industry: "AI",
  year: "2026",
  companies,
  methodology:
    "This ranking of the fastest-growing AI startups in 2026 is based on the most recent publicly reported valuations, supplemented by total disclosed funding raised and editorial assessment of category influence. Valuation figures reflect the latest known primary or secondary funding round as of mid-2026 and are drawn from company announcements, investor disclosures, and reporting from Crunchbase and PitchBook. Funding figures represent cumulative disclosed equity raised and exclude debt where possible. Companies are included based on independence and material AI focus; acquired or majority-owned subsidiaries are omitted where separable data is unavailable. The ranking is editorially curated and directional rather than a precise market measurement.",
  faqs: aiFaqs,
  related: aiRelated,
  tldr: aiTldr,
  toc: aiToc,
  author: AUTHOR,
  introduction:
    "The generative AI boom has produced one of the most concentrated capital events in technology history. In 2026, a small number of foundation-model companies command valuations that rival the largest public tech firms, while a broader cohort of applied AI startups is racing to build defensible products on top of them. This ranking tracks the 20 fastest-growing AI startups by valuation, from OpenAI at $500 billion down to applied-tooling companies like Descript. Each entry includes a short description, the key valuation metric, founding year, and total funding raised, offering a snapshot of where capital, talent, and attention are flowing across the AI stack.",
};

export const metadata: Metadata = {
  title: "Fastest Growing AI Startups [2026]",
  description:
    "The 20 fastest-growing AI startups in 2026, ranked by valuation. Explore OpenAI, Anthropic, Scale AI, Perplexity, Mistral AI and more with funding and key metrics.",
  metadataBase: new URL("https://www.trending-hot.com"),
  alternates: {
    canonical: "/fastest-growing-ai-startups",
  },
  openGraph: {
    title: "Fastest Growing AI Startups [2026] | Trending Hot",
    description:
      "The 20 fastest-growing AI startups in 2026, ranked by valuation with funding and key metrics.",
    url: "https://www.trending-hot.com/fastest-growing-ai-startups",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastest Growing AI Startups [2026] | Trending Hot",
    description:
      "The 20 fastest-growing AI startups in 2026, ranked by valuation with funding and key metrics.",
  },
};

export default function FastestGrowingAiStartupsPage() {
  return <CompanyListTemplate data={aiData} />;
}
