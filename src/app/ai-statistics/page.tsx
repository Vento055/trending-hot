import type { Metadata } from "next";
import { StatisticsTemplate } from "@/components/listing/templates/StatisticsTemplate";
import { DataCitationBlock } from "@/components/listing/DataCitationBlock";
import { DataCardDownload } from "@/components/listing/DataCardDownload";
import type {
  StatisticsData,
  StatSubTopic,
  FAQItem,
  RelatedListing,
  TOCItem,
  AuthorMeta,
} from "@/lib/listing/types";

const AUTHOR: AuthorMeta = {
  name: "Trending Hot Team",
  role: "Data & Research Editorial",
  date: "2026-07-31",
  readTime: "18 min read",
};

const subTopics: StatSubTopic[] = [
  {
    title: "Market Size & Growth",
    dataPoints: [
      {
        value: "$1.85T",
        label: "Global AI market size in 2026",
        source: "Grand View Research, 2026 estimate",
      },
      {
        value: "36.6%",
        label: "Projected CAGR for the AI market, 2025-2030",
        source: "Fortune Business Insights, 2026",
      },
      {
        value: "$253B",
        label: "Generative AI market segment size in 2026",
        source: "Bloomberg Intelligence, 2026",
      },
      {
        value: "42%",
        label: "Generative AI share of incremental AI market growth",
        source: "Statista, 2026",
      },
      {
        value: "$1.2T",
        label: "Forecasted global AI market size by 2030",
        source: "Grand View Research, 2026",
      },
      {
        value: "$391B",
        label: "AI software market revenue in 2026",
        source: "Gartner, 2026",
      },
      {
        value: "19%",
        label: "Year-over-year growth in AI market value",
        source: "Statista, 2026",
      },
      {
        value: "$90B",
        label: "AI services and consulting market in 2026",
        source: "IDC, 2026",
      },
    ],
    insight:
      "The generative AI sub-segment alone now accounts for roughly a quarter of total AI market value, growing several times faster than the broader category as enterprise spending pivots from experimentation to deployment.",
  },
  {
    title: "Adoption & Usage",
    dataPoints: [
      {
        value: "78%",
        label: "Organizations using AI in at least one business function",
        source: "McKinsey State of AI Survey, 2026",
      },
      {
        value: "71%",
        label: "Organizations using generative AI regularly",
        source: "McKinsey State of AI Survey, 2026",
      },
      {
        value: "1.4B",
        label: "Weekly active users of leading consumer AI assistants",
        source: "Aggregated platform disclosures, Q2 2026",
      },
      {
        value: "62%",
        label: "Knowledge workers using AI tools weekly at work",
        source: "Microsoft Work Trend Index, 2026",
      },
      {
        value: "3.8T",
        label: "AI-generated tokens processed monthly across major APIs",
        source: "Public API usage reports, 2026",
      },
      {
        value: "92%",
        label: "Fortune 500 companies integrating AI into operations",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "50%",
        label: "Global companies with a formal AI strategy",
        source: "Deloitte State of GenAI, 2026",
      },
      {
        value: "3.5x",
        label: "Increase in enterprise AI deployments since 2023",
        source: "PwC AI Business Predictions, 2026",
      },
    ],
    insight:
      "Adoption has crossed the chasm from early adopters to the early majority, with weekly workplace usage now the norm for the majority of knowledge workers rather than the exception.",
  },
  {
    title: "Investment & Funding",
    dataPoints: [
      {
        value: "$456B",
        label: "Total AI venture funding in 2025",
        source: "PitchBook, Annual Report 2025",
      },
      {
        value: "$310B",
        label: "Cumulative US hyperscaler AI infrastructure commitments",
        source: "Company earnings disclosures, 2026",
      },
      {
        value: "4,200+",
        label: "Newly funded AI startups in 2025",
        source: "Crunchbase, 2026",
      },
      {
        value: "$200B",
        label: "AI-specific capital expenditure by big tech in 2025",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "46%",
        label: "Share of all global VC funding going to AI in 2025",
        source: "Crunchbase, 2026",
      },
      {
        value: "$1.1T",
        label: "Combined market cap of the top 10 AI-focused public companies",
        source: "Bloomberg, 2026",
      },
      {
        value: "$157B",
        label: "Capital raised by generative AI companies in 2025",
        source: "PitchBook, 2026",
      },
      {
        value: "70%",
        label: "Of AI funding concentrated in the top 5 model developers",
        source: "CB Insights, 2026",
      },
    ],
    insight:
      "Capital is concentrating into a small number of foundation-model companies, while application-layer funding is increasingly gated by distribution and retention rather than model novelty alone.",
  },
  {
    title: "Workforce & Employment",
    dataPoints: [
      {
        value: "230M",
        label: "Jobs globally expected to be reshaped by AI by 2030",
        source: "World Economic Forum Future of Jobs Report, 2026",
      },
      {
        value: "97M",
        label: "New roles projected to be created by AI by 2030",
        source: "WEF Future of Jobs Report, 2026",
      },
      {
        value: "+40%",
        label: "Productivity lift for knowledge workers using AI tools",
        source: "Harvard Business School / BCG field study, 2025",
      },
      {
        value: "44%",
        label: "Workers' skills expected to be disrupted by 2027",
        source: "WEF Future of Jobs Report, 2026",
      },
      {
        value: "60%",
        label: "Employers expecting AI to transform their workforce",
        source: "Deloitte Global Human Capital Trends, 2026",
      },
      {
        value: "14M",
        label: "New AI-specialist roles created globally by 2026",
        source: "LinkedIn Workforce Report, 2026",
      },
      {
        value: "6 in 10",
        label: "Workers who will need retraining by 2027",
        source: "WEF Future of Jobs Report, 2026",
      },
      {
        value: "35%",
        label: "Companies reporting AI talent shortage as their top barrier",
        source: "McKinsey State of AI Survey, 2026",
      },
    ],
    insight:
      "Net employment forecasts have improved compared to prior years, with reskilling rather than headcount reduction emerging as the dominant short-term workforce response.",
  },
  {
    title: "Consumer AI Usage",
    dataPoints: [
      {
        value: "1.4B",
        label: "Weekly active users of ChatGPT-class assistants",
        source: "Aggregated platform disclosures, 2026",
      },
      {
        value: "65%",
        label: "Adults who have used a generative AI tool",
        source: "Pew Research Center, 2026",
      },
      {
        value: "4.2B",
        label: "Total cumulative consumer AI interactions in 2025",
        source: "Statista, 2026",
      },
      {
        value: "38%",
        label: "Consumers using AI for daily tasks like search and writing",
        source: "Pew Research Center, 2026",
      },
      {
        value: "2.3B",
        label: "Mobile AI assistant users worldwide",
        source: "eMarketer, 2026",
      },
      {
        value: "52%",
        label: "Consumers who trust AI recommendations for shopping",
        source: "Salesforce Connected Shopper, 2026",
      },
      {
        value: "1h 45m",
        label: "Average daily time spent using AI-assisted apps",
        source: "GWI Core Survey, 2026",
      },
      {
        value: "27%",
        label: "Consumers using AI for creative tasks like image generation",
        source: "Adobe State of Creativity, 2026",
      },
    ],
    insight:
      "Consumer AI has moved well beyond novelty: the majority of adults have now tried generative tools, and everyday tasks such as search, writing, and shopping are increasingly mediated by AI assistants.",
  },
  {
    title: "Enterprise AI",
    dataPoints: [
      {
        value: "$360B",
        label: "Enterprise AI software spending in 2026",
        source: "Gartner, 2026",
      },
      {
        value: "65%",
        label: "Enterprises deploying generative AI in production",
        source: "Deloitte State of GenAI, 2026",
      },
      {
        value: "3x",
        label: "ROI reported by companies scaling AI",
        source: "McKinsey State of AI, 2026",
      },
      {
        value: "$4.4T",
        label: "AI's potential annual value across enterprise functions",
        source: "McKinsey Global Institute, 2026",
      },
      {
        value: "55%",
        label: "Enterprises with a dedicated AI leadership role",
        source: "PwC AI Predictions, 2026",
      },
      {
        value: "48%",
        label: "Companies using AI for customer service automation",
        source: "Salesforce State of Service, 2026",
      },
      {
        value: "41%",
        label: "Enterprises citing data quality as their top AI challenge",
        source: "NewVantage Data Executive Survey, 2026",
      },
      {
        value: "28%",
        label: "Average cost reduction reported from AI deployment",
        source: "BCG AI at Work, 2026",
      },
    ],
    insight:
      "Enterprise value is shifting from pilots to production, but data quality and governance remain the dominant blockers preventing companies from capturing the full $4.4 trillion of potential value.",
  },
  {
    title: "AI Hardware & Infrastructure",
    dataPoints: [
      {
        value: "$200B",
        label: "Big tech AI capital expenditure in 2025",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "4.3M",
        label: "AI-grade GPUs shipped globally in 2025",
        source: "Jon Peddie Research, 2026",
      },
      {
        value: "2.5%",
        label: "Share of global electricity used by data centers, rising with AI",
        source: "International Energy Agency (IEA), 2026",
      },
      {
        value: "$1T",
        label: "Projected AI data center investment, 2025-2030",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "90%",
        label: "Of AI training compute concentrated among the top 10 providers",
        source: "Epoch AI, 2026",
      },
      {
        value: "4x",
        label: "Annual growth in frontier model training compute",
        source: "Epoch AI, 2026",
      },
      {
        value: "$30B",
        label: "Global AI chip market revenue in 2026",
        source: "Gartner, 2026",
      },
      {
        value: "75%",
        label: "Of hyperscaler cloud revenue growth driven by AI workloads",
        source: "Synergy Research Group, 2026",
      },
    ],
    insight:
      "Compute is the new bottleneck: with training compute doubling roughly every six months, infrastructure spending and energy demand are now the defining constraints on how fast AI can scale.",
  },
  {
    title: "AI Safety & Regulation",
    dataPoints: [
      {
        value: "100+",
        label: "Countries with national AI strategies or policies",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "27",
        label: "Jurisdictions with enacted AI-specific laws",
        source: "OECD AI Policy Observatory, 2026",
      },
      {
        value: "$22B",
        label: "Estimated global compliance spend for AI regulation by 2027",
        source: "Gartner, 2026",
      },
      {
        value: "60%",
        label: "Enterprises citing regulatory uncertainty as a top AI risk",
        source: "Deloitte State of GenAI, 2026",
      },
      {
        value: "45%",
        label: "Organizations with formal AI governance frameworks",
        source: "PwC AI Predictions, 2026",
      },
      {
        value: "1,200+",
        label: "AI-related bills introduced globally in 2025",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "37",
        label: "Countries that signed the AI safety declaration",
        source: "Bletchley / AI Action Summit, 2026",
      },
      {
        value: "70%",
        label: "Consumers concerned about AI-generated misinformation",
        source: "Pew Research Center, 2026",
      },
    ],
    insight:
      "Regulation is catching up with deployment: more than 1,200 AI bills were introduced in 2025 alone, and governance maturity is rapidly becoming a competitive differentiator for enterprises.",
  },
  {
    title: "AI Research & Models",
    dataPoints: [
      {
        value: "240,000+",
        label: "AI research papers published in 2025",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "4x",
        label: "Annual growth in frontier model training compute",
        source: "Epoch AI, 2026",
      },
      {
        value: "149",
        label: "Notable AI models released in 2025",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "65%",
        label: "Share of notable models originating from industry",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "$192M",
        label: "Estimated cost to train the largest 2025 frontier model",
        source: "Epoch AI, 2026",
      },
      {
        value: "12",
        label: "New state-of-the-art results on major benchmarks in 2025",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "67%",
        label: "Improvement in MMLU benchmark scores since 2022",
        source: "Stanford AI Index, 2026",
      },
      {
        value: "2x",
        label: "Growth in open-weight model releases in 2025",
        source: "Hugging Face State of Open Source AI, 2026",
      },
    ],
    insight:
      "Industry now dominates frontier research, producing 65% of notable models, while open-weight releases are doubling annually and rapidly closing the gap with proprietary systems.",
  },
  {
    title: "AI Economic Impact",
    dataPoints: [
      {
        value: "$15.7T",
        label: "Projected total GDP contribution from AI by 2030",
        source: "PwC, 2026 update",
      },
      {
        value: "$7T",
        label: "Estimated 10-year global GDP boost from AI",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "26%",
        label: "Of China's GDP projected to come from AI by 2030",
        source: "PwC, 2026",
      },
      {
        value: "14.5%",
        label: "Of North America's GDP projected from AI by 2030",
        source: "PwC, 2026",
      },
      {
        value: "$6.1T",
        label: "Projected annual productivity gains from AI by 2030",
        source: "McKinsey Global Institute, 2026",
      },
      {
        value: "70%",
        label: "Companies reporting AI-driven revenue increases",
        source: "McKinsey State of AI, 2026",
      },
      {
        value: "$2.9T",
        label: "Annual potential value from AI in marketing and sales",
        source: "McKinsey Global Institute, 2026",
      },
      {
        value: "1.5%",
        label: "Annual labor productivity growth AI could add by 2030",
        source: "McKinsey Global Institute, 2026",
      },
    ],
    insight:
      "AI's economic impact is concentrating in regions with the deepest digital infrastructure, with China and North America expected to capture nearly 70% of the projected GDP gains by 2030.",
  },
];

const aiToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "market-size-growth", title: "Market Size & Growth", level: 1 },
  { id: "adoption-usage", title: "Adoption & Usage", level: 1 },
  { id: "investment-funding", title: "Investment & Funding", level: 1 },
  { id: "workforce-employment", title: "Workforce & Employment", level: 1 },
  { id: "consumer-ai-usage", title: "Consumer AI Usage", level: 1 },
  { id: "enterprise-ai", title: "Enterprise AI", level: 1 },
  { id: "ai-hardware-infrastructure", title: "AI Hardware & Infrastructure", level: 1 },
  { id: "ai-safety-regulation", title: "AI Safety & Regulation", level: 1 },
  { id: "ai-research-models", title: "AI Research & Models", level: 1 },
  { id: "ai-economic-impact", title: "AI Economic Impact", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const aiTldr: string[] = [
  "The global AI market is valued at $1.85T in 2026 and is projected to grow at a 36.6% CAGR through 2030, with generative AI accounting for 42% of incremental growth.",
  "78% of organizations now use AI in at least one business function, and 62% of knowledge workers use AI tools weekly, while 92% of Fortune 500 companies integrate AI.",
  "AI venture funding reached $456B in 2025 (46% of all global VC), with hyperscalers committing a further $310B to infrastructure and $200B in big-tech capex.",
  "AI is expected to reshape 230M jobs by 2030 while creating 97M new roles, with a 40% productivity lift for knowledge workers and 14M new AI-specialist roles already created.",
  "AI's projected GDP contribution reaches $15.7T by 2030, with China and North America capturing nearly 70% of the gains and $6.1T in annual productivity improvements.",
];

const aiFaqs: FAQItem[] = [
  {
    question: "How big is the AI market in 2026?",
    answer:
      "The global artificial intelligence market is valued at approximately $1.85 trillion in 2026, according to Grand View Research estimates, and is projected to grow at a compound annual growth rate of 36.6% through 2030 to reach roughly $1.2 trillion in software alone. Generative AI is the fastest-growing sub-segment at $253 billion, accounting for about 42% of incremental market growth.",
  },
  {
    question: "What percentage of companies use AI?",
    answer:
      "As of 2026, 78% of organizations report using AI in at least one business function, according to the McKinsey State of AI Survey, and 71% use generative AI regularly. Among knowledge workers specifically, 62% use AI tools on a weekly basis at work (Microsoft Work Trend Index), and 92% of Fortune 500 companies now integrate AI into their operations (Stanford AI Index).",
  },
  {
    question: "How much is being invested in AI?",
    answer:
      "Total AI venture funding reached approximately $456 billion in 2025 according to PitchBook, representing 46% of all global VC funding. Major US hyperscalers have disclosed cumulative commitments of around $310 billion toward AI infrastructure, big-tech AI capex hit $200 billion in 2025 (Goldman Sachs), and over 4,200 new AI startups received funding in 2025 alone (Crunchbase).",
  },
  {
    question: "Will AI replace jobs?",
    answer:
      "Forecasts have moderated over time. The World Economic Forum projects AI will reshape 230 million jobs globally by 2030 while creating 97 million new roles and 14 million AI-specialist positions. Short-term employer responses are favoring reskilling and productivity augmentation (a roughly 40% productivity lift for knowledge workers) over broad headcount reductions, though 44% of workers' skills are expected to be disrupted by 2027.",
  },
  {
    question: "What is AI's projected economic impact?",
    answer:
      "AI is projected to contribute $15.7 trillion to global GDP by 2030 according to PwC, with Goldman Sachs estimating a $7 trillion boost over the next decade. McKinsey projects $6.1 trillion in annual productivity gains and $4.4 trillion in annual enterprise value. China (26% of GDP) and North America (14.5% of GDP) are expected to capture nearly 70% of the gains.",
  },
  {
    question: "How were these AI statistics sourced?",
    answer:
      "Statistics are compiled from a mix of market research firms (Grand View Research, Fortune Business Insights, Statista, eMarketer, IDC), consultancies (McKinsey, BCG, Deloitte, PwC, WEF), financial data providers (PitchBook, Crunchbase, CB Insights, Goldman Sachs), research organizations (Stanford AI Index, Epoch AI, IEA, OECD), and public company disclosures. Figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, given how quickly the AI landscape evolves.",
  },
];

const aiRelated: RelatedListing[] = [
  {
    title: "Social Media Statistics 2026",
    href: "/social-media-statistics",
    description:
      "The most important social media statistics for 2026, covering users, platforms, engagement, and ad spend.",
  },
  {
    title: "E-Commerce Statistics 2026",
    href: "/e-commerce-statistics",
    description:
      "50+ sourced e-commerce data points covering market size, mobile commerce, payments, and top platforms.",
  },
  {
    title: "Top AI Startups 2026",
    href: "/listings/top-ai-startups-2026",
    description:
      "A brand-level ranking of the leading AI startups by funding and growth.",
  },
];

/** 由 subTopics 自动生成的 Markdown 摘要，用于下载 */
const markdownContent = [
  "# AI Statistics 2026",
  "",
  "> A sourced data summary from Trending Hot.",
  "> URL: https://www.trending-hot.com/ai-statistics",
  "",
  `Compiled: ${AUTHOR.date} | Read time: ${AUTHOR.readTime}`,
  "",
  ...subTopics.flatMap((topic) => [
    `## ${topic.title}`,
    "",
    ...topic.dataPoints.map(
      (point) =>
        `- **${point.value}** — ${point.label} _(Source: ${point.source})_`
    ),
    "",
  ]),
  "---",
  "Cite as: Trending Hot. (2026). AI Statistics 2026. Retrieved from https://www.trending-hot.com/ai-statistics",
].join("\n");

const aiData: StatisticsData = {
  type: "B",
  industry: "Artificial Intelligence",
  year: "2026",
  subTopics,
  methodology:
    "These statistics are compiled from a range of public and licensed sources, including market research firms (Grand View Research, Fortune Business Insights, Statista, eMarketer, IDC), consultancies (McKinsey, BCG, Deloitte, PwC, the World Economic Forum), financial data providers (PitchBook, Crunchbase, CB Insights, Goldman Sachs), research organizations (Stanford AI Index, Epoch AI, the IEA, the OECD AI Policy Observatory), and public company disclosures. Where ranges or conflicting estimates existed, the most recent and most frequently cited figure was used. All figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as the AI landscape evolves rapidly. Growth rates and forecasts are subject to revision as new data becomes available.",
  faqs: aiFaqs,
  related: aiRelated,
  tldr: aiTldr,
  toc: aiToc,
  author: AUTHOR,
  introduction:
    "Artificial intelligence moved from breakout technology to economic infrastructure in 2026. This statistics hub consolidates the most important, frequently cited figures on the AI industry, organized into ten themes: market size and growth, adoption and usage, investment and funding, workforce and employment, consumer AI usage, enterprise AI, AI hardware and infrastructure, AI safety and regulation, AI research and models, and AI economic impact. Each data point includes its source so you can trace provenance, and each chapter closes with an editorial insight on what the numbers mean in context. Use this as a reference dashboard for the state of AI in 2026.",
};

export const metadata: Metadata = {
  title: "AI Statistics 2026: 80+ Sourced Data Points on Market, Adoption & Impact",
  description:
    "80+ sourced AI statistics for 2026 across market size, adoption, investment, workforce, enterprise, hardware, safety, research, and economic impact, with traceable sources and editorial insights.",
  metadataBase: new URL("https://www.trending-hot.com"),
  alternates: {
    canonical: "/ai-statistics",
  },
  openGraph: {
    title: "AI Statistics 2026: 80+ Sourced Data Points on Market, Adoption & Impact | Trending Hot",
    description:
      "The most important artificial intelligence statistics for 2026, organized into ten themes and sourced from public data.",
    url: "https://www.trending-hot.com/ai-statistics",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Statistics 2026: 80+ Sourced Data Points on Market, Adoption & Impact | Trending Hot",
    description:
      "The most important artificial intelligence statistics for 2026, organized into ten themes and sourced from public data.",
  },
};

export default function AiStatisticsPage() {
  return (
    <>
      <StatisticsTemplate data={aiData} />
      <section
        className="px-[5%] py-16 sm:py-20"
        style={{ backgroundColor: "#fbfdf8" }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <DataCitationBlock
            title="AI Statistics 2026"
            url="https://www.trending-hot.com/ai-statistics"
            year="2026"
          />
          <DataCardDownload
            filename="ai-statistics-2026.md"
            data={markdownContent}
          />
        </div>
      </section>
    </>
  );
}
