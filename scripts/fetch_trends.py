#!/usr/bin/env python3
"""
Trending Hot — Google Trends Data Fetcher
==========================================
Fetches trending keyword data from Google Trends via the unofficial pytrends API.
Outputs structured JSON to /data/trends/ for downstream content generation.

Usage:
    python scripts/fetch_trends.py --category beauty --limit 20
    python scripts/fetch_trends.py --category tech --geo US --time-range 7d
    python scripts/fetch_trends.py --all-categories

Requirements:
    pip install pytrends pandas

Output:
    data/trends/<category>_<YYYYMMDD>.json
"""

import argparse
import json
import logging
import os
import sys
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path

try:
    from pytrends.request import TrendReq
except ImportError:
    print("ERROR: pytrends not installed. Run: pip install pytrends pandas")
    sys.exit(1)

# ── Configuration ────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "trends"
LOG_DIR = PROJECT_ROOT / "logs"

# Category mapping: our internal category → Google Trends category ID
# Full list: https://github.com/pat310/google-trends-api/wiki/Category-Codes
CATEGORY_MAP = {
    "beauty": {"gcat": "44", "keywords": [
        "glass skin", "nano hydroxyapatite toothpaste", "beet gummies",
        "toe spacers", "scalp serum", "slugging skincare",
        "lip oil", "spf scalp", "mascara trend", "nail art 2026"
    ]},
    "tech": {"gcat": "5", "keywords": [
        "ai coding agents", "webgpu", "rust programming 2026",
        "htmx", "notion plugins", "ai voice cloning",
        "ai video generation", "local llm", "edge computing",
        "bun js"
    ]},
    "ai": {"gcat": "5", "keywords": [
        "ai coding agents", "ai video generation", "ai voice cloning",
        "eu ai act", "local llm", "ai agent framework",
        "generative ai tools", "ai regulation 2026",
        "multimodal ai", "open source ai"
    ]},
    "ecommerce": {"gcat": "78", "keywords": [
        "shopify ecosystem", "social commerce", "cross border ecommerce",
        "bnpl", "headless commerce", "live shopping",
        "product discovery ai", "subscription commerce"
    ]},
    "social": {"gcat": "81", "keywords": [
        "tiktok shop", "threads app", "mastodon",
        "social commerce", "ai content creation",
        "short form video", "creator economy"
    ]},
    "health": {"gcat": "45", "keywords": [
        "nano hydroxyapatite", "beet gummies", "toe spacers",
        "magnesium spray", "creatine gummies", "functional mushrooms",
        "cold plunge", "red light therapy"
    ]},
}

# Time range mapping
TIME_RANGES = {
    "7d": "now 7-d",
    "30d": "today 1-m",
    "90d": "today 3-m",
    "12m": "today 12-m",
    "5y": "today 5-y",
}

# ── Logging Setup ────────────────────────────────────────────────────────────

LOG_DIR.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_DIR / f"fetch_trends_{datetime.now().strftime('%Y%m%d')}.log"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)


# ── Core Functions ───────────────────────────────────────────────────────────

def init_pytrends(geo: str = "") -> TrendReq:
    """Initialize pytrends client with retry logic."""
    for attempt in range(3):
        try:
            return TrendReq(hl="en-US", tz=360, geo=geo, timeout=(10, 25))
        except Exception as e:
            logger.warning(f"pytrends init attempt {attempt+1} failed: {e}")
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("Failed to initialize pytrends after 3 attempts")


