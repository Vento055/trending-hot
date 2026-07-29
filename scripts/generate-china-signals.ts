/**
 * China Signal Article Generator
 * 
 * Fetches data from V2EX (free, no API key) and TianAPI (requires TIAN_API_KEY env var).
 * When TIAN_API_KEY is not set, gracefully degrades to V2EX-only data.
 * 
 * Usage: npx tsx scripts/generate-china-signals.ts
 */
import fs from "fs";
import path from "path";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "sk-0003200be8bc4cd893cc830fe29411de";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const TIAN_API_KEY = process.env.TIAN_API_KEY || "";
const ARTICLES_DIR = path.join(process.cwd(), "data", "articles");

interface V2exTopic {
  id: number;
  title: string;
  url: string;
  replies: number;
  node: { name: string; title: string };
  member: { username: string };
}

interface TianApiItem {
  title: string;
  summary: string;
  source: string;
  url: string;
}

interface ChinaSignalSeed {
  slug: string;
  title: string;
  subtitle: string;
  strength: string;
  keywords: string[];
  topic: string;
}

/* ===== V2EX Data Fetch ===== */
async function fetchV2exHot(): Promise<V2exTopic[]> {
  try {
    const res = await fetch("https://www.v2ex.com/api/topics/hot.json", {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`V2EX hot: ${res.status}`);
    const data = await res.json();
    console.log(`  V2EX hot: ${data.length} topics`);
    return data;
  } catch (e) {
    console.error("  V2EX hot fetch failed:", e);
    return [];
  }
}

async function fetchV2exLatest(): Promise<V2exTopic[]> {
  try {
    const res = await fetch("https://www.v2ex.com/api/topics/latest.json", {
      headers: { "User-Agent": "trending-hot/1.0" },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`V2EX latest: ${res.status}`);
    const data = await res.json();
    console.log(`  V2EX latest: ${data.length} topics`);
    return data;
  } catch (e) {
    console.error("  V2EX latest fetch failed:", e);
    return [];
  }
}

/* ===== TianAPI Data Fetch (graceful degradation) ===== */
async function fetchTianApi(col: string): Promise<TianApiItem[]> {
  if (!TIAN_API_KEY) {
    console.log(`  TianAPI: Skipped (no TIAN_API_KEY), using V2EX only`);
    return [];
  }
  try {
    const url = `https://apis.tianapi.com/${col}/index?key=${TIAN_API_KEY}&num=10`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`TianAPI ${col}: ${res.status}`);
    const json = await res.json();
    if (json.code !== 200) {
      console.log(`  TianAPI ${col}: ${json.msg || "error"}`);
      return [];
    }
    const items: TianApiItem[] = (json.result?.list || []).map((item: any) => ({
      title: item.title || "",
      summary: item.description || item.digest || "",
      source: item.source || "TianAPI",
      url: item.url || "",
    }));
    console.log(`  TianAPI ${col}: ${items.length} items`);
    return items;
  } catch (e) {
    console.error(`  TianAPI ${col} fetch failed:`, e);
    return [];
  }
}

/* ===== Build context for DeepSeek ===== */
function buildV2exContext(topics: V2exTopic[], keywords: string[]): string {
  const filtered = topics.filter((t) =>
    keywords.some((kw) =>
      t.title.toLowerCase().includes(kw.toLowerCase()) ||
      (t.node?.title || "").toLowerCase().includes(kw.toLowerCase())
    )
  );
  const useTopics = filtered.length >= 3 ? filtered : topics.slice(0, 8);

  return useTopics
    .slice(0, 10)
    .map((t, i) => `${i + 1}. [${t.node?.title || t.node?.name || "general"}] ${t.title} (Replies: ${t.replies}, Author: ${t.member?.username || "unknown"}) - https://www.v2ex.com/t/${t.id}`)
    .join("\n");
}

function buildTianApiContext(items: TianApiItem[]): string {
  if (items.length === 0) return "No TianAPI data available (API key not configured).";
  return items
    .slice(0, 8)
    .map((item, i) => `${i + 1}. [${item.source}] ${item.title}${item.summary ? " - " + item.summary.slice(0, 200) : ""} - ${item.url}`)
    .join("\n");
}

/* ===== Generate article via DeepSeek ===== */
async function generateChinaArticle(
  seed: ChinaSignalSeed,
  v2exContext: string,
  tianApiContext: string
): Promise<any> {
  const prompt = `You are a senior technology analyst specializing in Chinese tech trends. Based on the following data from Chinese tech communities, write a comprehensive English opportunity signal analysis article.

SIGNAL TOPIC: ${seed.title}
STRENGTH: ${seed.strength}
KEYWORDS: ${seed.keywords.join(", ")}

SUBTITLE/CONTEXT:
${seed.subtitle}

V2EX COMMUNITY DISCUSSIONS (Chinese developer forum):
${v2exContext || "No V2EX data available."}

TIANAPI NEWS (Chinese tech news):
${tianApiContext}

Write the analysis in this exact JSON structure:
{
  "coreJudgment": "One paragraph (200-300 words) summarizing the core opportunity. Bold, confident, data-backed.",
  "sections": [
    {
      "heading": "Trend Data",
      "body": "Analyze community engagement from V2EX discussions, news coverage, and growth indicators. Mention specific numbers. 200+ words."
    },
    {
      "heading": "Industry Background",
      "body": "Explain the technology, market forces, or regulatory environment in China. 200+ words."
    },
    {
      "heading": "Behavioral Drivers",
      "body": "Why are Chinese developers and companies pursuing this? What pain points or market gaps drive demand? 200+ words."
    },
    {
      "heading": "Timing Assessment",
      "body": "How urgent is this window? What is the optimal strategy for international audiences? 200+ words."
    }
  ]
}

Requirements:
- All content MUST be in English
- When referencing Chinese companies, products, or concepts, use the format: "Chinese Name (English explanation)" e.g. "DeepSeek (深度求索)", "Qwen (通义千问)", "ByteDance (字节跳动)"
- Use specific numbers and engagement metrics from the V2EX data
- Tone: professional, analytical, actionable for an international audience
- Each section body must be at least 200 words
- Do NOT include markdown formatting inside JSON strings
- Return ONLY valid JSON, no other text`;

  const res = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 8000,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek API error: ${res.status} - ${err}`);
  }

  const json = await res.json();
  const content = json.choices?.[0]?.message?.content || "";

  let parsed: any;
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    let jsonStr = jsonMatch ? jsonMatch[0] : content;
    const openBraces = (jsonStr.match(/{/g) || []).length;
    const closeBraces = (jsonStr.match(/}/g) || []).length;
    if (openBraces > closeBraces) {
      jsonStr = jsonStr + "}".repeat(openBraces - closeBraces);
    }
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse DeepSeek response:", content.slice(0, 500));
    throw new Error("Invalid JSON from DeepSeek");
  }

  return parsed;
}

/* ===== Signal seeds for China tech topics ===== */
const CHINA_SIGNAL_SEEDS: ChinaSignalSeed[] = [
  {
    slug: "deepseek-open-source-llm",
    title: "DeepSeek Open-Source LLM Ecosystem",
    subtitle: "DeepSeek (深度求索) has emerged as a leading open-source large language model from China, rivaling GPT-4 in benchmarks while remaining freely available. The global developer community is rapidly adopting it for cost-sensitive applications.",
    strength: "Very Strong (90%)",
    keywords: ["deepseek", "AI", "大模型", "开源", "llm"],
    topic: "Chinese AI large language models",
  },
  {
    slug: "qwen-model-family-expansion",
    title: "Qwen Model Family Expansion",
    subtitle: "Alibaba's Qwen (通义千问) model family has expanded into multimodal, coding, and edge-deployment variants. The open-weight releases are gaining traction globally among developers seeking alternatives to Western models.",
    strength: "Strong (85%)",
    keywords: ["qwen", "通义千问", "alibaba", "ai", "model"],
    topic: "Chinese AI model ecosystem",
  },
  {
    slug: "chinese-developer-tools-global",
    title: "Chinese Developer Tools Going Global",
    subtitle: "Tools like Vite, UnoCSS, and TDesign, created by Chinese developers, are achieving widespread international adoption. The pipeline from Chinese open-source to global standard is accelerating.",
    strength: "Strong (82%)",
    keywords: ["vite", "vitejs", "uniocss", "tdesign", "前端", "工具"],
    topic: "Chinese developer tooling",
  },
  {
    slug: "v2ex-community-trends",
    title: "V2EX Community Tech Trends",
    subtitle: "V2EX, China's premier developer community, reveals emerging trends in remote work, AI tooling adoption, and indie hacking that signal broader shifts in the Chinese tech landscape.",
    strength: "Moderate (75%)",
    keywords: ["v2ex", "远程办公", "独立开发", "ai", "程序员"],
    topic: "Chinese developer community trends",
  },
  {
    slug: "china-embodied-ai-robotics",
    title: "China Embodied AI and Robotics",
    subtitle: "Chinese companies are investing heavily in embodied AI (具身智能) and humanoid robotics. Startups like Unitree and Agility Robotics' Chinese competitors are attracting significant venture capital.",
    strength: "Strong (84%)",
    keywords: ["机器人", "具身智能", "robotics", "unitree", "ai"],
    topic: "Chinese robotics and embodied AI",
  },
  {
    slug: "china-ai-agent-platforms",
    title: "Chinese AI Agent Platforms",
    subtitle: "Chinese tech giants and startups are building AI Agent platforms tailored to domestic use cases, from customer service to code generation. The ecosystem is diverging from Western approaches.",
    strength: "Strong (80%)",
    keywords: ["agent", "ai", "智能体", "coze", "dify"],
    topic: "Chinese AI agent platforms",
  },
  {
    slug: "xiaohongshu-content-economy",
    title: "Xiaohongshu Content Economy Evolution",
    subtitle: "Xiaohongshu (小红书), China's lifestyle social platform, is evolving from a review site into a commerce-driven content ecosystem. New creator monetization models are emerging.",
    strength: "Moderate (76%)",
    keywords: ["小红书", "内容", "电商", "creator", "monetization"],
    topic: "Chinese platform economy",
  },
  {
    slug: "china-cross-border-ecommerce",
    title: "China Cross-Border Ecommerce Tech Stack",
    subtitle: "Chinese cross-border ecommerce platforms like Shein, Temu, and TikTok Shop are building sophisticated tech stacks that leverage AI for supply chain, localization, and customer acquisition.",
    strength: "Very Strong (88%)",
    keywords: ["跨境电商", "shein", "temu", "tiktok", "出海"],
    topic: "Chinese cross-border ecommerce",
  },
];

/* ===== Main ===== */
async function main() {
  console.log("=== China Signal Article Generator ===\n");

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  // Fetch V2EX data
  console.log("Fetching V2EX data...");
  const [v2exHot, v2exLatest] = await Promise.all([fetchV2exHot(), fetchV2exLatest()]);
  const allV2ex = [...v2exHot, ...v2exLatest];
  console.log(`Total V2EX topics: ${allV2ex.length}\n`);

  // Fetch TianAPI data (graceful degradation)
  console.log("Fetching TianAPI data...");
  const [kejiNews, aiNews, hulianwangNews, chuangyeNews] = await Promise.all([
    fetchTianApi("keji"),
    fetchTianApi("ai"),
    fetchTianApi("hulianwang"),
    fetchTianApi("chuangye"),
  ]);
  const allTianApi = [...kejiNews, ...aiNews, ...hulianwangNews, ...chuangyeNews];
  console.log(`Total TianAPI items: ${allTianApi.length}\n`);

  // Generate articles
  for (const seed of CHINA_SIGNAL_SEEDS) {
    console.log(`Processing: ${seed.title}...`);

    const v2exContext = buildV2exContext(allV2ex, seed.keywords);
    const tianApiContext = buildTianApiContext(
      allTianApi.filter((item) =>
        seed.keywords.some((kw) =>
          item.title.toLowerCase().includes(kw.toLowerCase()) ||
          item.summary.toLowerCase().includes(kw.toLowerCase())
        )
      )
    );

    try {
      const generated = await generateChinaArticle(seed, v2exContext, tianApiContext);

      const article = {
        slug: seed.slug,
        title: seed.title,
        subtitle: seed.subtitle,
        tag: "China Signal",
        strength: seed.strength,
        coreJudgment: generated.coreJudgment || seed.subtitle,
        sections: generated.sections || [],
        sources: [
          { label: `V2EX - ${seed.topic} Discussions`, url: "https://www.v2ex.com/" },
          { label: "36Kr (36氪) - China Tech News", url: "https://36kr.com/" },
          { label: "Huxiu (虎嗅) - Tech Analysis", url: "https://www.huxiu.com/" },
        ],
        related: CHINA_SIGNAL_SEEDS
          .filter((s) => s.slug !== seed.slug)
          .slice(0, 3)
          .map((s) => ({ title: s.title, slug: s.slug })),
        generatedAt: new Date().toISOString(),
      };

      const filePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(article, null, 2), "utf-8");
      console.log(`  Saved: ${filePath}\n`);
    } catch (e: any) {
      console.error(`  FAILED: ${seed.title} - ${e.message}\n`);
    }
  }

  console.log("=== China Signal generation complete ===");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
