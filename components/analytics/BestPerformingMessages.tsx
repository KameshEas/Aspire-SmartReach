"use client";

import React from "react";

interface Msg {
  id: string;
  text: string;
  effectiveness?: number;
}

interface Props {
  messages?: Msg[];
}

export default function BestPerformingMessages({ messages = [] }: Props) {
  const top = messages.slice(0, 5);

  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <div className="text-sm text-slate-400 mb-3">Best Performing Messages</div>

      <div className="space-y-3">
        {top.length === 0 && <div className="text-xs text-slate-400">No messages available</div>}

        {top.map((m) => (
          <div key={m.id} className="p-3 bg-slate-900 rounded">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm text-slate-100 whitespace-pre-wrap">{m.text}</div>
              <div className="text-xs text-slate-400">{m.effectiveness ?? 0}%</div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <button onClick={() => navigator.clipboard?.writeText(m.text)} className="px-2 py-1 bg-slate-700 rounded text-xs">Copy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
