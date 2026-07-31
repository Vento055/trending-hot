"use client";

import { useState } from "react";
import { Download, Check } from "lucide-react";

interface DataCardDownloadProps {
  filename: string;
  data: string;
}

/**
 * 数据下载卡片（Client Component）
 * 将传入的 Markdown 字符串生成 Blob 并触发浏览器下载。
 */
export function DataCardDownload({ filename, data }: DataCardDownloadProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const blob = new Blob([data], { type: "text/markdown;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(objectUrl);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ backgroundColor: "#0a2a1f", borderRadius: "16px" }}
    >
      <h2
        className="text-xl font-extrabold sm:text-2xl"
        style={{ color: "#fbfdf8" }}
      >
        Download Data Summary
      </h2>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#9ba89e" }}>
        Get a Markdown summary of every data point and source on this page for
        offline reference and reuse.
      </p>
      <button
        type="button"
        onClick={handleDownload}
        className="mt-5 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: "#7ddc3f", color: "#0a2a1f" }}
      >
        {downloaded ? (
          <Check className="h-4 w-4" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {downloaded ? "Downloaded!" : "Download .md"}
      </button>
    </div>
  );
}
