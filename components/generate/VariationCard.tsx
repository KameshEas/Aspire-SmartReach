"use client";

import React from "react";

interface Variant {
  id: string;
  label: string;
  text: string;
  platform?: string;
  tone?: string;
  length?: string;
  effectiveness?: number;
  powerWords?: string[];
}

interface Props {
  variant: Variant;
  selected?: boolean;
  onSelect?: (v: Variant) => void;
  onCopy?: (v: Variant) => void;
  onSave?: (v: Variant) => void;
  onExpand?: (v: Variant) => void;
}

export default function VariationCard({ variant, selected, onSelect, onCopy, onSave, onExpand }: Props) {
  const { label, text, platform, tone, length, effectiveness = 0, powerWords = [] } = variant;

  return (
    <div className={`bg-slate-800 rounded-2xl p-4 shadow-sm transition-transform hover:scale-[1.01] ${selected ? 'ring-2 ring-indigo-500' : ''}`} role="listitem">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm">{label}</div>
          <div>
            <div className="text-sm font-semibold">{platform || 'Unknown'} • {tone}</div>
            <div className="text-xs text-slate-400">{length || 'Medium'}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">{effectiveness}%</div>
          <div className="mt-1 w-20 h-2 bg-slate-700 rounded overflow-hidden">
            <div className="h-2 bg-indigo-500" style={{ width: `${effectiveness}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-3 bg-slate-700 rounded p-3 min-h-[96px] text-slate-100 whitespace-pre-wrap overflow-hidden">
        {text}
      </div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {powerWords.length ? powerWords.map((p, i) => (
          <span key={i} className="px-2 py-1 bg-slate-900 text-indigo-300 rounded text-xs">{p}</span>
        )) : <div className="text-xs text-slate-400">—</div>}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => onCopy?.(variant)} className="px-2 py-1 bg-slate-700 rounded text-xs">Copy</button>
          <button onClick={() => onSave?.(variant)} className="px-2 py-1 bg-slate-700 rounded text-xs">Save</button>
          <button onClick={() => onExpand?.(variant)} className="px-2 py-1 bg-slate-700 rounded text-xs">Expand</button>
        </div>
        <div>
          <button onClick={() => onSelect?.(variant)} className="px-3 py-1 bg-indigo-600 rounded text-sm font-medium">Select Best</button>
        </div>
      </div>
    </div>
  );
}
