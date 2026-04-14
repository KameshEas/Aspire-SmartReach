"use client";

import React from "react";

type DataPoint = { date: string; count: number };

interface Props {
  data?: DataPoint[];
  label?: string;
}

export default function UsageChart({ data = [], label = "Messages" }: Props) {
  const max = Math.max(...data.map((d) => d.count), 1);

  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-4">
        <div className="text-sm text-slate-400">{label}</div>
        <div className="mt-3 text-xs text-slate-400">No activity yet</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-400">{label} (last {data.length} days)</div>
        <div className="text-xs text-slate-400">{data.reduce((s, d) => s + d.count, 0)} total</div>
      </div>

      <div className="h-36 flex items-end gap-3">
        {data.map((d) => (
          <div key={d.date} className="flex-1 flex flex-col items-center">
            <div className="w-full h-full flex items-end">
              <div
                title={`${d.count} messages`}
                className="w-full bg-indigo-600 rounded-t"
                style={{ height: `${(d.count / max) * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-2">
              {new Date(d.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
