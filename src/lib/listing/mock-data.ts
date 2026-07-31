import type {
  ListingData,
  WebsiteListData,
  WebsiteItem,
  FAQItem,
  RelatedListing,
  TOCItem,
  AuthorMeta,
} from "./types";

// ===== 通用作者元信息 =====
const DEFAULT_AUTHOR: AuthorMeta = {
  name: "Trending Hot Team",
  role: "Editorial Team",
  date: "2026-07-31",
  readTime: "8 min read",
};

// ===== 日本 Top 50 网站（模板D）=====

const japanWebsites: WebsiteItem[] = [
  {
    rank: 1,
    name: "Yahoo Japan",
    type: "Portal",
    monthlyVisits: "12.4B",
    monthlyVisitsValue: 12400,
    change: "+2.1%",
    changeValue: 2.1,
    description:
      "Japan's most visited portal, offering news, search (powered by Google), auctions, shopping, and email. A rare market where Yahoo still dominates.",
  },
  {
    rank: 2,
    name: "Google Japan",
    type: "Search Engine",
    monthlyVisits: "9.8B",
    monthlyVisitsValue: 9800,
    change: "+1.5%",
    changeValue: 1.5,
    description:
      "The leading search engine in Japan, consistently ranking at or near the top for desktop and mobile queries.",
  },
  {
    rank: 3,
    name: "YouTube",
    type: "Video Platform",
    monthlyVisits: "8.5B",
    monthlyVisitsValue: 8500,
    change: "+3.2%",
    changeValue: 3.2,
    description:
      "The dominant video platform in Japan, widely used for entertainment, music, tutorials, and live streaming.",
  },
  {
    rank: 4,
    name: "Amazon Japan",
    type: "E-commerce",
    monthlyVisits: "6.2B",
    monthlyVisitsValue: 6200,
    change: "+4.5%",
    changeValue: 4.5,
    description:
      "The largest online retailer in Japan, offering fast Prime delivery across books, electronics, and daily goods.",
  },
  {
    rank: 5,
    name: "LINE",
    type: "Social / Messaging",
    monthlyVisits: "4.1B",
    monthlyVisitsValue: 4100,
    change: "-1.2%",
    changeValue: -1.2,
    description:
      "Japan's de facto messaging app, with web access to LINE Manga, LINE Shopping, and LINE Pay services.",
  },
  {
    rank: 6,
    name: "Rakuten",
    type: "E-commerce",
    monthlyVisits: "3.8B",
    monthlyVisitsValue: 3800,
    change: "+2.8%",
    changeValue: 2.8,
    description:
      "Japan's homegrown e-commerce giant and Amazon's primary rival, known for its points ecosystem and Ichiba marketplace.",
  },
  {
    rank: 7,
    name: "Twitter / X",
    type: "Social Media",
    monthlyVisits: "3.2B",
    monthlyVisitsValue: 3200,
    change: "+5.6%",
    changeValue: 5.6,
    description:
      "Japan is one of X's largest markets by engagement, with exceptionally high per-user activity and real-time discussion.",
  },
  {
    rank: 8,
    name: "Instagram",
    type: "Social Media",
    monthlyVisits: "2.9B",
    monthlyVisitsValue: 2900,
    change: "+6.1%",
    changeValue: 6.1,
    description:
      "A fast-growing visual social platform in Japan, popular among Gen Z for fashion, food, and lifestyle content.",
  },
  {
    rank: 9,
    name: "Wikipedia",
    type: "Reference",
    monthlyVisits: "2.4B",
    monthlyVisitsValue: 2400,
    change: "+0.8%",
    changeValue: 0.8,
    description:
      "The go-to encyclopedia for Japanese users, with a robust Japanese-language edition and steady organic traffic.",
  },
  {
    rank: 10,
    name: "Mercari",
    type: "E-commerce",
    monthlyVisits: "1.8B",
    monthlyVisitsValue: 1800,
    change: "+3.4%",
    changeValue: 3.4,
    description:
      "Japan's leading C2C flea-market app, with a strong web presence for buying and selling second-hand goods.",
  },
  {
    rank: 11,
    name: "Facebook",
    type: "Social Media",
    monthlyVisits: "1.5B",
    monthlyVisitsValue: 1500,
    change: "-2.5%",
    changeValue: -2.5,
    description:
      "Used primarily for business networking and community groups in Japan, though engagement has been declining.",
  },
  {
    rank: 12,
    name: "Niconico",
    type: "Video Platform",
    monthlyVisits: "620M",
    monthlyVisitsValue: 620,
    change: "+1.1%",
    changeValue: 1.1,
    description:
      "Japan's pioneering video and live-streaming platform, famous for its scrolling comment overlay and otaku culture.",
  },
  {
    rank: 13,
    name: "DMM",
    type: "Entertainment / E-commerce",
    monthlyVisits: "580M",
    monthlyVisitsValue: 580,
    change: "+4.2%",
    changeValue: 4.2,
    description:
      "A diversified Japanese platform spanning video on demand, games, e-books, and online services.",
  },
  {
    rank: 14,
    name: "5ch.net",
    type: "Forum",
    monthlyVisits: "410M",
    monthlyVisitsValue: 410,
    change: "-3.5%",
    changeValue: -3.5,
    description:
      "The successor to 2channel, Japan's largest anonymous textboard and a long-standing hub of internet culture.",
  },
  {
    rank: 15,
    name: "Tabelog",
    type: "Review",
    monthlyVisits: "380M",
    monthlyVisitsValue: 380,
    change: "+2.0%",
    changeValue: 2.0,
    description:
      "Japan's most trusted restaurant review site, with rigorous ratings that can make or break a restaurant.",
  },
  {
    rank: 16,
    name: "Kakaku.com",
    type: "Price Comparison",
    monthlyVisits: "340M",
    monthlyVisitsValue: 340,
    change: "+1.6%",
    changeValue: 1.6,
    description:
      "The leading price-comparison site in Japan for electronics, cameras, and consumer goods.",
  },
  {
    rank: 17,
    name: "Cookpad",
    type: "Recipe",
    monthlyVisits: "290M",
    monthlyVisitsValue: 290,
    change: "-4.1%",
    changeValue: -4.1,
    description:
      "Japan's largest recipe-sharing community, though traffic has gradually shifted to its mobile app.",
  },
  {
    rank: 18,
    name: "livedoor",
    type: "Portal",
    monthlyVisits: "260M",
    monthlyVisitsValue: 260,
    change: "-5.2%",
    changeValue: -5.2,
    description:
      "A long-running news and blog portal, now operated by LINE, providing summarized news and summary blogs.",
  },
  {
    rank: 19,
    name: "Ameblo",
    type: "Blog",
    monthlyVisits: "240M",
    monthlyVisitsValue: 240,
    change: "+0.5%",
    changeValue: 0.5,
    description:
      "Japan's most popular blogging platform, hosting celebrity and influencer blogs with massive readership.",
  },
  {
    rank: 20,
    name: "NHK ORG",
    type: "News / Media",
    monthlyVisits: "230M",
    monthlyVisitsValue: 230,
    change: "+1.8%",
    changeValue: 1.8,
    description:
      "The official site of Japan's public broadcaster, offering news, program schedules, and on-demand clips.",
  },
  {
    rank: 21,
    name: "ZOZOTOWN",
    type: "Fashion E-commerce",
    monthlyVisits: "210M",
    monthlyVisitsValue: 210,
    change: "+7.3%",
    changeValue: 7.3,
    description:
      "Japan's largest fashion e-commerce site, owned by Yahoo Japan, with thousands of domestic and international brands.",
  },
  {
    rank: 22,
    name: "au one",
    type: "Portal",
    monthlyVisits: "195M",
    monthlyVisitsValue: 195,
    change: "-1.0%",
    changeValue: -1.0,
    description:
      "The consumer portal of KDDI's au mobile brand, offering news, search, and lifestyle content.",
  },
  {
    rank: 23,
    name: "Yodobashi Camera",
    type: "E-commerce",
    monthlyVisits: "180M",
    monthlyVisitsValue: 180,
    change: "+2.2%",
    changeValue: 2.2,
    description:
      "A major electronics retailer with a powerful online store, known for fast same-day delivery in urban areas.",
  },
  {
    rank: 24,
    name: "TVer",
    type: "Streaming",
    monthlyVisits: "165M",
    monthlyVisitsValue: 165,
    change: "+12.5%",
    changeValue: 12.5,
    description:
      "Japan's free ad-supported TV catch-up service, jointly operated by major broadcasters and growing rapidly.",
  },
  {
    rank: 25,
    name: "goo",
    type: "Portal / Search",
    monthlyVisits: "150M",
    monthlyVisitsValue: 150,
    change: "-2.8%",
    changeValue: -2.8,
    description:
      "An established portal offering search, news, dictionaries, and Q&A services, operated by NTT Resonant.",
  },
  {
    rank: 26,
    name: "Pixiv",
    type: "Art Community",
    monthlyVisits: "140M",
    monthlyVisitsValue: 140,
    change: "+5.0%",
    changeValue: 5.0,
    description:
      "The world's largest illustration community, founded in Japan, central to manga and fan-art culture.",
  },
  {
    rank: 27,
    name: "note",
    type: "Blogging",
    monthlyVisits: "130M",
    monthlyVisitsValue: 130,
    change: "+8.4%",
    changeValue: 8.4,
    description:
      "A creator-focused publishing platform combining free blogs and paid content, popular among creators and experts.",
  },
  {
    rank: 28,
    name: "Indeed Japan",
    type: "Jobs",
    monthlyVisits: "125M",
    monthlyVisitsValue: 125,
    change: "+3.7%",
    changeValue: 3.7,
    description:
      "The leading job-search engine in Japan, aggregating listings from thousands of employer and recruiter sites.",
  },
  {
    rank: 29,
    name: "SUUMO",
    type: "Real Estate",
    monthlyVisits: "115M",
    monthlyVisitsValue: 115,
    change: "+1.4%",
    changeValue: 1.4,
    description:
      "Japan's most used real-estate portal for apartment rentals, purchases, and new-construction listings.",
  },
  {
    rank: 30,
    name: "Excite",
    type: "Portal",
    monthlyVisits: "105M",
    monthlyVisitsValue: 105,
    change: "-3.0%",
    changeValue: -3.0,
    description:
      "A veteran portal offering news, search, blogs, and translation services, now operated by Excite Japan.",
  },
  {
    rank: 31,
    name: "Bic Camera",
    type: "E-commerce",
    monthlyVisits: "98M",
    monthlyVisitsValue: 98,
    change: "+1.9%",
    changeValue: 1.9,
    description:
      "A major consumer-electronics retailer with an online store competitive on price and point rewards.",
  },
  {
    rank: 32,
    name: "@nifty",
    type: "Portal / ISP",
    monthlyVisits: "92M",
    monthlyVisitsValue: 92,
    change: "-4.5%",
    changeValue: -4.5,
    description:
      "One of Japan's oldest ISPs, now offering news, blog services, and internet access packages.",
  },
  {
    rank: 33,
    name: "Biglobe",
    type: "ISP",
    monthlyVisits: "86M",
    monthlyVisitsValue: 86,
    change: "-3.8%",
    changeValue: -3.8,
    description:
      "A long-established ISP providing connectivity, news, and lifestyle content, operated by NEC Biglobe.",
  },
  {
    rank: 34,
    name: "SoftBank",
    type: "Telecom",
    monthlyVisits: "82M",
    monthlyVisitsValue: 82,
    change: "+0.7%",
    changeValue: 0.7,
    description:
      "The official site of SoftBank's mobile and internet services, used for billing, support, and device purchases.",
  },
  {
    rank: 35,
    name: "NTT Docomo",
    type: "Telecom",
    monthlyVisits: "78M",
    monthlyVisitsValue: 78,
    change: "+1.2%",
    changeValue: 1.2,
    description:
      "Japan's largest mobile carrier's official site, covering plans, devices, and the d-account ecosystem.",
  },
  {
    rank: 36,
    name: "AbemaTV",
    type: "Streaming",
    monthlyVisits: "74M",
    monthlyVisitsValue: 74,
    change: "+9.6%",
    changeValue: 9.6,
    description:
      "A free internet TV service from CyberAgent and TV Asahi, offering live channels and on-demand content.",
  },
  {
    rank: 37,
    name: "Spotify Japan",
    type: "Music",
    monthlyVisits: "68M",
    monthlyVisitsValue: 68,
    change: "+6.8%",
    changeValue: 6.8,
    description:
      "The leading music streaming service in Japan, steadily converting a historically CD-focused market to streaming.",
  },
  {
    rank: 38,
    name: "Qoo10",
    type: "E-commerce",
    monthlyVisits: "64M",
    monthlyVisitsValue: 64,
    change: "+11.2%",
    changeValue: 11.2,
    description:
      "A cross-border marketplace popular in Japan for K-beauty, fashion, and discounted imported goods.",
  },
  {
    rank: 39,
    name: "Wantedly",
    type: "Jobs",
    monthlyVisits: "58M",
    monthlyVisitsValue: 58,
    change: "+4.3%",
    changeValue: 4.3,
    description:
      "A Japan-founded professional network focused on casual interviews and mission-driven hiring.",
  },
  {
    rank: 40,
    name: "Homes",
    type: "Real Estate",
    monthlyVisits: "55M",
    monthlyVisitsValue: 55,
    change: "+0.9%",
    changeValue: 0.9,
    description:
      "A major real-estate listing portal for rentals and purchases, operated by LIFULL, competing with SUUMO.",
  },
  {
    rank: 41,
    name: "Hulu Japan",
    type: "Streaming",
    monthlyVisits: "52M",
    monthlyVisitsValue: 52,
    change: "-2.1%",
    changeValue: -2.1,
    description:
      "A subscription VOD service in Japan, now operated by Nippon TV, offering Hollywood and Japanese content.",
  },
  {
    rank: 42,
    name: "Carsensor",
    type: "Automotive",
    monthlyVisits: "49M",
    monthlyVisitsValue: 49,
    change: "+1.5%",
    changeValue: 1.5,
    description:
      "One of Japan's largest used-car listing sites, operated by Recruit, with detailed inspection reports.",
  },
  {
    rank: 43,
    name: "Goo-net",
    type: "Automotive",
    monthlyVisits: "45M",
    monthlyVisitsValue: 45,
    change: "-1.8%",
    changeValue: -1.8,
    description:
      "A long-running used-car portal from PROTO Corporation, widely used for nationwide car comparisons.",
  },
  {
    rank: 44,
    name: "So-net",
    type: "ISP",
    monthlyVisits: "42M",
    monthlyVisitsValue: 42,
    change: "-5.0%",
    changeValue: -5.0,
    description:
      "An ISP and portal operated by Sony Network Communications, offering connectivity and lifestyle content.",
  },
  {
    rank: 45,
    name: "OCN",
    type: "ISP",
    monthlyVisits: "39M",
    monthlyVisitsValue: 39,
    change: "-4.2%",
    changeValue: -4.2,
    description:
      "NTT Communications' consumer ISP brand, providing internet access, email, and portal content.",
  },
  {
    rank: 46,
    name: "BizReach",
    type: "Jobs",
    monthlyVisits: "35M",
    monthlyVisitsValue: 35,
    change: "+3.1%",
    changeValue: 3.1,
    description:
      "A premium recruitment platform targeting mid-career professionals and direct hiring in Japan.",
  },
  {
    rank: 47,
    name: "Plala",
    type: "ISP",
    monthlyVisits: "31M",
    monthlyVisitsValue: 31,
    change: "-6.0%",
    changeValue: -6.0,
    description:
      "An NTT East ISP catering to residential users, offering bundled internet and portal services.",
  },
  {
    rank: 48,
    name: "Disney+ Japan",
    type: "Streaming",
    monthlyVisits: "28M",
    monthlyVisitsValue: 28,
    change: "+14.5%",
    changeValue: 14.5,
    description:
      "The Japanese hub for Disney+ and Star content, showing the fastest growth among streaming sites this period.",
  },
  {
    rank: 49,
    name: "U-NEXT",
    type: "Streaming",
    monthlyVisits: "25M",
    monthlyVisitsValue: 25,
    change: "+7.8%",
    changeValue: 7.8,
    description:
      "A Japanese subscription VOD service bundling video, magazines, and live sports in a single plan.",
  },
  {
    rank: 50,
    name: "Magaseek",
    type: "Fashion E-commerce",
    monthlyVisits: "22M",
    monthlyVisitsValue: 22,
    change: "+2.5%",
    changeValue: 2.5,
    description:
      "A fashion-focused e-commerce site operated by BELLEMAISON, popular for women's apparel and brands.",
  },
];

