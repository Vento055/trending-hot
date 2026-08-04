#!/usr/bin/env python3
"""
Trending Hot — Google Trends Data Fetcher (with fallback)
=========================================================
Fetches trending keyword data from Google Trends.

Data source priority:
  1. pytrends (unofficial API) — interest-over-time + related queries
  2. Google Trends RSS (https://trends.google.com/trending/rss?geo=US)
  3. data/signals.json (locally curated signals)
  4. Static defaults (predefined keywords with placeholder values)

When pytrends fails (429 / timeout / import error), the script automatically
falls back to the next source so that downstream generate_content.py always
has valid JSON to consume.

Usage:
    python scripts/fetch_trends.py --category beauty --limit 20
    python scripts/fetch_trends.py --category tech --geo US --time-range 7d
    python scripts/fetch_trends.py --all-categories

Requirements:
    pip install pytrends pandas  (optional — script degrades gracefully)

Output:
    data/trends/<category>_<YYYYMMDD>.json
"""

import argparse
import json
import logging
import os
import re
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime, timezone, timedelta
from pathlib import Path

# pytrends is optional — fallback kicks in if it's missing or fails
try:
    from pytrends.request import TrendReq
except ImportError:
    TrendReq = None

# ── Configuration ────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = PROJECT_ROOT / "data" / "trends"
LOG_DIR = PROJECT_ROOT / "logs"
SIGNALS_FILE = PROJECT_ROOT / "data" / "signals.json"

# Category mapping: our internal category → Google Trends category ID
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

