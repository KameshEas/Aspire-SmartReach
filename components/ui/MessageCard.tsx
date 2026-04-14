"use client";

import React from "react";

interface Props {
  text: string;
  sender?: "me" | "them" | "ai";
  time?: string;
  platform?: string;
  powerWords?: string[];
  onCopy?: (t: string) => void;
  onSave?: (t: string) => void;
  onShare?: (t: string) => void;
}

export default function MessageCard({ text, sender = 'them', time, platform, powerWords = [], onCopy, onSave, onShare }: Props) {
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); onCopy?.(text); } catch (e) { /* ignore */ }
  };

  const handleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved-messages') || '[]');
      saved.unshift({ id: Date.now(), text, createdAt: new Date().toISOString() });
      localStorage.setItem('saved-messages', JSON.stringify(saved.slice(0, 50)));
      onSave?.(text);
    } catch (e) { /* ignore */ }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm text-slate-200 whitespace-pre-wrap">{text}</div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-3">
            <div>{sender === 'me' ? 'You' : sender === 'ai' ? 'AI' : 'Them'}</div>
            {platform ? <div className="px-2 py-0.5 bg-slate-800 rounded text-xs">{platform}</div> : null}
            {time ? <div className="text-xs text-slate-400">{time}</div> : null}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <button onClick={handleCopy} className="px-2 py-1 bg-slate-700 rounded text-xs">Copy</button>
            <button onClick={() => onShare?.(text)} className="px-2 py-1 bg-slate-700 rounded text-xs">Share</button>
            <button onClick={handleSave} className="px-2 py-1 bg-indigo-600 text-white rounded text-xs">Save</button>
          </div>
        </div>
      </div>

      {powerWords.length ? (
        <div className="mt-3 flex gap-2 flex-wrap">
          {powerWords.map((w, i) => (
            <div key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-amber-300">{w}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