// ===== TOC（与 ListingLayout / 页面渲染的 section id 对应）=====
const japanToc: TOCItem[] = [
  { id: "introduction", title: "Introduction", level: 1 },
  { id: "ranking", title: "Top 50 Most Visited Websites", level: 1 },
  { id: "methodology", title: "Methodology", level: 1 },
  { id: "faq", title: "FAQ", level: 1 },
  { id: "related", title: "Related Rankings", level: 1 },
];

// ===== TLDR =====
const japanTldr: string[] = [
  "Yahoo Japan is the most visited website in Japan with over 12 billion monthly visits, defying the global decline of the Yahoo brand.",
  "Google Japan, YouTube, and Amazon Japan round out the top 4, together accounting for the bulk of Japanese web traffic.",
  "Homegrown platforms Rakuten, LINE, and Mercari keep e-commerce and messaging firmly in domestic hands.",
  "Twitter/X sees unusually high engagement in Japan compared to other markets, ranking #7 by visits.",
  "Streaming services TVer (+12.5%) and Disney+ Japan (+14.5%) are the fastest-growing sites this period.",
];

// ===== FAQ =====
const japanFaqs: FAQItem[] = [
  {
    question: "What are the most visited websites in Japan?",
    answer:
      "Yahoo Japan is the single most visited website in Japan with over 12 billion monthly visits, followed by Google Japan, YouTube, Amazon Japan, and LINE. The top 5 collectively account for the majority of web traffic originating from Japanese users.",
  },
  {
    question: "Is Google popular in Japan?",
    answer:
      "Yes. Google Japan is the leading search engine by query volume, and YouTube (also owned by Google) is the dominant video platform. Notably, Yahoo Japan's search results are also powered by Google, giving Google an even larger effective share of Japanese search.",
  },
  {
    question: "Why is Yahoo Japan still so popular?",
    answer:
      "Yahoo Japan localized early and built a deep ecosystem around news, Yahoo Auctions, Yahoo Shopping, and email. Combined with long-standing brand trust and a feature-rich portal experience, it has retained a massive audience even as Yahoo declined internationally.",
  },
  {
    question: "Which social media platforms are most used in Japan?",
    answer:
      "LINE is the dominant messaging app, while Twitter/X has unusually high engagement in Japan compared to other countries. Instagram is the fastest-growing major social platform, especially among younger users, while Facebook is used mainly for professional networking.",
  },
  {
    question: "Is Amazon or Rakuten more popular in Japan?",
    answer:
      "Amazon Japan leads in overall monthly visits (around 6.2B vs Rakuten's 3.8B), but Rakuten remains a formidable competitor thanks to its points ecosystem, Rakuten Mobile, and a marketplace of tens of thousands of merchants. Both are essential platforms for Japanese e-commerce.",
  },
  {
    question: "What is Mercari?",
    answer:
      "Mercari is Japan's leading C2C (consumer-to-consumer) marketplace app, launched in 2013. It popularized mobile flea-market trading in Japan and has expanded to the United States and the UK. Its web version attracts around 1.8 billion monthly visits.",
  },
  {
    question: "How are the website traffic numbers calculated?",
    answer:
      "Traffic figures are estimates aggregated from third-party web analytics providers such as SimilarWeb and Semrush, covering desktop and mobile web visits for July 2026. In-app usage is excluded, so app-heavy services like LINE may have larger true audiences than their web numbers suggest.",
  },
  {
    question: "Are Japanese users shifting to mobile apps?",
    answer:
      "Yes. Mobile accounts for over 70% of Japanese web traffic, and many services (LINE, Mercari, Cookpad) see the majority of usage through native apps. However, portals, search, news, and streaming sites continue to drive substantial web traffic, which is what this ranking measures.",
  },
];

