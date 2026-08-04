import type { Metadata } from "next";
import { WebsiteListTemplate } from "@/components/listing/templates/WebsiteListTemplate";
import type { WebsiteListData } from "@/lib/listing/types";

/**
 * 模板D 页面：Most Visited Websites in India [2026]
 * URL: /most-visited-websites-in-india
 * 内联 mock 数据（不从 mock-data.ts 导入）。
 */

const SLUG = "most-visited-websites-in-india";
const PAGE_URL = `https://www.trending-hot.com/${SLUG}`;

// ===== SEO metadata =====
export const metadata: Metadata = {
  title: "Most Visited Websites in India [2026]",
  description:
    "Discover the 50 most visited websites in India in 2026, ranked by estimated monthly visits. See how Google, YouTube, Amazon, Flipkart, IRCTC and more compare.",
  metadataBase: new URL("https://www.trending-hot.com"),
  alternates: {
    canonical: `/${SLUG}`,
  },
  openGraph: {
    title: "Most Visited Websites in India [2026] | Trending Hot",
    description:
      "Discover the 50 most visited websites in India in 2026, ranked by estimated monthly visits. See how Google, YouTube, Amazon, Flipkart, IRCTC and more compare.",
    url: PAGE_URL,
    siteName: "Trending Hot",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Most Visited Websites in India [2026] | Trending Hot",
    description:
      "Discover the 50 most visited websites in India in 2026, ranked by estimated monthly visits. See how Google, YouTube, Amazon, Flipkart, IRCTC and more compare.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

// ===== 内联 mock 数据 =====
const data: WebsiteListData = {
  type: "D",
  country: "India",
  year: "2026",
  introduction:
    "India is home to the world's largest population of internet users, and its web traffic in 2026 reflects a striking blend of global giants and homegrown champions. From search and video to e-commerce, fintech, cricket, and government services, the country's most visited websites reveal where over 700 million online Indians spend their attention. This ranking lists the 50 most visited websites in India for 2026, ordered by estimated monthly visits. Alongside international heavyweights like Google, YouTube, and Amazon, you'll find domestic leaders such as Flipkart, IRCTC, Paytm, and Cricbuzz that dominate their categories locally. Each entry includes the site's category, monthly visit estimate, and month-over-month change so you can spot which platforms are climbing and which are cooling off.",
  websites: [
    {
      rank: 1,
      name: "Google India",
      type: "Search Engine",
      monthlyVisits: "5.20B",
      monthlyVisitsValue: 5200,
      change: "+3.1%",
      changeValue: 3.1,
      description:
        "The localized gateway to Google Search, serving the vast majority of Indian web queries.",
    },
    {
      rank: 2,
      name: "YouTube",
      type: "Video Platform",
      monthlyVisits: "4.65B",
      monthlyVisitsValue: 4650,
      change: "+4.4%",
      changeValue: 4.4,
      description:
        "The dominant video destination for entertainment, music, education, and creator content in India.",
    },
    {
      rank: 3,
      name: "Google",
      type: "Search Engine",
      monthlyVisits: "3.10B",
      monthlyVisitsValue: 3100,
      change: "+2.0%",
      changeValue: 2.0,
      description:
        "The global Google homepage, accessed directly by Indian users for web, image, and map search.",
    },
    {
      rank: 4,
      name: "WhatsApp",
      type: "Messaging",
      monthlyVisits: "1.95B",
      monthlyVisitsValue: 1950,
      change: "+1.8%",
      changeValue: 1.8,
      description:
        "India is WhatsApp's largest market; the web client handles backups, status, and linked-device access.",
    },
    {
      rank: 5,
      name: "Facebook",
      type: "Social Network",
      monthlyVisits: "1.82B",
      monthlyVisitsValue: 1820,
      change: "-1.2%",
      changeValue: -1.2,
      description:
        "A long-standing social platform for community groups, news, and Marketplace across India.",
    },
    {
      rank: 6,
      name: "Instagram",
      type: "Social Network",
      monthlyVisits: "1.74B",
      monthlyVisitsValue: 1740,
      change: "+5.6%",
      changeValue: 5.6,
      description:
        "The fastest-growing social platform among Indian youth for reels, stories, and creator commerce.",
    },
    {
      rank: 7,
      name: "Amazon India",
      type: "E-commerce",
      monthlyVisits: "1.36B",
      monthlyVisitsValue: 1360,
      change: "+2.7%",
      changeValue: 2.7,
      description:
        "Amazon's localized storefront leading electronics, books, and Prime-fast delivery across India.",
    },
    {
      rank: 8,
      name: "Flipkart",
      type: "E-commerce",
      monthlyVisits: "1.18B",
      monthlyVisitsValue: 1180,
      change: "+3.5%",
      changeValue: 3.5,
      description:
        "India's homegrown e-commerce leader, especially strong in fashion, large appliances, and Big Billion Days.",
    },
    {
      rank: 9,
      name: "Wikipedia",
      type: "Reference",
      monthlyVisits: "1.02B",
      monthlyVisitsValue: 1020,
      change: "+1.1%",
      changeValue: 1.1,
      description:
        "The free encyclopedia accessed heavily by Indian students, researchers, and curious readers.",
    },
    {
      rank: 10,
      name: "Indian Railways (IRCTC)",
      type: "Travel / Booking",
      monthlyVisits: "980M",
      monthlyVisitsValue: 980,
      change: "+2.2%",
      changeValue: 2.2,
      description:
        "The official rail ticketing portal powering train reservations for millions of daily passengers.",
    },
    {
      rank: 11,
      name: "Gmail",
      type: "Email",
      monthlyVisits: "940M",
      monthlyVisitsValue: 940,
      change: "+1.5%",
      changeValue: 1.5,
      description:
        "Google's webmail service, the default email provider for most Indian internet users and businesses.",
    },
    {
      rank: 12,
      name: "Times of India",
      type: "News",
      monthlyVisits: "765M",
      monthlyVisitsValue: 765,
      change: "-0.6%",
      changeValue: -0.6,
      description:
        "One of India's most-read English news sites, covering national, city, and business headlines.",
    },
    {
      rank: 13,
      name: "Hotstar / Disney+ Hotstar",
      type: "Streaming",
      monthlyVisits: "720M",
      monthlyVisitsValue: 720,
      change: "+6.2%",
      changeValue: 6.2,
      description:
        "India's leading streaming service for cricket, IPL, Bollywood, and Disney+ originals.",
    },
    {
      rank: 14,
      name: "Cricbuzz",
      type: "Sports",
      monthlyVisits: "690M",
      monthlyVisitsValue: 690,
      change: "+8.1%",
      changeValue: 8.1,
      description:
        "The go-to cricket destination for live scores, commentary, stats, and match coverage.",
    },
    {
      rank: 15,
      name: "Amazon",
      type: "E-commerce",
      monthlyVisits: "640M",
      monthlyVisitsValue: 640,
      change: "+1.0%",
      changeValue: 1.0,
      description:
        "The global Amazon storefront, used by Indian shoppers for international products and Prime Video.",
    },
    {
      rank: 16,
      name: "Paytm",
      type: "Fintech",
      monthlyVisits: "610M",
      monthlyVisitsValue: 610,
      change: "+2.9%",
      changeValue: 2.9,
      description:
        "A leading Indian payments and financial services app for UPI, wallets, recharge, and bill payments.",
    },
    {
      rank: 17,
      name: "Zomato",
      type: "Food Delivery",
      monthlyVisits: "585M",
      monthlyVisitsValue: 585,
      change: "+4.0%",
      changeValue: 4.0,
      description:
        "A major food delivery and restaurant discovery platform operating across Indian cities.",
    },
    {
      rank: 18,
      name: "Swiggy",
      type: "Food Delivery",
      monthlyVisits: "560M",
      monthlyVisitsValue: 560,
      change: "+3.8%",
      changeValue: 3.8,
      description:
        "Food delivery and quick-commerce grocery service competing head-to-head with Zomato.",
    },
    {
      rank: 19,
      name: "LinkedIn",
      type: "Professional Network",
      monthlyVisits: "530M",
      monthlyVisitsValue: 530,
      change: "+3.3%",
      changeValue: 3.3,
      description:
        "The professional networking hub for Indian job seekers, recruiters, and B2B content.",
    },
    {
      rank: 20,
      name: "Twitter / X",
      type: "Social Network",
      monthlyVisits: "495M",
      monthlyVisitsValue: 495,
      change: "-2.4%",
      changeValue: -2.4,
      description:
        "The real-time public conversation platform widely used for news, politics, and tech in India.",
    },
    {
      rank: 21,
      name: "Reddit",
      type: "Social Forum",
      monthlyVisits: "430M",
      monthlyVisitsValue: 430,
      change: "+7.0%",
      changeValue: 7.0,
      description:
        "Community-driven forums growing fast among Indian tech, finance, and gaming enthusiasts.",
    },
    {
      rank: 22,
      name: "Quora",
      type: "Q&A",
      monthlyVisits: "395M",
      monthlyVisitsValue: 395,
      change: "-1.5%",
      changeValue: -1.5,
      description:
        "A question-and-answer platform with a large Indian user base for knowledge and discussion.",
    },
    {
      rank: 23,
      name: "Google Play",
      type: "App Store",
      monthlyVisits: "360M",
      monthlyVisitsValue: 360,
      change: "+2.1%",
      changeValue: 2.1,
      description:
        "Android's app marketplace, the primary app distribution channel for India's smartphone users.",
    },
    {
      rank: 24,
      name: "Netflix",
      type: "Streaming",
      monthlyVisits: "340M",
      monthlyVisitsValue: 340,
      change: "+3.0%",
      changeValue: 3.0,
      description:
        "A premium streaming service investing heavily in Indian original series and films.",
    },
    {
      rank: 25,
      name: "Naukri",
      type: "Job Portal",
      monthlyVisits: "315M",
      monthlyVisitsValue: 315,
      change: "+1.9%",
      changeValue: 1.9,
      description:
        "India's leading job site connecting millions of professionals with recruiters and employers.",
    },
    {
      rank: 26,
      name: "Pinterest",
      type: "Social Network",
      monthlyVisits: "290M",
      monthlyVisitsValue: 290,
      change: "+2.6%",
      changeValue: 2.6,
      description:
        "A visual discovery platform popular for fashion, decor, wedding, and recipe inspiration.",
    },
    {
      rank: 27,
      name: "MakeMyTrip",
      type: "Travel / Booking",
      monthlyVisits: "270M",
      monthlyVisitsValue: 270,
      change: "+4.7%",
      changeValue: 4.7,
      description:
        "A top online travel agency for flights, hotels, and holiday packages across India.",
    },
    {
      rank: 28,
      name: "HDFC Bank",
      type: "Banking",
      monthlyVisits: "250M",
      monthlyVisitsValue: 250,
      change: "+1.4%",
      changeValue: 1.4,
      description:
        "The online banking portal of India's largest private-sector bank for retail and corporate customers.",
    },
    {
      rank: 29,
      name: "ICICI Bank",
      type: "Banking",
      monthlyVisits: "235M",
      monthlyVisitsValue: 235,
      change: "+1.2%",
      changeValue: 1.2,
      description:
        "Digital banking services for ICICI customers including payments, cards, and investments.",
    },
    {
      rank: 30,
      name: "PhonePe",
      type: "Fintech",
      monthlyVisits: "220M",
      monthlyVisitsValue: 220,
      change: "+9.3%",
      changeValue: 9.3,
      description:
        "A leading UPI payments app handling billions of monthly transactions across India.",
    },
    {
      rank: 31,
      name: "State Bank of India",
      type: "Banking",
      monthlyVisits: "205M",
      monthlyVisitsValue: 205,
      change: "+0.8%",
      changeValue: 0.8,
      description:
        "The digital banking platform of India's largest public-sector bank, serving millions of account holders.",
    },
    {
      rank: 32,
      name: "Myntra",
      type: "E-commerce",
      monthlyVisits: "190M",
      monthlyVisitsValue: 190,
      change: "+3.6%",
      changeValue: 3.6,
      description:
        "A fashion and lifestyle e-commerce leader owned by Flipkart, popular for branded apparel.",
    },
    {
      rank: 33,
      name: "India Today",
      type: "News",
      monthlyVisits: "178M",
      monthlyVisitsValue: 178,
      change: "-0.9%",
      changeValue: -0.9,
      description:
        "A multi-topic news magazine covering politics, current affairs, and lifestyle for Indian readers.",
    },
    {
      rank: 34,
      name: "Google Pay",
      type: "Fintech",
      monthlyVisits: "170M",
      monthlyVisitsValue: 170,
      change: "+5.0%",
      changeValue: 5.0,
      description:
        "Google's UPI payments app, a major competitor in India's digital payments ecosystem.",
    },
    {
      rank: 35,
      name: "Booking.com",
      type: "Travel / Booking",
      monthlyVisits: "162M",
      monthlyVisitsValue: 162,
      change: "+2.3%",
      changeValue: 2.3,
      description:
        "A global accommodation booking platform widely used by Indian outbound and domestic travelers.",
    },
    {
      rank: 36,
      name: "BookMyShow",
      type: "Entertainment",
      monthlyVisits: "150M",
      monthlyVisitsValue: 150,
      change: "+1.7%",
      changeValue: 1.7,
      description:
        "India's largest ticketing platform for movies, live events, and experiences.",
    },
    {
      rank: 37,
      name: "Nykaa",
      type: "E-commerce",
      monthlyVisits: "138M",
      monthlyVisitsValue: 138,
      change: "+2.8%",
      changeValue: 2.8,
      description:
        "A beauty and wellness e-commerce leader in fashion, cosmetics, and personal care.",
    },
    {
      rank: 38,
      name: "Hindustan Times",
      type: "News",
      monthlyVisits: "132M",
      monthlyVisitsValue: 132,
      change: "-0.4%",
      changeValue: -0.4,
      description:
        "A major English-language daily covering national, Delhi, and business news.",
    },
    {
      rank: 39,
      name: "Economic Times",
      type: "Finance News",
      monthlyVisits: "125M",
      monthlyVisitsValue: 125,
      change: "+1.1%",
      changeValue: 1.1,
      description:
        "India's leading business and financial news outlet for markets, economy, and corporate news.",
    },
    {
      rank: 40,
      name: "Goibibo",
      type: "Travel / Booking",
      monthlyVisits: "118M",
      monthlyVisitsValue: 118,
      change: "+3.2%",
      changeValue: 3.2,
      description:
        "An online travel booking platform for flights and hotels, part of the MakeMyTrip group.",
    },
    {
      rank: 41,
      name: "Axis Bank",
      type: "Banking",
      monthlyVisits: "112M",
      monthlyVisitsValue: 112,
      change: "+0.9%",
      changeValue: 0.9,
      description:
        "Online banking portal for Axis Bank customers, offering cards, loans, and wealth services.",
    },
    {
      rank: 42,
      name: "The Hindu",
      type: "News",
      monthlyVisits: "105M",
      monthlyVisitsValue: 105,
      change: "+0.6%",
      changeValue: 0.6,
      description:
        "A respected English daily known for in-depth national, international, and editorial coverage.",
    },
    {
      rank: 43,
      name: "Indiatimes",
      type: "Portal",
      monthlyVisits: "98M",
      monthlyVisitsValue: 98,
      change: "-1.0%",
      changeValue: -1.0,
      description:
        "A legacy web portal aggregating news, entertainment, and lifestyle content for Indian audiences.",
    },
    {
      rank: 44,
      name: "Cleartrip",
      type: "Travel / Booking",
      monthlyVisits: "90M",
      monthlyVisitsValue: 90,
      change: "+2.5%",
      changeValue: 2.5,
      description:
        "A travel booking platform for flights, trains, and hotels, now part of the Flipkart Group.",
    },
    {
      rank: 45,
      name: "Moneycontrol",
      type: "Finance News",
      monthlyVisits: "85M",
      monthlyVisitsValue: 85,
      change: "+4.1%",
      changeValue: 4.1,
      description:
        "A leading financial markets portal offering live stock data, portfolio tools, and analysis.",
    },
    {
      rank: 46,
      name: "NDTV",
      type: "News",
      monthlyVisits: "78M",
      monthlyVisitsValue: 78,
      change: "-0.7%",
      changeValue: -0.7,
      description:
        "A prominent news broadcaster's website delivering breaking news, video, and opinion.",
    },
    {
      rank: 47,
      name: "JustDial",
      type: "Local Search",
      monthlyVisits: "72M",
      monthlyVisitsValue: 72,
      change: "+0.5%",
      changeValue: 0.5,
      description:
        "A local search and business listings service connecting users with nearby services and vendors.",
    },
    {
      rank: 48,
      name: "Snapdeal",
      type: "E-commerce",
      monthlyVisits: "65M",
      monthlyVisitsValue: 65,
      change: "-1.8%",
      changeValue: -1.8,
      description:
        "An Indian value-focused marketplace offering affordable products across many categories.",
    },
    {
      rank: 49,
      name: "Shaadi.com",
      type: "Matrimony",
      monthlyVisits: "58M",
      monthlyVisitsValue: 58,
      change: "+1.3%",
      changeValue: 1.3,
      description:
        "The world's largest matrimony service, deeply embedded in Indian matchmaking culture.",
    },
    {
      rank: 50,
      name: "Rediff",
      type: "Portal",
      monthlyVisits: "44M",
      monthlyVisitsValue: 44,
      change: "-2.1%",
      changeValue: -2.1,
      description:
        "A long-running Indian web portal offering news, email, and shopping content.",
    },
  ],
  methodology:
    "This ranking was compiled in July 2026 by the Trending Hot editorial team using a combination of third-party traffic-estimation tools (similar to Similarweb and Semrush), publicly reported audience figures, and internal modeling. Monthly visit estimates reflect domain-level visits from Indian IP addresses for the trailing 30-day window, including subdomains where applicable. Change values represent month-over-month movement in estimated visits. Figures are modeled approximations rather than exact analytics and are intended to indicate relative scale and momentum; actual visit counts held by the publishers may differ. Sites serving primarily app-based traffic (such as messaging and payments) show lower web visits than their true usage. The list is updated periodically as new data becomes available.",
  tldr: [
    "Google India and YouTube top the list, reflecting India's reliance on search and video for daily web activity.",
    "E-commerce is a two-horse race between Amazon India and homegrown Flipkart, with Myntra leading fashion.",
    "IRCTC, Paytm, and PhonePe show how essential payments and government services are to Indian web usage.",
    "Cricket and streaming dominate entertainment, with Cricbuzz and Disney+ Hotstar both in the top 15.",
    "Domestic news and banking portals hold strong positions alongside global platforms.",
  ],
  toc: [
    { id: "introduction", title: "Introduction", level: 1 },
    { id: "ranking", title: "Top 50 Most Visited Websites in India", level: 1 },
    { id: "methodology", title: "Methodology", level: 1 },
    { id: "faq", title: "FAQ", level: 1 },
    { id: "related", title: "Related Rankings", level: 1 },
  ],
  faqs: [
    {
      question: "What are the most visited websites in India in 2026?",
      answer:
        "In 2026, the most visited websites in India are led by Google India and YouTube, followed by global platforms like Facebook, Instagram, and Amazon, alongside homegrown leaders such as Flipkart, IRCTC, Paytm, and Cricbuzz. The full top 50 is ranked above by estimated monthly visits.",
    },
    {
      question: "How many internet users does India have in 2026?",
      answer:
        "India has well over 700 million active internet users in 2026, making it one of the largest online populations in the world. This massive base is why global platforms localize aggressively and why domestic sites like Flipkart and IRCTC command enormous traffic.",
    },
    {
      question: "Which Indian website is the most popular for online shopping?",
      answer:
        "Amazon India and Flipkart are the two most visited e-commerce sites in India, with Myntra leading specifically in fashion. Both Amazon India and Flipkart each draw over a billion monthly visits, with Flipkart particularly strong during festive sales like the Big Billion Days.",
    },
    {
      question: "Is Google the most visited website in India?",
      answer:
        "Yes. Google, through its India-localized domain and global homepage, is the most visited website in India, followed closely by YouTube. Together, Google's properties account for a very large share of total Indian web traffic because search is the entry point for so many online activities.",
    },
    {
      question: "Why does WhatsApp show fewer web visits than its real popularity?",
      answer:
        "WhatsApp is primarily a mobile messaging app, so most of its usage happens inside the app rather than on a website. Its web client is only one access point, which is why it ranks below platforms like YouTube despite WhatsApp being nearly universal among Indian smartphone users.",
    },
    {
      question: "How is the traffic data for Indian websites collected?",
      answer:
        "Our estimates combine third-party traffic-estimation services, public audience disclosures, and internal modeling of Indian IP-based domain visits over a trailing 30-day window. These are approximations intended to show relative scale and momentum, not exact publisher analytics, and app-heavy services appear smaller on the web than their true usage.",
    },
  ],
  related: [
    {
      title: "Most Visited Websites in Japan",
      href: "/most-visited-websites-in-japan",
      description:
        "The 50 most visited websites in Japan, ranked by estimated monthly visits.",
    },
    {
      title: "Trending Beauty Products",
      href: "/trending-beauty-products",
      description:
        "The hottest trending beauty products and brands this season.",
    },
    {
      title: "AI Statistics",
      href: "/ai-statistics",
      description:
        "Key data and statistics on the global artificial intelligence market.",
    },
  ],
  author: {
    name: "Trending Hot Team",
    role: "Editorial Team",
    date: "2026-07-31",
    readTime: "11 min read",
  },
};

export default function Page() {
  return <WebsiteListTemplate data={data} />;
}