def fetch_interest_over_time(pytrends: TrendReq, keyword: str, timeframe: str) -> dict:
    """Fetch interest-over-time data for a single keyword."""
    try:
        pytrends.build_payload([keyword], cat=0, timeframe=timeframe)
        df = pytrends.interest_over_time()
        if df.empty:
            return {"keyword": keyword, "interest": [], "avg": 0, "trend": "unknown"}

        values = df[keyword].tolist()
        avg = round(sum(values) / len(values), 1) if values else 0

        # Calculate trend direction (last 25% vs first 25%)
        quarter = max(1, len(values) // 4)
        first_avg = sum(values[:quarter]) / quarter if quarter else 0
        last_avg = sum(values[-quarter:]) / quarter if quarter else 0

        if last_avg > first_avg * 1.2:
            trend = "rising"
        elif last_avg < first_avg * 0.8:
            trend = "declining"
        else:
            trend = "stable"

        return {
            "keyword": keyword,
            "interest_values": values[-30:] if len(values) > 30 else values,
            "avg_interest": avg,
            "peak_interest": max(values) if values else 0,
            "trend_direction": trend,
            "data_points": len(values),
        }
    except Exception as e:
        logger.error(f"Failed to fetch interest data for '{keyword}': {e}")
        return {"keyword": keyword, "interest": [], "avg": 0, "trend": "error", "error": str(e)}


def fetch_related_queries(pytrends: TrendReq, keyword: str) -> dict:
    """Fetch related queries (top + rising) for a keyword."""
    try:
        related = pytrends.related_queries()
        rising = []
        top = []

        if keyword in related:
            if related[keyword]["rising"] is not None:
                rising = related[keyword]["rising"].to_dict("records")[:10]
            if related[keyword]["top"] is not None:
                top = related[keyword]["top"].to_dict("records")[:10]

        return {"rising": rising, "top": top}
    except Exception as e:
        logger.warning(f"Failed to fetch related queries for '{keyword}': {e}")
        return {"rising": [], "top": []}


def fetch_category_data(category: str, geo: str, timeframe: str, limit: int) -> list:
    """Fetch trend data for all keywords in a category."""
    if category not in CATEGORY_MAP:
        logger.error(f"Unknown category: {category}. Available: {list(CATEGORY_MAP.keys())}")
        return []

    cat_config = CATEGORY_MAP[category]
    keywords = cat_config["keywords"][:limit]
    gcat = int(cat_config["gcat"])

    pytrends = init_pytrends(geo=geo)
    results = []

    for i, kw in enumerate(keywords):
        logger.info(f"[{category}] Fetching ({i+1}/{len(keywords)}): {kw}")

        # Fetch interest over time
        interest_data = fetch_interest_over_time(pytrends, kw, timeframe)

        # Rate limit: wait between requests to avoid 429
        time.sleep(2)

        # Fetch related queries
        related = fetch_related_queries(pytrends, kw)

        time.sleep(2)

        results.append({
            "keyword": kw,
            "category": category,
            "google_category_id": gcat,
            "geo": geo or "global",
            "timeframe": timeframe,
            **interest_data,
            "related_queries": related,
            "source": "google_trends",
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        })

    return results


def save_results(data: list, category: str) -> Path:
    """Save results to JSON file."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{category}_{datetime.now().strftime('%Y%m%d')}.json"
    filepath = OUTPUT_DIR / filename

    output = {
        "category": category,
        "fetch_date": datetime.now(timezone.utc).isoformat(),
        "total_keywords": len(data),
        "source": "google_trends",
        "data": data,
    }

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    logger.info(f"Saved {len(data)} keywords to {filepath}")
    return filepath


# ── CLI Entry Point ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Fetch trending data from Google Trends")
    parser.add_argument("--category", type=str, default="beauty",
                        choices=list(CATEGORY_MAP.keys()),
                        help="Category to fetch (default: beauty)")
    parser.add_argument("--all-categories", action="store_true",
                        help="Fetch all categories sequentially")
    parser.add_argument("--geo", type=str, default="",
                        help="Geographic code (e.g., US, JP, '' for global)")
    parser.add_argument("--time-range", type=str, default="90d",
                        choices=list(TIME_RANGES.keys()),
                        help="Time range (default: 90d)")
    parser.add_argument("--limit", type=int, default=10,
                        help="Max keywords per category (default: 10)")
    args = parser.parse_args()

    timeframe = TIME_RANGES[args.time_range]
    logger.info(f"Starting trend fetch: category={args.category}, geo={args.geo or 'global'}, timeframe={timeframe}")

    if args.all_categories:
        all_results = {}
        for cat in CATEGORY_MAP:
            logger.info(f"=== Processing category: {cat} ===")
            try:
                data = fetch_category_data(cat, args.geo, timeframe, args.limit)
                filepath = save_results(data, cat)
                all_results[cat] = {"file": str(filepath), "keywords": len(data)}
                # Pause between categories to avoid rate limiting
                time.sleep(10)
            except Exception as e:
                logger.error(f"Failed to fetch category '{cat}': {e}")
                all_results[cat] = {"error": str(e)}

        logger.info(f"\n=== Summary ===")
        for cat, result in all_results.items():
            if "error" in result:
                logger.info(f"  {cat}: FAILED - {result['error']}")
            else:
                logger.info(f"  {cat}: {result['keywords']} keywords → {result['file']}")
    else:
        data = fetch_category_data(args.category, args.geo, timeframe, args.limit)
        if data:
            filepath = save_results(data, args.category)
            logger.info(f"Done! {len(data)} keywords saved to {filepath}")
        else:
            logger.error("No data fetched. Check errors above.")
            sys.exit(1)


if __name__ == "__main__":
    main()
