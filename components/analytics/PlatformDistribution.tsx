"use client";

import React from "react";

interface Item {
  label: string;
  value: number;
}

interface Props {
  data?: Item[];
}

const PALETTE = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-sky-500",
];

export default function PlatformDistribution({ data = [] }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0) || 0;

  if (total === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-4">
        <div className="text-sm text-slate-400">Platform Distribution</div>
        <div className="mt-3 text-xs text-slate-400">No platform data available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="text-sm text-slate-400">Platform Distribution</div>

      <div className="mt-3 h-3 rounded overflow-hidden bg-slate-900 flex">
        {data.map((d, i) => {
          const pct = Math.round((d.value / total) * 100);
          const color = PALETTE[i % PALETTE.length];
          return <div key={d.label} className={`${color}`} style={{ width: `${pct}%` }} title={`${d.label}: ${pct}%`} />;
        })}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2">
        {data.map((d, i) => {
          const pct = Math.round((d.value / total) * 100);
          const color = PALETTE[i % PALETTE.length];
          return (
            <div key={d.label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded ${color}`} />
                <div className="text-slate-200">{d.label}</div>
              </div>
              <div className="text-xs text-slate-400">{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