// ===== Related =====
const japanRelated: RelatedListing[] = [
  {
    title: "Most Visited Websites in India",
    href: "/listings/most-visited-websites-in-india",
    description:
      "The 50 most visited websites in India, ranked by estimated monthly visits for 2026.",
  },
  {
    title: "Trending Beauty Products in Japan",
    href: "/listings/trending-beauty-products-japan",
    description:
      "A category trend ranking of Japan's fastest-growing beauty and skincare products.",
  },
  {
    title: "Top E-commerce Platforms in Asia",
    href: "/listings/top-ecommerce-platforms-asia",
    description:
      "A cross-country comparison of the leading online marketplaces across Asian markets.",
  },
  {
    title: "Most Popular Social Media Apps in 2026",
    href: "/listings/popular-social-media-apps-2026",
    description:
      "Global ranking of social and messaging apps by active users and engagement.",
  },
];

// ===== 模板D 完整数据 =====
const japanWebsiteData: WebsiteListData = {
  type: "D",
  country: "Japan",
  year: "2026",
  websites: japanWebsites,
  methodology:
    "This ranking is based on estimated monthly visits for July 2026, aggregated from third-party web analytics providers including SimilarWeb and Semrush. Traffic figures represent total visits across desktop and mobile web (in-app usage is excluded). Rankings focus on traffic originating from Japanese users. Month-over-month percentages compare July 2026 against June 2026. Figures are approximate and intended for comparative analysis rather than exact measurement.",
  faqs: japanFaqs,
  related: japanRelated,
  tldr: japanTldr,
  toc: japanToc,
  author: DEFAULT_AUTHOR,
  introduction:
    "Japan's internet landscape is unique: while global giants like Google, YouTube, and Amazon dominate, homegrown platforms such as Yahoo Japan, Rakuten, LINE, and Niconico continue to command massive audiences. This ranking tracks the 50 most visited websites in Japan as of July 2026, based on estimated monthly visits. From dominant portals and e-commerce marketplaces to streaming services and niche communities, the list reveals where Japanese users actually spend their time online — and which categories are growing fastest.",
};

// ===== Mock 数据路由 =====

const MOCK_MAP: Record<string, ListingData> = {
  "most-visited-websites-in-japan": japanWebsiteData,
};

/**
 * 根据 slug 返回对应的 mock 榜单数据。
 * 未命中的 slug 返回 null（后续填充）。
 */
export function getMockData(slug: string): ListingData | null {
  return MOCK_MAP[slug] ?? null;
}
