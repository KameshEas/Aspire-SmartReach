"use client";

import React from "react";

interface Tone {
  tone: string;
  value: number;
}

interface Props {
  data?: Tone[];
}

export default function TonePerformance({ data = [] }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-4">
        <div className="text-sm text-slate-400">Tone Performance</div>
        <div className="mt-3 text-xs text-slate-400">No tone data available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="text-sm text-slate-400 mb-3">Tone Performance</div>
      <div className="space-y-3">
        {data.map((t) => (
          <div key={t.tone}>
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-200">{t.tone}</div>
              <div className="text-xs text-slate-400">{t.value}%</div>
            </div>
            <div className="w-full bg-slate-900 h-3 rounded overflow-hidden mt-1">
              <div className="bg-emerald-500 h-full" style={{ width: `${Math.max(2, t.value)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
