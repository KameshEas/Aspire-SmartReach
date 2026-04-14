"use client";

import React, { useEffect, useMemo, useState } from "react";
import TemplateCard, { Template } from "@/components/templates/TemplateCard";
import CreateTemplateForm from "@/components/templates/CreateTemplateForm";
import Modal from "@/components/ui/Modal";

const CATEGORIES = ["All", "Job", "Freelance", "Sales"];

export default function Page() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('templates') || '[]';
      const parsed = JSON.parse(raw);
      setTemplates(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setTemplates([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('templates', JSON.stringify(templates));
    } catch (e) {
      // ignore
    }
  }, [templates]);

  const filtered = useMemo(() => {
    if (category === 'All') return templates;
    return templates.filter(t => t.category === category);
  }, [templates, category]);

  const topPerforming = useMemo(() => {
    if (!templates.length) return null;
    return templates.reduce((best, t) => (!best || (t.effectiveness || 0) > (best.effectiveness || 0) ? t : best), templates[0]);
  }, [templates]);

  const trending = useMemo(() => {
    return templates.filter(t => (t.usageCount || 0) > 3).slice(0, 3);
  }, [templates]);

  const handleCreate = (t: Template) => {
    setTemplates(s => [t, ...s]);
    setShowCreate(false);
  };

  const handleUse = (t: Template) => {
    try {
      // dispatch event that GenerateMessage listens for
      window.dispatchEvent(new CustomEvent('variations:select', { detail: { text: t.content } }));
    } catch (e) {
      // ignore
    }
  };

  const handleCopy = async (t: Template) => {
    try { await navigator.clipboard.writeText(t.content); } catch (e) { /* ignore */ }
  };

  const handleSave = (t: Template) => {
    try {
      const savedList = JSON.parse(localStorage.getItem('saved-messages') || '[]');
      savedList.unshift({ id: Date.now(), text: t.content, title: t.title, createdAt: new Date().toISOString() });
      localStorage.setItem('saved-messages', JSON.stringify(savedList.slice(0, 50)));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Templates</h1>
          <p className="mt-2 text-sm text-slate-400">Create and reuse outreach templates. Save top performers and trending templates here.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded ${category === c ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-200'}`}>{c}</button>
            ))}
          </div>
          <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-indigo-600 text-white rounded">+ Create Template</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-800 rounded-2xl p-4">
            <div className="text-sm text-slate-400">Trending Templates</div>
            <div className="mt-3 space-y-2">
              {trending.length ? trending.map(t => (
                <div key={t.id} className="text-sm text-slate-200">{t.title}</div>
              )) : <div className="text-xs text-slate-400">No trending templates yet</div>}
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-4">
            <div className="text-sm text-slate-400">Top Performing</div>
            <div className="mt-3">
              {topPerforming ? (
                <div>
                  <div className="text-sm font-semibold">{topPerforming.title}</div>
                  <div className="text-xs text-slate-400">{topPerforming.effectiveness}% effectiveness</div>
                </div>
              ) : <div className="text-xs text-slate-400">No templates yet</div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.length ? filtered.map(t => (
              <TemplateCard key={t.id} template={t} onUse={handleUse} onCopy={handleCopy} onSave={handleSave} />
            )) : (
              <div className="col-span-full bg-slate-800 rounded-2xl p-6 text-slate-400">No templates in this category — create one to get started.</div>
            )}
          </div>
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Template">
        <CreateTemplateForm onCreate={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}
