"use client";

import React from "react";

interface Props {
  label: string;
  value: number | string;
  delta?: number;
  hint?: string;
}

export default function StatsCard({ label, value, delta, hint }: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <div className="text-2xl font-semibold">{value}</div>
        {typeof delta === 'number' ? (
          <div className={`text-sm ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</div>
        ) : null}
      </div>
      {hint ? <div className="mt-2 text-xs text-slate-400">{hint}</div> : null}
    </div>
  );
}