# Keywords used to match RSS trending topics to our categories
CATEGORY_MATCH_KEYWORDS = {
    "beauty": ["skin", "makeup", "cosmetic", "nail", "hair", "beauty",
                "lipstick", "mascara", "serum", "skincare", "glow", "facial"],
    "tech": ["software", "code", "app", "tech", "computer", "phone",
             "programming", "developer", "coding", "browser", "gpu", "cpu",
             "linux", "windows", "apple", "google", "microsoft", "samsung"],
    "ai": ["ai", "artificial intelligence", "llm", "gpt", "machine learning",
           "chatgpt", "openai", "deepmind", "gemini", "copilot", "deepseek",
           "claude", "anthropic", "neural", "robot"],
    "ecommerce": ["shop", "buy", "sale", "deal", "store", "amazon", "ebay",
                  "shopify", "ecommerce", "retail", "discount", "coupon"],
    "social": ["tiktok", "instagram", "twitter", "facebook", "social",
               "youtube", "snapchat", "threads", "mastodon", "influencer",
               "viral", "meme", "x.com"],
    "health": ["health", "wellness", "fitness", "diet", "medical", "doctor",
               "hospital", "cancer", "vaccine", "mental health", "gym",
               "workout", "nutrition", "supplement"],
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


# ── Primary: pytrends ────────────────────────────────────────────────────────

def init_pytrends(geo: str = "") -> TrendReq:
    """Initialize pytrends client with retry logic."""
    if TrendReq is None:
        raise RuntimeError("pytrends not installed")
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
            return {"keyword": keyword, "interest_values": [], "avg_interest": 0,
                    "peak_interest": 0, "trend_direction": "unknown", "data_points": 0}

        values = df[keyword].tolist()
        avg = round(sum(values) / len(values), 1) if values else 0

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
        return {"keyword": keyword, "interest_values": [], "avg_interest": 0,
                "peak_interest": 0, "trend_direction": "error", "data_points": 0,
                "error": str(e)}


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


def fetch_via_pytrends(category: str, geo: str, timeframe: str, limit: int) -> list:
    """Fetch trend data via pytrends. Raises on failure."""
    cat_config = CATEGORY_MAP[category]
    keywords = cat_config["keywords"][:limit]
    gcat = int(cat_config["gcat"])

    pytrends = init_pytrends(geo=geo)

    # Quick probe: if the first keyword fails, abort early to save time
    probe = fetch_interest_over_time(pytrends, keywords[0], timeframe)
    if probe.get("trend_direction") == "error":
        raise RuntimeError(f"pytrends probe failed for '{keywords[0]}' (likely 429)")

    results = []
    for i, kw in enumerate(keywords):
        logger.info(f"[{category}] Fetching ({i+1}/{len(keywords)}): {kw}")
        interest_data = fetch_interest_over_time(pytrends, kw, timeframe)
        time.sleep(2)
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


# ── Fallback 1: Google Trends RSS ────────────────────────────────────────────

_rss_cache: list | None = None


def fetch_google_trends_rss() -> list:
    """Fetch and parse Google Trends daily trending RSS feed (cached)."""
    global _rss_cache
    if _rss_cache is not None:
        return _rss_cache

    url = "https://trends.google.com/trending/rss?geo=US"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "trending-hot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            xml_text = resp.read().decode("utf-8")

        topics = []
        item_re = re.compile(r"<item>(.*?)</item>", re.DOTALL)
        for m in item_re.finditer(xml_text):
            item = m.group(1)
            title_m = re.search(
                r"<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?</title>", item, re.DOTALL
            )
            traffic_m = re.search(
                r"<ht:approx_traffic>(.*?)</ht:approx_traffic>", item
            )
            if title_m:
                title = title_m.group(1).strip()
                traffic_raw = traffic_m.group(1).strip() if traffic_m else "50"
                traffic_num = int(re.sub(r"\D", "", traffic_raw)) or 50
                if title and 2 < len(title) < 80:
                    topics.append({"title": title, "traffic": traffic_num})

        _rss_cache = topics
        logger.info(f"RSS fallback: fetched {len(topics)} trending topics")
        return topics
    except Exception as e:
        logger.warning(f"Google Trends RSS fallback failed: {e}")
        _rss_cache = []
        return []


def _match_topic_to_category(title: str, category: str) -> bool:
    """Check if an RSS topic title matches a category using word boundaries."""
    title_lower = title.lower()
    words = set(re.findall(r"[a-z0-9]+", title_lower))
    for kw in CATEGORY_MATCH_KEYWORDS.get(category, []):
        # Multi-word keywords: check substring; single short words: match as whole word
        if " " in kw:
            if kw in title_lower:
                return True
        elif len(kw) <= 3:
            if kw in words:
                return True
        else:
            if kw in title_lower:
                return True
    return False


def fetch_via_rss(category: str, geo: str, timeframe: str, limit: int) -> list:
    """Build keyword data from Google Trends RSS trending topics.
    Matches RSS topics to the category, then supplements with predefined
    keywords (with default values) to reach the requested limit."""
    cat_config = CATEGORY_MAP[category]
    gcat = int(cat_config["gcat"])
    predefined = cat_config["keywords"][:limit]
    topics = fetch_google_trends_rss()
    if not topics:
        return []

    # Match RSS topics to this category
    matched = [t for t in topics if _match_topic_to_category(t["title"], category)]

    # If no matches, skip RSS for this category — return empty so the
    # orchestrator falls through to signals.json / static defaults.
    # (Assigning unrelated trending topics to a category produces low-quality
    # articles downstream.)
    if not matched:
        logger.info(
            f"[{category}] RSS had {len(topics)} topics but 0 matched; "
            f"deferring to next fallback"
        )
        return []

    results = []
    used_keywords = set()
    for topic in matched[:limit]:
        traffic = topic["traffic"]
        kw = topic["title"]
        used_keywords.add(kw.lower())
        results.append({
            "keyword": kw,
            "category": category,
            "google_category_id": gcat,
            "geo": geo or "US",
            "timeframe": timeframe,
            "interest_values": [traffic],
            "avg_interest": traffic,
            "peak_interest": traffic,
            "trend_direction": "rising",
            "data_points": 1,
            "related_queries": {"rising": [], "top": []},
            "source": "google_trends_rss",
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        })

    # Supplement with predefined keywords (static defaults) to reach limit
    for kw in predefined:
        if len(results) >= limit:
            break
        if kw.lower() in used_keywords:
            continue
        results.append({
            "keyword": kw,
            "category": category,
            "google_category_id": gcat,
            "geo": geo or "global",
            "timeframe": timeframe,
            "interest_values": [50],
            "avg_interest": 50,
            "peak_interest": 50,
            "trend_direction": "stable",
            "data_points": 1,
            "related_queries": {"rising": [], "top": []},
            "source": "google_trends_rss",
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        })

    return results


# ── Fallback 2: signals.json ─────────────────────────────────────────────────

def fetch_via_signals(category: str, geo: str, timeframe: str, limit: int) -> list:
    """Build keyword data from data/signals.json."""
    cat_config = CATEGORY_MAP[category]
    gcat = int(cat_config["gcat"])

    if not SIGNALS_FILE.exists():
        return []

    try:
        with open(SIGNALS_FILE, "r", encoding="utf-8") as f:
            signals_data = json.load(f)
        signals = signals_data.get("signals", [])
    except Exception as e:
        logger.warning(f"signals.json read failed: {e}")
        return []

    # Match signals to category by tag or keywords
    matched = []
    for sig in signals:
        tag = (sig.get("tag") or "").lower()
        sig_kws = [k.lower() for k in sig.get("keywords", [])]
        if tag == category or any(category in kw for kw in sig_kws):
            matched.append(sig)

    # If no matches, use all signals
    if not matched:
        matched = signals

    strength_map = {"strong": 80, "medium": 60, "weak": 40}
    results = []
    for sig in matched[:limit]:
        title = sig.get("title", "")
        keywords_list = sig.get("keywords", [])
        keyword = title or (keywords_list[0] if keywords_list else "unknown")
        strength = strength_map.get(
            (sig.get("strength") or "medium").lower(), 60
        )
        trend_val = (sig.get("trend") or "").lower()
        trend_dir = "rising" if "up" in trend_val or "hot" in trend_val else "stable"

        results.append({
            "keyword": keyword,
            "category": category,
            "google_category_id": gcat,
            "geo": geo or "global",
            "timeframe": timeframe,
            "interest_values": [strength],
            "avg_interest": strength,
            "peak_interest": strength,
            "trend_direction": trend_dir,
            "data_points": 1,
            "related_queries": {"rising": [], "top": []},
            "source": "signals_fallback",
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        })
    return results


# ── Fallback 3: static defaults ──────────────────────────────────────────────

def fetch_via_static(category: str, geo: str, timeframe: str, limit: int) -> list:
    """Build keyword data with static default values from CATEGORY_MAP."""
    cat_config = CATEGORY_MAP[category]
    keywords = cat_config["keywords"][:limit]
    gcat = int(cat_config["gcat"])

    results = []
    for kw in keywords:
        results.append({
            "keyword": kw,
            "category": category,
            "google_category_id": gcat,
            "geo": geo or "global",
            "timeframe": timeframe,
            "interest_values": [50],
            "avg_interest": 50,
            "peak_interest": 50,
            "trend_direction": "stable",
            "data_points": 1,
            "related_queries": {"rising": [], "top": []},
            "source": "static_fallback",
            "fetched_at": datetime.now(timezone.utc).isoformat(),
        })
    return results


# ── Orchestrator with fallback chain ─────────────────────────────────────────

def fetch_category_data(category: str, geo: str, timeframe: str, limit: int) -> tuple:
    """Fetch trend data with automatic fallback.
    Returns (data_list, source_string).
    """
    # 1. Try pytrends
    try:
        data = fetch_via_pytrends(category, geo, timeframe, limit)
        logger.info(f"[{category}] pytrends succeeded: {len(data)} keywords")
        return data, "google_trends"
    except Exception as e:
        logger.warning(f"[{category}] pytrends failed ({e}), falling back to RSS")

    # 2. Try Google Trends RSS
    data = fetch_via_rss(category, geo, timeframe, limit)
    if data:
        logger.info(f"[{category}] RSS fallback succeeded: {len(data)} keywords")
        return data, "google_trends_rss"
    logger.warning(f"[{category}] RSS fallback empty, trying signals.json")

    # 3. Try signals.json
    data = fetch_via_signals(category, geo, timeframe, limit)
    if data:
        logger.info(f"[{category}] signals fallback succeeded: {len(data)} keywords")
        return data, "signals_fallback"
    logger.warning(f"[{category}] signals fallback empty, using static defaults")

    # 4. Static defaults (always succeeds)
    data = fetch_via_static(category, geo, timeframe, limit)
    logger.info(f"[{category}] static fallback: {len(data)} keywords")
    return data, "static_fallback"


def save_results(data: list, category: str, source: str) -> Path:
    """Save results to JSON file."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"{category}_{datetime.now().strftime('%Y%m%d')}.json"
    filepath = OUTPUT_DIR / filename

    output = {
        "category": category,
        "fetch_date": datetime.now(timezone.utc).isoformat(),
        "total_keywords": len(data),
        "source": source,
        "data": data,
    }

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    logger.info(f"Saved {len(data)} keywords to {filepath}")
    return filepath


# ── CLI Entry Point ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Fetch trending data from Google Trends (with fallback)"
    )
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
    logger.info(
        f"Starting trend fetch: category={args.category}, "
        f"geo={args.geo or 'global'}, timeframe={timeframe}"
    )

    if args.all_categories:
        all_results = {}
        fallback_used = False
        for cat in CATEGORY_MAP:
            logger.info(f"=== Processing category: {cat} ===")
            try:
                data, source = fetch_category_data(
                    cat, args.geo, timeframe, args.limit
                )
                filepath = save_results(data, cat, source)
                all_results[cat] = {
                    "file": str(filepath),
                    "keywords": len(data),
                    "source": source,
                }
                if source != "google_trends":
                    fallback_used = True
                # Pause between categories
                time.sleep(5)
            except Exception as e:
                logger.error(f"Unexpected error for '{cat}': {e}")
                all_results[cat] = {"error": str(e)}

        logger.info(f"\n=== Summary ===")
        for cat, result in all_results.items():
            if "error" in result:
                logger.info(f"  {cat}: FAILED - {result['error']}")
            else:
                logger.info(
                    f"  {cat}: {result['keywords']} keywords "
                    f"({result['source']}) -> {result['file']}"
                )

        if fallback_used:
            logger.info(
                "Note: Fallback data sources were used for some categories. "
                "Articles will still be generated but trend curves may be limited."
            )
    else:
        data, source = fetch_category_data(
            args.category, args.geo, timeframe, args.limit
        )
        if data:
            filepath = save_results(data, args.category, source)
            logger.info(
                f"Done! {len(data)} keywords (source: {source}) "
                f"saved to {filepath}"
            )
        else:
            logger.error("No data fetched. Check errors above.")
            sys.exit(1)


if __name__ == "__main__":
    main()
