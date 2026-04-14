"use client";

import React, { useEffect, useState } from "react";
import VariationCard from "./VariationCard";

export interface Variant {
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
  variants: Variant[];
  onSelectBest?: (v: Variant) => void;
}

export default function VariationsGrid({ variants: initial = [], onSelectBest }: Props) {
  const [variants, setVariants] = useState<Variant[]>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Variant | null>(null);

  useEffect(() => setVariants(initial), [initial]);

  const handleSelect = (v: Variant) => {
    setSelectedId(v.id);
    try {
      localStorage.setItem(`selected-variant-${v.id}`, JSON.stringify(v));
    } catch (e) {
      // ignore
    }
    onSelectBest?.(v);
  };

  const handleCopy = async (v: Variant) => {
    try {
      await navigator.clipboard.writeText(v.text);
    } catch (e) {
      // ignore
    }
  };

  const handleSave = (v: Variant) => {
    try {
      const savedList = JSON.parse(localStorage.getItem('saved-messages') || '[]');
      savedList.unshift({ id: Date.now(), text: v.text, createdAt: new Date().toISOString() });
      localStorage.setItem('saved-messages', JSON.stringify(savedList.slice(0, 50)));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map(v => (
          <VariationCard
            key={v.id}
            variant={v}
            selected={v.id === selectedId}
            onSelect={handleSelect}
            onCopy={handleCopy}
            onSave={handleSave}
            onExpand={(vv) => setExpanded(vv)}
          />
        ))}
      </div>

      {expanded && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-60">
          <div className="bg-slate-800 rounded-2xl p-6 w-[min(900px,95%)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">Variant {expanded.label}</h3>
                <div className="text-xs text-slate-400">Full message preview</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard.writeText(expanded.text); }} className="px-3 py-1 bg-slate-700 rounded">Copy</button>
                <button onClick={() => { handleSave(expanded); }} className="px-3 py-1 bg-slate-700 rounded">Save</button>
                <button onClick={() => setExpanded(null)} className="px-3 py-1 bg-slate-700 rounded">Close</button>
              </div>
            </div>

            <div className="mt-4 bg-slate-700 rounded p-4 text-slate-100 whitespace-pre-wrap max-h-[60vh] overflow-auto">
              {expanded.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
