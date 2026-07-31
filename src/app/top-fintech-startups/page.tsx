import type { Metadata } from "next";
import { CompanyListTemplate } from "@/components/listing/templates/CompanyListTemplate";
import type { CompanyListData } from "@/lib/listing/types";

/**
 * 模板C 页面：Top Fintech Startups 2026
 * URL: /top-fintech-startups
 */

const SLUG = "top-fintech-startups";
const PAGE_URL = `https://trending-hot.com/${SLUG}`;

// ===== SEO metadata =====
export const metadata: Metadata = {
  title: "Top Fintech Startups 2026",
  description:
    "Discover the top 20 fintech startups of 2026, ranked by valuation, users, and transaction volume. See how Stripe, Revolut, Chime, and more compare today.",
  metadataBase: new URL("https://trending-hot.com"),
  alternates: {
    canonical: `/${SLUG}`,
  },
  openGraph: {
    title: "Top Fintech Startups 2026 | Trending Hot",
    description:
      "Discover the top 20 fintech startups of 2026, ranked by valuation, users, and transaction volume. See how Stripe, Revolut, Chime, and more compare today.",
    url: PAGE_URL,
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Fintech Startups 2026 | Trending Hot",
    description:
      "Discover the top 20 fintech startups of 2026, ranked by valuation, users, and transaction volume. See how Stripe, Revolut, Chime, and more compare today.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ===== 内联 mock 数据 =====
const data: CompanyListData = {
  type: "C",
  industry: "Fintech",
  year: "2026",
  introduction:
    "Fintech startups continue to reshape how the world moves, stores, and grows money in 2026. From payment infrastructure and neobanking to buy-now-pay-later, embedded finance, and crypto rails, the category has produced some of the most valuable private and recently public companies on the planet. This ranking highlights the top 20 fintech startups and scale-ups of 2026, ordered by the single metric that best reflects their scale — valuation, market capitalization, active users, or transaction volume. For every company we list its founding year, total funding raised, and a headline metric so you can compare scale at a glance and see where the next wave of financial innovation is concentrated.",
  companies: [
    {
      rank: 1,
      name: "Stripe",
      description:
        "The dominant online payment infrastructure layer powering millions of internet businesses, from startups to enterprises, across 195+ countries.",
      keyMetric: "$70B",
      keyMetricLabel: "Valuation",
      website: "https://stripe.com",
      founded: "2010",
      funding: "$1.6B+ raised",
    },
    {
      rank: 2,
      name: "Revolut",
      description:
        "A global neobank offering banking, currency exchange, crypto, and investing in a single app, serving tens of millions of retail customers.",
      keyMetric: "45M+",
      keyMetricLabel: "Customers",
      website: "https://www.revolut.com",
      founded: "2015",
      funding: "$1.7B raised",
    },
    {
      rank: 3,
      name: "Chime",
      description:
        "The leading US challenger bank focused on fee-free checking, early direct deposit, and credit-building products for everyday Americans.",
      keyMetric: "38M+",
      keyMetricLabel: "Users",
      website: "https://www.chime.com",
      founded: "2013",
      funding: "$2.6B raised",
    },
    {
      rank: 4,
      name: "Klarna",
      description:
        "The pioneer of buy-now-pay-later checkout, connecting shoppers, retailers, and flexible financing across global e-commerce.",
      keyMetric: "$14.6B",
      keyMetricLabel: "Valuation",
      website: "https://www.klarna.com",
      founded: "2005",
      funding: "$4.6B raised",
    },
    {
      rank: 5,
      name: "Wise",
      description:
        "A transparent, low-cost international money transfer and multi-currency account platform built on its own payment network.",
      keyMetric: "16M+",
      keyMetricLabel: "Customers",
      website: "https://wise.com",
      founded: "2011",
      funding: "Public (LSE: WISE)",
    },
    {
      rank: 6,
      name: "Brex",
      description:
        "A unified spend platform combining corporate cards, banking, bill pay, and travel for ambitious startups and growth-stage companies.",
      keyMetric: "$12.3B",
      keyMetricLabel: "Valuation",
      website: "https://www.brex.com",
      founded: "2017",
      funding: "$1.5B raised",
    },
    {
      rank: 7,
      name: "Ramp",
      description:
        "Corporate cards and spend management software that helps finance teams automate expenses, approvals, and savings.",
      keyMetric: "$8.1B",
      keyMetricLabel: "Valuation",
      website: "https://ramp.com",
      founded: "2019",
      funding: "$1.7B raised",
    },
    {
      rank: 8,
      name: "Plaid",
      description:
        "The financial data network connecting consumer bank accounts to thousands of apps powering payments, lending, and verification.",
      keyMetric: "$13.4B",
      keyMetricLabel: "Valuation",
      website: "https://plaid.com",
      founded: "2013",
      funding: "$730M raised",
    },
    {
      rank: 9,
      name: "Mercury",
      description:
        "A digital bank built specifically for startups, offering checking, savings, corporate cards, and founders' credit in one place.",
      keyMetric: "$2B",
      keyMetricLabel: "Valuation",
      website: "https://mercury.com",
      founded: "2019",
      funding: "$264M raised",
    },
    {
      rank: 10,
      name: "Bolt",
      description:
        "A one-click checkout and account network platform that enables retailers to offer frictionless, identity-verified payments across storefronts.",
      keyMetric: "100M+",
      keyMetricLabel: "Shopper Profiles",
      website: "https://bolt.com",
      founded: "2014",
      funding: "$1.7B raised",
    },
    {
      rank: 11,
      name: "Affirm",
      description:
        "A transparent buy-now-pay-later lender offering interest-free and installment financing at checkout across thousands of merchants.",
      keyMetric: "$15B",
      keyMetricLabel: "Market Cap",
      website: "https://www.affirm.com",
      founded: "2012",
      funding: "Public (NASDAQ: AFRM)",
    },
    {
      rank: 12,
      name: "SoFi",
      description:
        "A one-stop digital financial services platform spanning loans, investing, banking, and financial planning for working professionals.",
      keyMetric: "8M+",
      keyMetricLabel: "Members",
      website: "https://www.sofi.com",
      founded: "2011",
      funding: "Public (NASDAQ: SOFI)",
    },
    {
      rank: 13,
      name: "Robinhood",
      description:
        "The commission-free investing app that pioneered zero-fee retail trading and now offers stocks, options, crypto, and retirement accounts.",
      keyMetric: "23M+",
      keyMetricLabel: "Funded Users",
      website: "https://robinhood.com",
      founded: "2013",
      funding: "Public (NASDAQ: HOOD)",
    },
    {
      rank: 14,
      name: "Coinbase",
      description:
        "One of the world's largest regulated cryptocurrency exchanges, offering trading, custody, and on-chain services to retail and institutions.",
      keyMetric: "$60B",
      keyMetricLabel: "Market Cap",
      website: "https://www.coinbase.com",
      founded: "2012",
      funding: "Public (NASDAQ: COIN)",
    },
    {
      rank: 15,
      name: "Square / Block",
      description:
        "An ecosystem spanning seller point-of-sale hardware, Cash App consumer payments, and Bitcoin tools, building the future of inclusive finance.",
      keyMetric: "$40B",
      keyMetricLabel: "Market Cap",
      website: "https://block.xyz",
      founded: "2009",
      funding: "Public (NYSE: SQ)",
    },
    {
      rank: 16,
      name: "Marqeta",
      description:
        "A modern card-issuing API platform that lets companies launch and scale customized payment cards and virtual card programs.",
      keyMetric: "$4B",
      keyMetricLabel: "Market Cap",
      website: "https://www.marqeta.com",
      founded: "2010",
      funding: "Public (NASDAQ: MQ)",
    },
    {
      rank: 17,
      name: "Adyen",
      description:
        "A global payments platform providing end-to-end acquiring, processing, and settlement for leading enterprise and tech brands.",
      keyMetric: "\u20AC45B",
      keyMetricLabel: "Market Cap",
      website: "https://www.adyen.com",
      founded: "2006",
      funding: "Public (Euronext: ADYEN)",
    },
    {
      rank: 18,
      name: "dLocal",
      description:
        "A cross-border payment platform purpose-built for emerging markets, connecting global merchants to consumers across Latin America and beyond.",
      keyMetric: "$3B",
      keyMetricLabel: "Market Cap",
      website: "https://www.dlocal.com",
      founded: "2016",
      funding: "Public (NASDAQ: DLO)",
    },
    {
      rank: 19,
      name: "Nubank",
      description:
        "Latin America's largest digital bank, delivering fee-free credit cards, accounts, and investing to over 100 million customers.",
      keyMetric: "100M+",
      keyMetricLabel: "Customers",
      website: "https://nubank.com.br",
      founded: "2013",
      funding: "Public (NYSE: NU)",
    },
    {
      rank: 20,
      name: "Toast",
      description:
        "An all-in-one restaurant platform combining POS, payments, online ordering, and management software for the food-service industry.",
      keyMetric: "$20B",
      keyMetricLabel: "Market Cap",
      website: "https://pos.toasttab.com",
      founded: "2011",
      funding: "Public (NYSE: TOST)",
    },
  ],
  methodology:
    "This ranking was compiled in July 2026 by the Trending Hot editorial team. Companies were selected from the global fintech sector and ordered by the single metric that best reflects their scale: private valuation, public market capitalization, active customer count, or total payment volume. Valuations and funding figures are drawn from each company's most recent publicly disclosed round or secondary market pricing as of mid-2026; public market capitalizations reflect approximately trailing values. Where a company is public, its ticker is noted in the funding field. Customer and user counts represent self-reported or regulatory filings as of the most recent reporting period. The list intentionally blends private disruptors and recently public scale-ups to capture the full spectrum of fintech innovation. Note that valuations and metrics evolve quickly \u2014 figures may shift after publication.",
  tldr: [
    "Stripe tops the ranking with a $70B valuation, anchoring the global online payments infrastructure layer.",
    "Neobanks Revolut (45M+ customers), Chime (38M+ users), and Nubank (100M+ customers) dominate consumer digital banking across their regions.",
    "BNPL leaders Klarna and Affirm continue to shape flexible checkout financing at global scale.",
    "Public fintechs Coinbase, Block, and Adyen anchor the list with multi-billion-dollar market caps.",
    "Spend-management rivals Ramp and Brex represent the fastest-growing B2B fintech category of 2026.",
  ],
  toc: [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "ranking", title: "Top 20 Fintech Companies", level: 1 },
    { id: "methodology", title: "Methodology", level: 1 },
    { id: "faq", title: "FAQ", level: 1 },
    { id: "related", title: "Related Rankings", level: 1 },
  ],
  faqs: [
    {
      question: "What is a fintech startup?",
      answer:
        "A fintech (financial technology) startup is a company that uses technology to deliver, improve, or disrupt financial services \u2014 including payments, banking, lending, investing, and insurance. Fintech startups typically build software-first products that are faster, cheaper, or more accessible than traditional financial institutions, and range from early-stage challengers to large publicly traded scale-ups like those in this ranking.",
    },
    {
      question: "Which fintech startup has the highest valuation in 2026?",
      answer:
        "Among the companies on this list, Stripe leads with an approximately $70 billion valuation as of mid-2026, making it one of the most valuable private fintech companies in the world. Among public companies, Coinbase and Block carry the largest market capitalizations, each in the tens of billions of dollars.",
    },
    {
      question: "Are the companies on this list public or private?",
      answer:
        "The list blends both. Private disruptors include Stripe, Revolut, Chime, Brex, Ramp, Plaid, and Mercury. Recently public scale-ups include Wise, Affirm, SoFi, Robinhood, Coinbase, Block, Marqeta, Adyen, dLocal, Nubank, and Toast. Public status is noted in each company's funding field via its stock ticker.",
    },
    {
      question: "How do neobanks like Revolut and Chime make money?",
      answer:
        "Neobanks typically earn revenue from interchange fees on card transactions, premium subscription tiers, foreign exchange margins, and lending products. Because they operate without the branch overhead of traditional banks, they can often offer fee-free accounts and still reach profitability at scale \u2014 Revolut and Nubank in particular have reported consistent profitability in recent periods.",
    },
    {
      question: "What is buy-now-pay-later (BNPL) and is it safe?",
      answer:
        "Buy-now-pay-later services like Klarna and Affirm let shoppers split purchases into installments, often interest-free, at checkout. Used responsibly, BNPL is a convenient budgeting tool, but missed payments can incur fees and affect credit. Regulators in several markets have tightened BNPL oversight in 2026, so always read the repayment terms before committing.",
    },
    {
      question: "How can I invest in fintech startups?",
      answer:
        "Retail investors can gain exposure through publicly traded fintechs such as Coinbase, Block, Robinhood, Affirm, SoFi, Nubank, and Adyen via standard brokerage accounts. Access to private companies like Stripe or Ramp is generally limited to accredited investors, venture funds, and secondary marketplaces. Always research the risks and consider diversification before investing.",
    },
  ],
  related: [
    {
      title: "Fastest-Growing AI Startups",
      href: "/fastest-growing-ai-startups",
      description:
        "The AI startups growing fastest by revenue and adoption in 2026.",
    },
    {
      title: "AI Statistics",
      href: "/ai-statistics",
      description:
        "Key data and statistics on the global artificial intelligence market.",
    },
    {
      title: "Most Visited Websites in Japan",
      href: "/most-visited-websites-in-japan",
      description:
        "The 50 most visited websites in Japan, ranked by monthly visits.",
    },
  ],
  author: {
    name: "Trending Hot Team",
    role: "Editorial Team",
    date: "2026-07-31",
    readTime: "10 min read",
  },
};

export default function Page() {
  return <CompanyListTemplate data={data} />;
}
