import sys, json
from pytrends.request import TrendReq

py = TrendReq(hl="en-US", tz=360)
cmd = sys.argv[1] if len(sys.argv) > 1 else "daily"
geo = sys.argv[2] if len(sys.argv) > 2 else "US"

if cmd == "daily":
    try:
        df = py.trending_searches(pn=geo)
        trends = df.head(20).values.flatten().tolist()
        json.dump(trends, sys.stdout)
    except Exception as e:
        json.dump({"error": str(e)}, sys.stdout)
elif cmd == "interest":
    kw = sys.argv[3:] if len(sys.argv) > 3 else []
    t = sys.argv[4] if len(sys.argv) > 4 else "now 7-d"
    try:
        py.build_payload(kw_list=kw, timeframe=t, geo=geo)
        df = py.interest_over_time()
        result = {}
        for k in kw:
            if k in df.columns:
                result[k] = [{"date": str(idx.date()), "value": int(row[k])} for idx, row in df.iterrows()]
        json.dump(result, sys.stdout)
    except Exception as e:
        json.dump({"error": str(e)}, sys.stdout)
