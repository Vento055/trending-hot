// ===== 通用数据结构 =====

export interface AuthorMeta {
  name: string;
  role: string;
  date: string;
  readTime: string;
}

export interface TLDRItem {
  text: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedListing {
  title: string;
  href: string;
  description?: string;
}

// ===== 模板A：品类趋势榜 =====

export interface CategoryTrendItem {
  rank: number;
  name: string;
  definition: string;
  growthRate: string;
  growthValue: number;
  representativeBrands: string[];
  keyInsight?: string;
}

export interface CategoryTrendData {
  type: "A";
  category: string;
  year: string;
  items: CategoryTrendItem[];
  methodology: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  tldr: string[];
  toc: TOCItem[];
  author: AuthorMeta;
  introduction: string;
}

// ===== 模板B：数据统计榜 =====

export interface StatDataPoint {
  value: string;
  label: string;
  source: string;
}

export interface StatSubTopic {
  title: string;
  dataPoints: StatDataPoint[];
  insight?: string;
}

export interface StatisticsData {
  type: "B";
  industry: string;
  year: string;
  subTopics: StatSubTopic[];
  methodology: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  tldr: string[];
  toc: TOCItem[];
  author: AuthorMeta;
  introduction: string;
}

// ===== 模板C：公司/品牌榜 =====

export interface CompanyItem {
  rank: number;
  name: string;
  logo?: string;
  description: string;
  keyMetric: string;
  keyMetricLabel: string;
  website: string;
  founded?: string;
  funding?: string;
}

export interface CompanyListData {
  type: "C";
  industry: string;
  year: string;
  companies: CompanyItem[];
  methodology: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  tldr: string[];
  toc: TOCItem[];
  author: AuthorMeta;
  introduction: string;
}

// ===== 模板D：国别网站榜 =====

export interface WebsiteItem {
  rank: number;
  name: string;
  type: string;
  monthlyVisits: string;
  monthlyVisitsValue: number;
  change: string;
  changeValue: number;
  description: string;
}

export interface WebsiteListData {
  type: "D";
  country: string;
  year: string;
  websites: WebsiteItem[];
  methodology: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  tldr: string[];
  toc: TOCItem[];
  author: AuthorMeta;
  introduction: string;
}

// ===== 模板E：工具对比榜 =====

export interface ToolItem {
  rank: number;
  name: string;
  features: string[];
  pricing: string;
  pros: string[];
  cons: string[];
  rating: number;
  website: string;
  bestFor: string;
}

export interface ToolComparisonData {
  type: "E";
  toolCategory: string;
  useCase: string;
  year: string;
  tools: ToolItem[];
  methodology: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  tldr: string[];
  toc: TOCItem[];
  author: AuthorMeta;
  introduction: string;
}

// ===== 联合类型 =====

export type ListingData =
  | CategoryTrendData
  | StatisticsData
  | CompanyListData
  | WebsiteListData
  | ToolComparisonData;

// ===== 组件 Props =====

export interface PageShellProps {
  title: string;
  subtitle: string;
  author: AuthorMeta;
  tldr: string[];
  toc: TOCItem[];
  children: React.ReactNode;
}

export interface ListingLayoutProps {
  title: string;
  subtitle: string;
  author: AuthorMeta;
  tldr: string[];
  toc: TOCItem[];
  introduction: string;
  faqs: FAQItem[];
  related: RelatedListing[];
  children: React.ReactNode;
}
