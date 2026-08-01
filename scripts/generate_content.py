#!/usr/bin/env python3
"""
Trending Hot — LLM Content Generator
====================================
Reads trend data JSON from /data/trends/ and generates SEO-optimized article
drafts using an LLM (OpenAI-compatible API). Outputs Markdown to /content/drafts/.

Usage:
    python scripts/generate_content.py --input data/trends/beauty_20260801.json
    python scripts/generate_content.py --input data/trends/beauty_20260801.json --keyword "glass skin"
    python scripts/generate_content.py --input data/trends/beauty_20260801.json --all

Requirements:
    pip install openai jinja2 python-dotenv

Environment:
    OPENAI_API_KEY=sk-...        (or any OpenAI-compatible API key)
    OPENAI_BASE_URL=https://...  (optional, for alternative endpoints)
    LLM_MODEL=gpt-4o-mini        (optional, default: gpt-4o-mini)

Output:
    content/drafts/<slug>_<YYYYMMDD>.md
"""

import argparse
import json
import logging
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("ERROR: openai not installed. Run: pip install openai jinja2 python-dotenv")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DRAFTS_DIR = PROJECT_ROOT / "content" / "drafts"
LOG_DIR = PROJECT_ROOT / "logs"

# ── Logging ──────────────────────────────────────────────────────────────────

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

# ── LLM Client ───────────────────────────────────────────────────────────────

def init_llm_client() -> OpenAI:
    """Initialize OpenAI-compatible LLM client."""
    api_key = os.getenv("OPENAI_API_KEY", "")
    base_url = os.getenv("OPENAI_BASE_URL", None)

    if not api_key:
        logger.error("OPENAI_API_KEY not set. Set it in .env or environment.")
        sys.exit(1)

    return OpenAI(api_key=api_key, base_url=base_url)


def get_model_name() -> str:
    return os.getenv("LLM_MODEL", "gpt-4o-mini")


# ── Slug & Path Helpers ──────────────────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert text to URL-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


# ── Prompt Template ──────────────────────────────────────────────────────────

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
- Every data point must cite a source (even if approximate)
- Use H2 (##) for main sections, H3 (###) for subsections
- Keep paragraphs under 4 sentences
- Include the target keyword naturally in H1, first paragraph, and at least 2 H2s
- Tone: authoritative but accessible, like a knowledgeable industry analyst
- Length: 1500-2500 words
- Do NOT use placeholder text — write actual content
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
1. The article URL will be: https://trending-hot.com/{slug}-trends
2. Target keyword: "{keyword}"
3. Include 5-8 data points with sources (cite Google Trends data above + industry reports)
4. Include internal links to related Trending Hot pages where relevant
5. End with a "Cite This Data" section mentioning: "Data sourced from Google Trends and industry reports. Full dataset at https://trending-hot.com/{slug}-trends"

Write the complete article in Markdown format. Start with the H1 title.
"""


# ── Content Generation ───────────────────────────────────────────────────────

def generate_article(client: OpenAI, keyword_data: dict) -> str:
    """Generate a single article from keyword trend data."""
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
            max_tokens=3000,
        )
        content = response.choices[0].message.content
        logger.info(f"Article generated: {len(content)} chars")
        return content
    except Exception as e:
        logger.error(f"LLM generation failed for '{keyword}': {e}")
        raise


def save_draft(content: str, keyword: str) -> Path:
    """Save generated article as Markdown draft."""
    DRAFTS_DIR.mkdir(parents=True, exist_ok=True)
    slug = slugify(keyword)
    date_str = datetime.now().strftime("%Y%m%d")
    filename = f"{slug}_{date_str}.md"
    filepath = DRAFTS_DIR / filename

    # Add metadata header
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
    """Process a single keyword: generate article + save draft."""
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


# ── CLI Entry Point ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Generate SEO article drafts from trend data")
    parser.add_argument("--input", type=str, required=True,
                        help="Path to trend data JSON file")
    parser.add_argument("--keyword", type=str, default=None,
                        help="Generate article for specific keyword only")
    parser.add_argument("--all", action="store_true",
                        help="Generate articles for all keywords in the file")
    parser.add_argument("--dry-run", action="store_true",
                        help="Print what would be generated without calling LLM")
    args = parser.parse_args()

    # Load trend data
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

    # Filter to specific keyword if requested
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

    if args.dry_run:
        logger.info("DRY RUN — would generate articles for:")
        for k in keywords:
            logger.info(f"  - {k['keyword']} → {slugify(k['keyword'])}_{datetime.now().strftime('%Y%m%d')}.md")
        sys.exit(0)

    # Initialize LLM client
    client = init_llm_client()

    # Generate articles
    results = []
    for i, kw_data in enumerate(keywords):
        logger.info(f"[{i+1}/{len(keywords)}] Processing: {kw_data['keyword']}")
        result = process_keyword(client, kw_data)
        results.append(result)

        # Rate limit between LLM calls
        if i < len(keywords) - 1:
            time.sleep(3)

    # Summary
    logger.info("\n=== Generation Summary ===")
    success = sum(1 for r in results if r["status"] == "success")
    failed = sum(1 for r in results if r["status"] == "failed")
    logger.info(f"  Success: {success}")
    logger.info(f"  Failed: {failed}")
    for r in results:
        status_icon = "✓" if r["status"] == "success" else "✗"
        detail = r.get("file", r.get("error", ""))
        logger.info(f"  {status_icon} {r['keyword']}: {detail}")

    # Save summary
    summary_path = DRAFTS_DIR / f"_summary_{datetime.now().strftime('%Y%m%d')}.json"
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump({"generated_at": datetime.now(timezone.utc).isoformat(), "results": results}, f, indent=2)
    logger.info(f"Summary saved: {summary_path}")


if __name__ == "__main__":
    main()
