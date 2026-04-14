"use client";

import React from "react";

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  options?: string[];
}

export default function PlatformSelector({ value, onChange, options = ['Email', 'LinkedIn', 'WhatsApp'] }: Props) {
  return (
    <div className="inline-flex bg-slate-900 rounded p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange?.(o)}
          className={`px-3 py-1 text-sm rounded ${value === o ? 'bg-emerald-600 text-white' : 'text-slate-200'}`}>
          {o}
        </button>
      ))}
    </div>
  );
}
