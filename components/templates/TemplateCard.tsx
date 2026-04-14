"use client";

import React from "react";

export type Template = {
  id: string;
  title: string;
  category: "Job" | "Freelance" | "Sales" | string;
  content: string;
  tags?: string[];
  effectiveness?: number;
  usageCount?: number;
  createdAt?: string;
  trending?: boolean;
};

interface Props {
  template: Template;
  onUse?: (t: Template) => void;
  onCopy?: (t: Template) => void;
  onSave?: (t: Template) => void;
  onEdit?: (t: Template) => void;
}

export default function TemplateCard({ template, onUse, onCopy, onSave, onEdit }: Props) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 shadow-sm flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-400">{template.category}</div>
          <h3 className="text-lg font-semibold mt-1">{template.title}</h3>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">{template.effectiveness ?? 0}%</div>
          {template.trending ? <div className="text-xs text-amber-400 mt-1">🔥 Trending</div> : null}
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-200 whitespace-pre-wrap truncate max-h-24 overflow-hidden">{template.content}</div>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {(template.tags || []).length ? (template.tags || []).map((t, i) => (
          <span key={i} className="px-2 py-1 bg-slate-900 text-indigo-300 rounded text-xs">{t}</span>
        )) : <span className="text-xs text-slate-400">No tags</span>}
      </div>

      <div className="mt-4 mt-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button onClick={() => onUse?.(template)} className="px-3 py-1 bg-indigo-600 rounded text-sm">Use</button>
          <button onClick={() => onCopy?.(template)} className="px-3 py-1 bg-slate-700 rounded text-sm">Copy</button>
          <button onClick={() => onSave?.(template)} className="px-3 py-1 bg-slate-700 rounded text-sm">Save</button>
        </div>
        <div>
          <button onClick={() => onEdit?.(template)} className="px-2 py-1 bg-slate-700 rounded text-xs">Edit</button>
        </div>
      </div>
    </div>
  );
}
