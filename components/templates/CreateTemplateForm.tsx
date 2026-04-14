"use client";

import React, { useState } from "react";
import { Template } from "./TemplateCard";

interface Props {
  initial?: Partial<Template>;
  onCreate: (t: Template) => void;
  onCancel?: () => void;
}

export default function CreateTemplateForm({ initial = {}, onCreate, onCancel }: Props) {
  const [title, setTitle] = useState(initial.title || "");
  const [category, setCategory] = useState<Template['category']>(initial.category || 'Job');
  const [tags, setTags] = useState((initial.tags || []).join(", "));
  const [content, setContent] = useState(initial.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagList = tags.split(',').map(s => s.trim()).filter(Boolean);
    const t: Template = {
      id: `tpl-${Date.now()}`,
      title: title || 'Untitled',
      category,
      content,
      tags: tagList,
      effectiveness: Math.min(95, 55 + Math.min(30, tagList.length * 5) + (content.length > 80 ? 10 : 0)),
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };
    onCreate(t);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="text-sm text-slate-400">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-2 bg-slate-700 rounded px-3 py-2 text-slate-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-slate-400">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full mt-2 bg-slate-700 rounded px-3 py-2 text-slate-200">
            <option>Job</option>
            <option>Freelance</option>
            <option>Sales</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400">Tags (comma-separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} className="w-full mt-2 bg-slate-700 rounded px-3 py-2 text-slate-200" />
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-400">Content</label>
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={6} className="w-full mt-2 bg-slate-700 rounded p-3 text-slate-200" />
      </div>

      <div className="flex items-center gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-3 py-2 bg-slate-700 rounded">Cancel</button>
        <button type="submit" className="px-3 py-2 bg-indigo-600 rounded text-white">Create Template</button>
      </div>
    </form>
  );
}
