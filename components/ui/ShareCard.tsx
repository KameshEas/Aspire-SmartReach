"use client";

import React, { useState } from "react";

interface Props {
  message: string;
  author?: string;
  watermark?: string;
  className?: string;
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function ShareCard({ message, author, watermark = "Made with Aspire SmartReach", className = "" }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(message);
      window.open("https://www.linkedin.com/messaging/", "_blank");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      window.open("https://www.linkedin.com/messaging/", "_blank");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // ignore
    }
  };

  const downloadImage = async () => {
    setDownloading(true);
    try {
      const width = 1200;
      const height = 630;
      const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
        `<rect width="100%" height="100%" fill="#0f172a" rx="24"/>` +
        `<foreignObject x="60" y="60" width="${width - 120}" height="${height - 140}">` +
        `<div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #ffffff; font-size: 36px; line-height:1.28; white-space:pre-wrap;">${escapeXml(message)}</div>` +
        `</foreignObject>` +
        `<text x="${width - 40}" y="${height - 24}" font-size="14" fill="#94a3b8" text-anchor="end" font-family="Inter, sans-serif">${escapeXml(watermark)}</text>` +
        `</svg>`;

      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = png;
      a.download = "message.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className={`bg-slate-900 rounded-2xl p-4 ${className}`}>
      <div className="bg-slate-800 rounded-lg p-4 mb-3">
        <div className="text-slate-100 whitespace-pre-wrap">{message}</div>
        {author ? <div className="text-xs text-slate-400 mt-3">— {author}</div> : null}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={handleWhatsApp} className="px-3 py-2 bg-emerald-500 text-white rounded">Send to WhatsApp</button>
        <button onClick={handleLinkedIn} className="px-3 py-2 bg-blue-600 text-white rounded">Open LinkedIn</button>
        <button onClick={handleCopy} className="px-3 py-2 bg-slate-700 text-slate-200 rounded">{copied ? 'Copied' : 'Copy'}</button>
        <button onClick={downloadImage} className="px-3 py-2 bg-slate-700 text-slate-200 rounded">{downloading ? 'Preparing…' : 'Download Image'}</button>
      </div>

      <div className="mt-3 text-xs text-slate-400">Preview watermark: {watermark}</div>
    </div>
  );
}
