import argparse
import json
import logging
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("ERROR: openai not installed. Run: pip install openai jinja2 python-dotenv")
    sys.exit(1)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DRAFTS_DIR = PROJECT_ROOT / "content" / "drafts"
LOG_DIR = PROJECT_ROOT / "logs"

LOG_DIR.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_DIR / f"generate_content_{datetime.now().strftime('%Y%m%d')}.log"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

def init_llm_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY", "")
    base_url = os.getenv("OPENAI_BASE_URL", None)
    if not api_key:
        logger.error("OPENAI_API_KEY not set. Set it in .env or environment.")
        sys.exit(1)
    return OpenAI(api_key=api_key, base_url=base_url, timeout=60, max_retries=2)

def get_model_name() -> str:
    return os.getenv("LLM_MODEL", "gpt-4o-mini")

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")

SYSTEM_PROMPT = """You are an expert SEO content writer for Trending Hot (trending-hot.com).
You write data-driven, factually accurate trend articles that rank well in search engines.

Your articles follow this structure:
1. TL;DR (3-4 sentence summary with key numbers)
2. Table of Contents
3. Introduction (150-200 words with the trend's significance)
4. Data & Statistics section (5-8 key data points with sources)
5. Why It's Trending (analysis of growth drivers)
6. Key Players / Brands (if applicable)
7. How to Get Started / Use Cases (practical value)
8. FAQ (5 questions with concise answers)
9. Related Trends (internal links to other Trending Hot pages)

Writing rules:
- Use bold for key numbers and statistics
- Every data point must cite a **verifiable** source. Never fabricate URLs, report names, or survey numbers. If no source exists for a claim, explicitly state that no authoritative data is available.
- Use H2 (##) for main sections, H3 (###) for subsections
- Keep paragraphs under 4 sentences
- Include the target keyword naturally in H1, first paragraph, and at least 2 H2s

ANALYTICAL FRAMEWORK (Required for every article):
1. Mechanism Analysis — Explain the underlying drivers: what event, policy, supply-demand shift, or structural change is causing this trend to rise? Help readers understand the “why.”
2. Stakeholder Game — Identify who benefits from this trend, where the money flows, who bears the cost, and who has an incentive to maintain the status quo vs. disrupt it. Help readers see through to the underlying interests.
3. Forward-Looking Assessment — Answer: Will this keep rising? For how long? What's the ceiling? Provide explicit reasoning, not speculation. If uncertain, state it clearly.
HARD RULES (non-negotiable):
- All claims must be grounded in verifiable evidence. Never fabricate URLs, data, or quotes.
- Do not speculate about conspiracies or hidden agendas. Stick to what can be demonstrated.
- Do not take sides for the reader. Present competing interests objectively.
- When evidence is insufficient, explicitly write “uncertain” or “evidence is limited” rather than forcing a conclusion.
- No hallucinated sources. If search data is unavailable, state so clearly and rely only on general knowledge.

- Tone: authoritative but accessible, like a knowledgeable industry analyst
- Length: 1800-2800 words
- Do NOT use placeholder text -- write actual content
"""

USER_PROMPT_TEMPLATE = """Write a comprehensive SEO article about the trend: "{keyword}"

Category: {category}
Geographic focus: {geo}
Time range analyzed: {timeframe}

Google Trends data:
- Average interest: {avg_interest}
- Peak interest: {peak_interest}
- Trend direction: {trend_direction}
- Related rising queries: {rising_queries}
- Related top queries: {top_queries}

Requirements:
1. The article URL will be: https://www.trending-hot.com/{slug}-trends
2. Target keyword: "{keyword}"
3. Include 5-8 data points with sources (cite Google Trends data above + industry reports)
4. Include internal links to related Trending Hot pages where relevant
5. End with a "Cite This Data" section mentioning: "Data sourced from Google Trends and industry reports. Full dataset at https://www.trending-hot.com/{slug}-trends"

Write the complete article in Markdown format. Start with the H1 title.
"""


def generate_article(client: OpenAI, keyword_data: dict) -> str:
    keyword = keyword_data["keyword"]
    category = keyword_data.get("category", "general")
    geo = keyword_data.get("geo", "global")
    timeframe = keyword_data.get("timeframe", "90d")

    rising = keyword_data.get("related_queries", {}).get("rising", [])
    top = keyword_data.get("related_queries", {}).get("top", [])

    rising_text = ", ".join([q.get("query", "") for q in rising[:5]]) if rising else "N/A"
    top_text = ", ".join([q.get("query", "") for q in top[:5]]) if top else "N/A"

    slug = slugify(keyword)

    user_prompt = USER_PROMPT_TEMPLATE.format(
        keyword=keyword,
        category=category,
        geo=geo,
        timeframe=timeframe,
        avg_interest=keyword_data.get("avg_interest", "N/A"),
        peak_interest=keyword_data.get("peak_interest", "N/A"),
        trend_direction=keyword_data.get("trend_direction", "unknown"),
        rising_queries=rising_text,
        top_queries=top_text,
        slug=slug,
    )

    model = get_model_name()
    logger.info(f"Generating article for '{keyword}' using {model}...")

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
            max_tokens=2500,
        )
        content = response.choices[0].message.content
        logger.info(f"Article generated: {len(content)} chars")
        return content
    except Exception as e:
        logger.error(f"LLM generation failed for '{keyword}': {e}")
        raise


