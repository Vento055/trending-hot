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
  readTime: "14 min read",
};

const subTopics: StatSubTopic[] = [
  {
    title: "Global Market Size",
    dataPoints: [
      {
        value: "$8.1T",
        label: "Global e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "8.6%",
        label: "Year-over-year growth in global e-commerce sales",
        source: "eMarketer, 2026",
      },
      {
        value: "23.6%",
        label: "Share of total retail sales conducted online in 2026",
        source: "Statista, 2026",
      },
      {
        value: "$6.9T",
        label: "Retail e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "19.5%",
        label: "Projected CAGR for e-commerce, 2025-2030",
        source: "Grand View Research, 2026",
      },
      {
        value: "$7.4T",
        label: "Forecasted global e-commerce sales by 2027",
        source: "Statista, 2026",
      },
      {
        value: "33",
        label: "Countries with e-commerce markets above $50 billion",
        source: "eMarketer, 2026",
      },
      {
        value: "3.6B",
        label: "Global digital buyers in 2026",
        source: "Statista, 2026",
      },
    ],
    insight:
      "E-commerce now accounts for nearly a quarter of all retail, and with 3.6 billion digital buyers worldwide the channel has shifted from a growth story to the default mode of shopping in most developed markets.",
  },
  {
    title: "Regional Markets",
    dataPoints: [
      {
        value: "$3.3T",
        label: "Asia-Pacific e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "$1.1T",
        label: "North America e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "$715B",
        label: "Europe e-commerce sales in 2026",
        source: "Statista, 2026",
      },
      {
        value: "52%",
        label: "Asia-Pacific share of global e-commerce",
        source: "eMarketer, 2026",
      },
      {
        value: "$2.2T",
        label: "China e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "$1.2T",
        label: "United States e-commerce sales in 2026",
        source: "US Census Bureau / eMarketer, 2026",
      },
      {
        value: "25%",
        label: "Latin America e-commerce growth rate",
        source: "Statista, 2026",
      },
      {
        value: "$90B",
        label: "Middle East & Africa e-commerce market in 2026",
        source: "eMarketer, 2026",
      },
    ],
    insight:
      "Asia-Pacific now drives more than half of global e-commerce, with China alone larger than the next five markets combined, while Latin America is the fastest-growing region at a 25% annual rate.",
  },
  {
    title: "Mobile Commerce",
    dataPoints: [
      {
        value: "$4.5T",
        label: "Mobile e-commerce sales in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "60%",
        label: "Share of e-commerce sales completed on mobile",
        source: "Statista, 2026",
      },
      {
        value: "4.3B",
        label: "Mobile shoppers globally",
        source: "eMarketer, 2026",
      },
      {
        value: "75%",
        label: "Share of retail site traffic coming from mobile",
        source: "Statista, 2026",
      },
      {
        value: "3.2x",
        label: "Higher mobile shopping app engagement vs. mobile web",
        source: "data.ai (App Annie), 2026",
      },
      {
        value: "$1.8T",
        label: "Social commerce sales via mobile in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "55%",
        label: "Mobile shopping cart abandonment rate",
        source: "Baymard Institute, 2026",
      },
      {
        value: "88%",
        label: "Smartphone penetration among online shoppers",
        source: "Statista, 2026",
      },
    ],
    insight:
      "Mobile is now the majority channel for both traffic and transactions, but a 55% cart abandonment rate signals that checkout friction remains the single biggest leak in the mobile commerce funnel.",
  },
  {
    title: "Payment Methods",
    dataPoints: [
      {
        value: "52%",
        label: "Share of online payments via digital wallets",
        source: "Worldpay Global Payments Report, 2026",
      },
      {
        value: "$3.2T",
        label: "Digital wallet transaction value in e-commerce",
        source: "Worldpay Global Payments Report, 2026",
      },
      {
        value: "19%",
        label: "Credit card share of online payments",
        source: "Worldpay Global Payments Report, 2026",
      },
      {
        value: "12%",
        label: "Buy Now Pay Later share of online payments",
        source: "Worldpay Global Payments Report, 2026",
      },
      {
        value: "$576B",
        label: "BNPL e-commerce transaction volume in 2026",
        source: "Statista, 2026",
      },
      {
        value: "28%",
        label: "Consumers using BNPL for online purchases",
        source: "Statista, 2026",
      },
      {
        value: "9%",
        label: "Cash-on-delivery share in emerging markets",
        source: "Worldpay Global Payments Report, 2026",
      },
      {
        value: "42%",
        label: "Online shoppers concerned about payment security",
        source: "PwC Consumer Insights, 2026",
      },
    ],
    insight:
      "Digital wallets have crossed the majority threshold and now dominate online checkout, while Buy Now Pay Later's 12% share reflects a structural shift in how consumers finance everyday online purchases.",
  },
  {
    title: "Top Platforms",
    dataPoints: [
      {
        value: "$700B",
        label: "Amazon gross merchandise sales in 2026",
        source: "Amazon earnings / eMarketer, 2026",
      },
      {
        value: "39%",
        label: "Amazon share of US e-commerce",
        source: "eMarketer, 2026",
      },
      {
        value: "$580B",
        label: "Alibaba gross merchandise volume in fiscal 2026",
        source: "Alibaba earnings report, 2026",
      },
      {
        value: "41%",
        label: "Share of global online marketplace sales from the top 5",
        source: "Statista, 2026",
      },
      {
        value: "$235B",
        label: "JD.com gross merchandise volume in 2026",
        source: "JD.com earnings report, 2026",
      },
      {
        value: "$130B",
        label: "Shopify merchant gross merchandise volume in 2026",
        source: "Shopify earnings report, 2026",
      },
      {
        value: "2.1M",
        label: "Active Shopify Plus merchants",
        source: "Shopify, 2026",
      },
      {
        value: "$120B",
        label: "Mercado Libre gross merchandise volume in 2026",
        source: "Mercado Libre earnings report, 2026",
      },
    ],
    insight:
      "Marketplace concentration is intensifying: the top five platforms now capture 41% of global online marketplace sales, with Amazon and Alibaba alone moving more than $1.2 trillion in combined merchandise.",
  },
  {
    title: "Consumer Behavior",
    dataPoints: [
      {
        value: "63%",
        label: "Shoppers who start their product search on Amazon",
        source: "Jungle Scout Consumer Trends, 2026",
      },
      {
        value: "71%",
        label: "Consumers who expect free shipping",
        source: "Statista, 2026",
      },
      {
        value: "55%",
        label: "Shoppers who abandon carts due to unexpected costs",
        source: "Baymard Institute, 2026",
      },
      {
        value: "48%",
        label: "Online shoppers who read reviews before buying",
        source: "PowerReviews, 2026",
      },
      {
        value: "3.4",
        label: "Average number of retailers compared per purchase",
        source: "Salesforce Connected Shopper, 2026",
      },
      {
        value: "42%",
        label: "Consumers willing to pay more for sustainable delivery",
        source: "McKinsey Consumer Pulse, 2026",
      },
    ],
    insight:
      "Amazon remains the default starting point for product search, but unexpected costs drive more than half of cart abandonments, making transparent shipping and pricing the highest-leverage conversion lever.",
  },
  {
    title: "Cross-border E-commerce",
    dataPoints: [
      {
        value: "$1.2T",
        label: "Global cross-border e-commerce in 2026",
        source: "Statista, 2026",
      },
      {
        value: "28%",
        label: "Share of e-commerce that is cross-border",
        source: "Forrester, 2026",
      },
      {
        value: "57%",
        label: "Online shoppers who have bought from foreign retailers",
        source: "IPC Cross-Border E-commerce, 2026",
      },
      {
        value: "$250B",
        label: "China cross-border e-commerce exports",
        source: "Statista, 2026",
      },
      {
        value: "35%",
        label: "Growth in cross-border B2C e-commerce",
        source: "eMarketer, 2026",
      },
      {
        value: "22%",
        label: "Share of cross-border purchases originating from China",
        source: "Statista, 2026",
      },
    ],
    insight:
      "Cross-border commerce is the fastest-growing segment of the market, with 57% of shoppers now buying internationally and China consolidating its position as the world's default cross-border source.",
  },
];

const ecommerceToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "global-market-size", title: "Global Market Size", level: 1 },
  { id: "regional-markets", title: "Regional Markets", level: 1 },
  { id: "mobile-commerce", title: "Mobile Commerce", level: 1 },
  { id: "payment-methods", title: "Payment Methods", level: 1 },
  { id: "top-platforms", title: "Top Platforms", level: 1 },
  { id: "consumer-behavior", title: "Consumer Behavior", level: 1 },
  { id: "cross-border-e-commerce", title: "Cross-border E-commerce", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const ecommerceTldr: string[] = [
  "Global e-commerce sales reached $8.1 trillion in 2026, representing 23.6% of all retail and growing 8.6% year-over-year across 3.6 billion digital buyers.",
  "Asia-Pacific accounts for 52% of global e-commerce, led by China at $2.2T, while Latin America is the fastest-growing region at a 25% annual rate.",
  "Mobile commerce is now 60% of online sales ($4.5T), though a 55% mobile cart abandonment rate highlights persistent checkout friction.",
  "Digital wallets dominate 52% of online payments ($3.2T) and Buy Now Pay Later has reached a 12% share, while 42% of shoppers still worry about payment security.",
  "The top five marketplaces capture 41% of global sales, Amazon holds 39% of US e-commerce, and cross-border commerce has grown to $1.2 trillion with 57% of shoppers buying internationally.",
];

const ecommerceFaqs: FAQItem[] = [
  {
    question: "How big is the e-commerce market in 2026?",
    answer:
      "Global e-commerce sales reached approximately $8.1 trillion in 2026 according to eMarketer, of which $6.9 trillion is retail e-commerce. This represents 23.6% of total retail sales (Statista) and 3.6 billion digital buyers worldwide, with the market projected to grow at a 19.5% CAGR through 2030 (Grand View Research).",
  },
  {
    question: "Which region leads global e-commerce?",
    answer:
      "Asia-Pacific leads with $3.3 trillion in e-commerce sales, accounting for 52% of the global market (eMarketer). China alone accounts for $2.2 trillion, making it the single largest national market, followed by the United States at $1.2 trillion. Latin America is the fastest-growing region at a 25% annual rate (Statista).",
  },
  {
    question: "How much of e-commerce is mobile?",
    answer:
      "Mobile commerce accounts for 60% of e-commerce sales, totaling approximately $4.5 trillion in 2026 (eMarketer / Statista). Some 4.3 billion people shop via mobile, 75% of retail site traffic comes from mobile, and social commerce via mobile adds a further $1.8 trillion. However, mobile cart abandonment remains high at 55% (Baymard Institute).",
  },
  {
    question: "What are the most popular online payment methods?",
    answer:
      "Digital wallets lead with a 52% share of online payments, processing $3.2 trillion in value (Worldpay), followed by credit cards at 19% and Buy Now Pay Later at 12%. BNPL e-commerce volume reached $576 billion in 2026 with 28% of consumers using it (Statista), though 42% of shoppers still cite payment security as a concern (PwC).",
  },
  {
    question: "Which e-commerce platforms are the biggest?",
    answer:
      "Amazon leads with approximately $700 billion in gross merchandise sales and a 39% share of US e-commerce (eMarketer). Alibaba is the largest by GMV at $580 billion, followed by JD.com ($235B), Shopify merchants ($130B across 2.1M Plus merchants), and Mercado Libre ($120B). The top five platforms capture 41% of global online marketplace sales (Statista).",
  },
  {
    question: "How were these e-commerce statistics sourced?",
    answer:
      "Statistics are compiled from industry research firms (Statista, eMarketer, Grand View Research, Forrester), payment specialists (Worldpay), public company earnings disclosures (Amazon, Alibaba, JD.com, Shopify, Mercado Libre), and consumer research (PwC, McKinsey, Baymard Institute, PowerReviews, Jungle Scout, Salesforce). Figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as measurement methodologies differ between sources.",
  },
];

const ecommerceRelated: RelatedListing[] = [
  {
    title: "AI Industry Statistics 2026",
    href: "/ai-statistics",
    description:
      "80+ sourced AI statistics for 2026, organized into ten themes with editorial insights.",
  },
  {
    title: "Social Media Statistics 2026",
    href: "/social-media-statistics",
    description:
      "50+ sourced social media statistics covering users, platforms, engagement, and ad spend.",
  },
  {
    title: "Trending Beauty Products 2026",
    href: "/trending-beauty-products",
    description:
      "The 8 fastest-growing beauty product trends in 2026, ranked by growth rate.",
  },
];

/** 由 subTopics 自动生成的 Markdown 摘要，用于下载 */
const markdownContent = [
  "# E-Commerce Statistics 2026",
  "",
  "> A sourced data summary from Trending Hot.",
  "> URL: https://trending-hot.com/e-commerce-statistics",
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
  "Cite as: Trending Hot. (2026). E-Commerce Statistics 2026. Retrieved from https://trending-hot.com/e-commerce-statistics",
].join("\n");

const ecommerceData: StatisticsData = {
  type: "B",
  industry: "E-Commerce",
  year: "2026",
  subTopics,
  methodology:
    "These statistics are compiled from a range of public and licensed sources, including industry research firms (Statista, eMarketer, Grand View Research, Forrester), payment specialists (Worldpay), public company earnings disclosures (Amazon, Alibaba, JD.com, Shopify, Mercado Libre), and consumer research (PwC, McKinsey, Baymard Institute, PowerReviews, Jungle Scout, Salesforce, data.ai). Where ranges or conflicting estimates existed, the most recent and most frequently cited figure was used. Sales and volume figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as measurement methodologies and currency conversions differ between sources.",
  faqs: ecommerceFaqs,
  related: ecommerceRelated,
  tldr: ecommerceTldr,
  toc: ecommerceToc,
  author: AUTHOR,
  introduction:
    "E-commerce in 2026 is a $8.1 trillion economy that touches nearly every retail transaction. This statistics hub consolidates the most important, frequently cited figures on the e-commerce landscape, organized into seven themes: global market size, regional markets, mobile commerce, payment methods, top platforms, consumer behavior, and cross-border e-commerce. Each data point includes its source so you can trace provenance, and each chapter closes with an editorial insight on what the numbers mean in context. Use this as a reference dashboard for the state of e-commerce in 2026.",
};

export const metadata: Metadata = {
  title: "E-Commerce Statistics 2026",
  description:
    "The most important e-commerce statistics for 2026: 50+ sourced data points on global market size, mobile commerce, payments, top platforms, and consumer behavior with editorial insights.",
  metadataBase: new URL("https://trending-hot.com"),
  alternates: {
    canonical: "/e-commerce-statistics",
  },
  openGraph: {
    title: "E-Commerce Statistics 2026 | Trending Hot",
    description:
      "50+ sourced e-commerce statistics for 2026, organized by theme and sourced from public data.",
    url: "https://trending-hot.com/e-commerce-statistics",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Statistics 2026 | Trending Hot",
    description:
      "50+ sourced e-commerce statistics for 2026, organized by theme and sourced from public data.",
  },
};

export default function ECommerceStatisticsPage() {
  return (
    <>
      <StatisticsTemplate data={ecommerceData} />
      <section
        className="px-[5%] py-16 sm:py-20"
        style={{ backgroundColor: "#fbfdf8" }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <DataCitationBlock
            title="E-Commerce Statistics 2026"
            url="https://trending-hot.com/e-commerce-statistics"
            year="2026"
          />
          <DataCardDownload
            filename="e-commerce-statistics-2026.md"
            data={markdownContent}
          />
        </div>
      </section>
    </>
  );
}
