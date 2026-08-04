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
  readTime: "15 min read",
};

const subTopics: StatSubTopic[] = [
  {
    title: "User Demographics",
    dataPoints: [
      {
        value: "5.42B",
        label: "Global social media users in 2026",
        source: "Statista, 2026 estimate",
      },
      {
        value: "68%",
        label: "Share of the global population using social media",
        source: "DataReportal / Meltwater, 2026",
      },
      {
        value: "2h 23m",
        label: "Average daily time spent on social platforms per user",
        source: "GWI Core Survey, 2026",
      },
      {
        value: "60.7%",
        label: "Adults aged 18-34 using social media every day",
        source: "Pew Research Center, 2026",
      },
      {
        value: "54%",
        label: "Share of active users who are female",
        source: "Statista, 2026",
      },
      {
        value: "9.2",
        label: "Average number of social platforms used per person",
        source: "GWI Core Survey, 2026",
      },
      {
        value: "3.1B",
        label: "Social media users in the Asia-Pacific region",
        source: "Statista, 2026",
      },
      {
        value: "+8.5%",
        label: "Year-over-year growth in global social media users",
        source: "DataReportal / Meltwater, 2026",
      },
      {
        value: "4.9B",
        label: "Social media users accessing platforms via mobile",
        source: "eMarketer, 2026",
      },
    ],
    insight:
      "Social media is now near-universal among adults under 35, but the fastest user growth is coming from older cohorts (55+) and emerging markets, shifting the demographic center of gravity toward new audience segments.",
  },
  {
    title: "Platform Usage",
    dataPoints: [
      {
        value: "3.07B",
        label: "Facebook monthly active users",
        source: "Meta earnings report, Q2 2026",
      },
      {
        value: "2.5B",
        label: "Instagram monthly active users",
        source: "Meta earnings report, 2026",
      },
      {
        value: "3.2B",
        label: "WhatsApp monthly active users",
        source: "Meta earnings report, 2026",
      },
      {
        value: "2.7B",
        label: "YouTube monthly logged-in users",
        source: "Alphabet earnings report, 2026",
      },
      {
        value: "1.58B",
        label: "TikTok monthly active users worldwide",
        source: "Statista, 2026",
      },
      {
        value: "600M",
        label: "Telegram monthly active users",
        source: "Statista, 2026",
      },
      {
        value: "556M",
        label: "X (formerly Twitter) monthly active users",
        source: "Statista, 2026",
      },
      {
        value: "425M",
        label: "Snapchat monthly active users",
        source: "Snap Inc. earnings, 2026",
      },
      {
        value: "175M",
        label: "LinkedIn monthly active members",
        source: "LinkedIn official data, 2026",
      },
    ],
    insight:
      "Meta's family of apps remains dominant by sheer scale, but TikTok continues to capture the largest share of incremental time spent, especially among users under 25, intensifying competition for attention rather than raw reach.",
  },
  {
    title: "Content Engagement",
    dataPoints: [
      {
        value: "4.2%",
        label: "Average engagement rate for brands on Instagram",
        source: "Hootsuite Social Media Report, 2026",
      },
      {
        value: "1.8%",
        label: "Average engagement rate per Facebook post",
        source: "RivalIQ Industry Benchmark, 2026",
      },
      {
        value: "5.6%",
        label: "Average engagement rate for brands on TikTok",
        source: "RivalIQ Industry Benchmark, 2026",
      },
      {
        value: "6x",
        label: "Higher engagement for video vs. static posts on Instagram",
        source: "Hootsuite Social Media Report, 2026",
      },
      {
        value: "80%",
        label: "Marketers who say video drives the most engagement",
        source: "Wyzowl State of Video, 2026",
      },
      {
        value: "3h",
        label: "Daily time Gen Z spends on short-form video",
        source: "eMarketer, 2026",
      },
      {
        value: "17",
        label: "Average posts per week from top-performing brands",
        source: "Sprout Social Index, 2026",
      },
      {
        value: "2.5B",
        label: "Daily short-form video views across major platforms",
        source: "Statista, 2026",
      },
      {
        value: "47%",
        label: "Users who prefer video over text content from brands",
        source: "HubSpot State of Marketing, 2026",
      },
    ],
    insight:
      "Short-form video has become the default engagement format across platforms, with video posts consistently outperforming static content and prompting platforms to restructure feeds around algorithmic video discovery.",
  },
  {
    title: "Advertising Spend",
    dataPoints: [
      {
        value: "$263B",
        label: "Global social media advertising spend in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "33.5%",
        label: "Share of total digital ad spend going to social platforms",
        source: "Statista, 2026",
      },
      {
        value: "$1.6B",
        label: "Average daily social advertising revenue at Meta",
        source: "Meta earnings report, Q2 2026",
      },
      {
        value: "$24B",
        label: "TikTok global advertising revenue in 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "92%",
        label: "Marketers using social media advertising in 2026",
        source: "HubSpot State of Marketing, 2026",
      },
      {
        value: "4.5%",
        label: "Average click-through rate on social media ads",
        source: "WordStream Ad Benchmarks, 2026",
      },
      {
        value: "$11.2",
        label: "Average CPM (cost per mille) on Instagram in 2026",
        source: "Statista, 2026",
      },
      {
        value: "64%",
        label: "Share of social ad spend allocated to mobile",
        source: "eMarketer, 2026",
      },
      {
        value: "8.7%",
        label: "Year-over-year growth in social ad spend",
        source: "eMarketer, 2026",
      },
    ],
    insight:
      "Social ad spend continues to grow faster than the broader digital market, but rising CPMs and signal-loss from privacy changes are pushing advertisers toward creator partnerships and first-party data strategies to maintain efficiency.",
  },
  {
    title: "Creator Economy",
    dataPoints: [
      {
        value: "50M+",
        label: "Global content creators earning revenue",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "$480B",
        label: "Projected creator economy market size by 2027",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "$24B",
        label: "Influencer marketing spend in 2026",
        source: "Influencer Marketing Hub, 2026",
      },
      {
        value: "39%",
        label: "Creators citing brand deals as their top revenue source",
        source: "Influencer Marketing Hub, 2026",
      },
      {
        value: "4x",
        label: "Growth in creators earning $1M+ annually since 2021",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "207M",
        label: "Global creators producing content",
        source: "Goldman Sachs Research, 2026",
      },
      {
        value: "28%",
        label: "Creators earning a full-time income from content",
        source: "ConvertKit Creator Benchmark, 2026",
      },
      {
        value: "$5.8B",
        label: "Platform creator fund and monetization payouts in 2026",
        source: "Statista, 2026",
      },
      {
        value: "70%",
        label: "Brands increasing their creator marketing budgets",
        source: "HubSpot State of Marketing, 2026",
      },
    ],
    insight:
      "The creator economy is professionalizing rapidly, with mid-tier and top creators diversifying beyond brand deals into products, subscriptions, and platform revenue shares, making creator partnerships a core rather than experimental channel.",
  },
  {
    title: "Emerging Trends",
    dataPoints: [
      {
        value: "75%",
        label: "Marketers investing in AI-generated social content",
        source: "Hootsuite Social Trends Survey, 2026",
      },
      {
        value: "$1.2T",
        label: "Projected global social commerce sales by 2026",
        source: "eMarketer, 2026",
      },
      {
        value: "45%",
        label: "Brands using native social commerce features",
        source: "eMarketer, 2026",
      },
      {
        value: "62%",
        label: "Gen Z who discover new products via social platforms",
        source: "Pew Research Center, 2026",
      },
      {
        value: "30%",
        label: "Growth in live streaming and social audio engagement",
        source: "Hootsuite Social Media Report, 2026",
      },
      {
        value: "4.8B",
        label: "AR filter users on social platforms",
        source: "Snap Inc. / Statista, 2026",
      },
      {
        value: "2.0B",
        label: "Social audio listeners globally",
        source: "eMarketer, 2026",
      },
      {
        value: "89%",
        label: "Marketers say social commerce is a priority",
        source: "HubSpot State of Marketing, 2026",
      },
      {
        value: "3.5x",
        label: "Higher conversion rate for live shopping vs. static posts",
        source: "McKinsey Digital Commerce, 2026",
      },
    ],
    insight:
      "AI-generated content, social commerce, and live formats are converging, with discovery increasingly happening inside social platforms rather than search, forcing brands to treat social as a primary storefront and not just a marketing channel.",
  },
];

const socialToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "user-demographics", title: "User Demographics", level: 1 },
  { id: "platform-usage", title: "Platform Usage", level: 1 },
  { id: "content-engagement", title: "Content Engagement", level: 1 },
  { id: "advertising-spend", title: "Advertising Spend", level: 1 },
  { id: "creator-economy", title: "Creator Economy", level: 1 },
  { id: "emerging-trends", title: "Emerging Trends", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

const socialTldr: string[] = [
  "There are 5.42 billion social media users in 2026, representing 68% of the global population, with the average user spending 2 hours 23 minutes per day across 9.2 platforms.",
  "Facebook remains the largest platform at 3.07 billion monthly users, while WhatsApp (3.2B) and YouTube (2.7B) also top the charts and TikTok (1.58B) captures the largest share of incremental time.",
  "Global social ad spend reached $263 billion in 2026 (33.5% of digital ad spend), with TikTok ad revenue at $24 billion and 92% of marketers using social ads.",
  "The creator economy now spans 50M+ monetizing creators and 207M total creators, with influencer marketing at $24 billion and the market projected to reach $480 billion by 2027.",
  "Short-form video, AI-generated content, and social commerce are converging, with social commerce sales projected to hit $1.2 trillion in 2026 and 89% of marketers prioritizing it.",
];

const socialFaqs: FAQItem[] = [
  {
    question: "How many people use social media in 2026?",
    answer:
      "Approximately 5.42 billion people use social media worldwide in 2026, according to Statista, which represents about 68% of the global population per DataReportal. The average user spends 2 hours and 23 minutes per day across 9.2 platforms, according to the GWI Core Survey, and 4.9 billion access social media via mobile.",
  },
  {
    question: "Which social media platform has the most users?",
    answer:
      "WhatsApp leads Meta's family of apps at approximately 3.2 billion monthly active users, followed by Facebook at 3.07 billion (Meta earnings, Q2 2026) and YouTube at 2.7 billion logged-in users (Alphabet). Instagram ranks next at roughly 2.5 billion, followed by TikTok at around 1.58 billion monthly users according to Statista.",
  },
  {
    question: "How much is spent on social media advertising?",
    answer:
      "Global social media advertising spend reached approximately $263 billion in 2026 according to eMarketer, representing about 33.5% of total digital ad spend. Some 92% of marketers now use social media advertising according to HubSpot, TikTok ad revenue hit $24 billion, and the average click-through rate on social ads is roughly 4.5% according to WordStream benchmarks.",
  },
  {
    question: "How big is the creator economy in 2026?",
    answer:
      "The creator economy includes more than 50 million monetizing creators and 207 million total creators globally in 2026, according to Goldman Sachs Research, which projects the market to reach $480 billion by 2027. Influencer marketing spend alone reached approximately $24 billion in 2026 according to Influencer Marketing Hub, with 70% of brands increasing creator budgets.",
  },
  {
    question: "What is social commerce and how fast is it growing?",
    answer:
      "Social commerce refers to buying products directly within social media platforms through native checkout and shoppable content features. Global social commerce sales are projected to reach $1.2 trillion in 2026 according to eMarketer, with 45% of brands now using native social commerce features and 89% of marketers calling it a priority (HubSpot). Live shopping converts 3.5x better than static posts (McKinsey).",
  },
  {
    question: "How were these social media statistics sourced?",
    answer:
      "Statistics are compiled from industry research firms (Statista, eMarketer, GWI, DataReportal), public company earnings disclosures (Meta, Snap, Alphabet), industry surveys (Pew Research, HubSpot, Hootsuite), and specialist reports (Goldman Sachs, Influencer Marketing Hub, Wyzowl, RivalIQ, WordStream, Sprout Social, ConvertKit). Figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as platform-reported metrics and methodologies differ between sources.",
  },
];

const socialRelated: RelatedListing[] = [
  {
    title: "AI Industry Statistics 2026",
    href: "/ai-statistics",
    description:
      "80+ sourced AI statistics for 2026, organized into ten themes with editorial insights.",
  },
  {
    title: "E-Commerce Statistics 2026",
    href: "/e-commerce-statistics",
    description:
      "50+ sourced e-commerce data points covering market size, mobile commerce, payments, and top platforms.",
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
  "# Social Media Statistics 2026",
  "",
  "> A sourced data summary from Trending Hot.",
  "> URL: https://www.trending-hot.com/social-media-statistics",
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
  "Cite as: Trending Hot. (2026). Social Media Statistics 2026. Retrieved from https://www.trending-hot.com/social-media-statistics",
].join("\n");

const socialData: StatisticsData = {
  type: "B",
  industry: "Social Media",
  year: "2026",
  subTopics,
  methodology:
    "These statistics are compiled from a range of public and licensed sources, including industry research firms (Statista, eMarketer, GWI, DataReportal), public company earnings disclosures (Meta, Snap Inc., Alphabet), industry surveys (Pew Research Center, HubSpot, Hootsuite), and specialist reports (Goldman Sachs Research, Influencer Marketing Hub, Wyzowl, RivalIQ, WordStream, Sprout Social, ConvertKit). Where ranges or conflicting estimates existed, the most recent and most frequently cited figure was used. User and revenue figures are point-in-time estimates for 2026 and should be treated as directional rather than precise, as platform-reported metrics and measurement methodologies differ between sources.",
  faqs: socialFaqs,
  related: socialRelated,
  tldr: socialTldr,
  toc: socialToc,
  author: AUTHOR,
  introduction:
    "Social media in 2026 is no longer just a marketing channel; it is the primary surface for discovery, commerce, and culture. This statistics hub consolidates the most important, frequently cited figures on the social media landscape, organized into six themes: user demographics, platform usage, content engagement, advertising spend, the creator economy, and emerging trends. Each data point includes its source so you can trace provenance, and each chapter closes with an editorial insight on what the numbers mean in context. Use this as a reference dashboard for the state of social media in 2026.",
};

export const metadata: Metadata = {
  title: "Social Media Statistics 2026: 50+ Sourced Data Points on Users & Ad Spend",
  description:
    "50+ sourced social media statistics for 2026 covering users, platforms, engagement, ad spend, the creator economy, and social commerce, with traceable sources and editorial insights.",
  metadataBase: new URL("https://www.trending-hot.com"),
  alternates: {
    canonical: "/social-media-statistics",
  },
  openGraph: {
    title: "Social Media Statistics 2026: 50+ Sourced Data Points | Trending Hot",
    description:
      "The most important social media statistics for 2026, organized by theme and sourced from public data.",
    url: "https://www.trending-hot.com/social-media-statistics",
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Statistics 2026: 50+ Sourced Data Points | Trending Hot",
    description:
      "The most important social media statistics for 2026, organized by theme and sourced from public data.",
  },
};

export default function SocialMediaStatisticsPage() {
  return (
    <>
      <StatisticsTemplate data={socialData} />
      <section
        className="px-[5%] py-16 sm:py-20"
        style={{ backgroundColor: "#fbfdf8" }}
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <DataCitationBlock
            title="Social Media Statistics 2026"
            url="https://www.trending-hot.com/social-media-statistics"
            year="2026"
          />
          <DataCardDownload
            filename="social-media-statistics-2026.md"
            data={markdownContent}
          />
        </div>
      </section>
    </>
  );
}