def save_draft(content: str, keyword: str) -> Path:
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    slug = slugify(keyword)
    date_str = datetime.now().strftime("%Y%m%d")
    filename = f"{slug}_{date_str}.md"
    filepath = DRAFTS_DIR / filename

    metadata = f"""---
title: "{keyword.title()} Trends 2026"
slug: "{slug}"
keyword: "{keyword}"
generated_at: "{datetime.now(timezone.utc).isoformat()}"
status: "draft"
---

"""
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(metadata + content)

    logger.info(f"Draft saved: {filepath}")
    return filepath


def process_keyword(client: OpenAI, keyword_data: dict) -> dict:
    keyword = keyword_data["keyword"]
    try:
        content = generate_article(client, keyword_data)
        filepath = save_draft(content, keyword)
        return {
            "keyword": keyword,
            "status": "success",
            "file": str(filepath),
            "chars": len(content),
        }
    except Exception as e:
        return {
            "keyword": keyword,
            "status": "failed",
            "error": str(e),
        }


def main():
    parser = argparse.ArgumentParser(description="Generate SEO article drafts from trend data")
    parser.add_argument("--input", type=str, required=True,
                        help="Path to trend data JSON file")
    parser.add_argument("--keyword", type=str, default=None,
                        help="Generate article for specific keyword only")
    parser.add_argument("--all", action="store_true",
                        help="Generate articles for all keywords in the file")
    parser.add_argument("--limit", type=int, default=3,
                        help="Max number of keywords to process per file (default: 3)")
    parser.add_argument("--workers", type=int, default=5,
                        help="Max concurrent workers for parallel LLM calls (default: 5)")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print what would be generated without calling LLM")
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = PROJECT_ROOT / args.input

    if not input_path.exists():
        logger.error(f"Input file not found: {input_path}")
        sys.exit(1)

    with open(input_path, "r", encoding="utf-8") as f:
        trend_data = json.load(f)

    keywords = trend_data.get("data", [])
    if not keywords:
        logger.error("No keyword data found in input file")
        sys.exit(1)

    logger.info(f"Loaded {len(keywords)} keywords from {input_path}")

    if args.keyword:
        keywords = [k for k in keywords if k["keyword"] == args.keyword]
        if not keywords:
            logger.error(f"Keyword '{args.keyword}' not found in data")
            sys.exit(1)
    elif not args.all:
        logger.info("No --keyword or --all specified. Use --all to generate for all keywords.")
        logger.info("Available keywords:")
        for k in keywords:
            logger.info(f"  - {k['keyword']} (interest: {k.get('avg_interest', 'N/A')}, trend: {k.get('trend_direction', 'N/A')})")
        sys.exit(0)

    if args.limit > 0 and len(keywords) > args.limit:
        logger.info(f"Limiting to top {args.limit} keywords (out of {len(keywords)}) to control runtime")
        keywords = keywords[:args.limit]

    if args.dry_run:
        logger.info("DRY RUN -- would generate articles for:")
        for k in keywords:
            logger.info(f"  - {k['keyword']} -> {slugify(k['keyword'])}_{datetime.now().strftime('%Y%m%d')}.md")
        sys.exit(0)

    client = init_llm_client()
    workers = min(args.workers, len(keywords))

    logger.info(f"Processing {len(keywords)} keywords with {workers} concurrent workers...")

    # Process keywords in parallel using ThreadPoolExecutor
    results = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        future_to_kw = {
            executor.submit(process_keyword, client, kw_data): kw_data["keyword"]
            for kw_data in keywords
        }
        for future in as_completed(future_to_kw):
            keyword = future_to_kw[future]
            try:
                result = future.result()
                results.append(result)
                status_icon = "OK" if result["status"] == "success" else "FAIL"
                detail = result.get("file", result.get("error", ""))
                logger.info(f"  [{len(results)}/{len(keywords)}] {status_icon} {result['keyword']}: {detail}")
            except Exception as e:
                results.append({"keyword": keyword, "status": "failed", "error": str(e)})
                logger.error(f"  [{len(results)}/{len(keywords)}] FAIL {keyword}: {e}")

    logger.info("\n=== Generation Summary ===")
    success = sum(1 for r in results if r["status"] == "success")
    failed = sum(1 for r in results if r["status"] == "failed")
    logger.info(f"  Success: {success}")
    logger.info(f"  Failed: {failed}")
    for r in results:
        status_icon = "OK" if r["status"] == "success" else "FAIL"
        detail = r.get("file", r.get("error", ""))
        logger.info(f"  {status_icon} {r['keyword']}: {detail}")

    summary_path = DRAFTS_DIR / f"_summary_{datetime.now().strftime('%Y%m%d')}.json"
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump({"generated_at": datetime.now(timezone.utc).isoformat(), "results": results}, f, indent=2)
    logger.info(f"Summary saved: {summary_path}")


if __name__ == "__main__":
    main()
