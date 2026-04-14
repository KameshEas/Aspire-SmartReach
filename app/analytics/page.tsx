"use client";

import React, { useEffect, useMemo, useState } from "react";
import UsageChart from "@/components/analytics/UsageChart";
import PlatformDistribution from "@/components/analytics/PlatformDistribution";
import TonePerformance from "@/components/analytics/TonePerformance";
import BestPerformingMessages from "@/components/analytics/BestPerformingMessages";
import StatsCard from "@/components/ui/StatsCard";

export default function Page() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [savedMessages, setSavedMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const t = JSON.parse(localStorage.getItem('templates') || '[]');
      const s = JSON.parse(localStorage.getItem('saved-messages') || '[]');
      const c = JSON.parse(localStorage.getItem('conversations') || '[]');
      setTemplates(Array.isArray(t) ? t : []);
      setSavedMessages(Array.isArray(s) ? s : []);
      setConversations(Array.isArray(c) ? c : []);
    } catch (e) {
      setTemplates([]);
      setSavedMessages([]);
      setConversations([]);
    } finally {
      setReady(true);
    }
  }, []);

  const allMessages = useMemo(() => {
    const out: any[] = [];
    (savedMessages || []).forEach((m: any) => out.push({ text: m.text, createdAt: m.createdAt || new Date().toISOString() }));
    (conversations || []).forEach((c: any) => (c.messages || []).forEach((m: any) => out.push({ text: m.text, createdAt: m.createdAt })));
    (templates || []).forEach((t: any) => t.content && out.push({ text: t.content, createdAt: t.createdAt || new Date().toISOString() }));
    return out;
  }, [savedMessages, conversations, templates]);

  const usageData = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (6 - i));
      return d;
    });

    return days.map((d) => {
      const key = d.toISOString().slice(0, 10);
      const count = allMessages.filter((m) => (new Date(m.createdAt).toISOString().slice(0, 10)) === key).length;
      return { date: key, count };
    });
  }, [allMessages]);

  const platformData = useMemo(() => {
    const map: Record<string, number> = {};
    allMessages.forEach((m) => {
      const t = (m.text || "").toLowerCase();
      if (/@/.test(t)) map['Email'] = (map['Email'] || 0) + 1;
      else if (/linkedin|inmail|linkedin.com/.test(t)) map['LinkedIn'] = (map['LinkedIn'] || 0) + 1;
      else map['Other'] = (map['Other'] || 0) + 1;
    });
    if (Object.keys(map).length === 0) return [{ label: 'Email', value: 50 }, { label: 'LinkedIn', value: 30 }, { label: 'Other', value: 20 }];
    return Object.entries(map).map(([label, value]) => ({ label, value }));
  }, [allMessages]);

  const tonesData = useMemo(() => {
    const tones: Record<string, number[]> = {};
    const addTone = (k: string, v: number) => {
      tones[k] = tones[k] || [];
      tones[k].push(v);
    };

    (templates || []).forEach((t: any) => {
      const txt = (t.content || '').toLowerCase();
      const eff = typeof t.effectiveness === 'number' ? t.effectiveness : 60;
      if (/thanks|appreciate|cheers|best/.test(txt)) addTone('Friendly', eff);
      else if (/regards|sincerely|dear/.test(txt)) addTone('Formal', eff);
      else if (/apply|interview|schedule|call|book/.test(txt)) addTone('Assertive', eff);
      else addTone('Neutral', eff);
    });

    if (Object.keys(tones).length === 0) return [{ tone: 'Friendly', value: 72 }, { tone: 'Formal', value: 64 }, { tone: 'Assertive', value: 58 }];
    return Object.entries(tones).map(([tone, arr]) => ({ tone, value: Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) }));
  }, [templates]);

  const topMessages = useMemo(() => {
    const fromTemplates = (templates || []).filter((t: any) => typeof t.effectiveness === 'number').map((t: any) => ({ id: t.id, text: t.content, effectiveness: t.effectiveness }));
    const fromSaved = (savedMessages || []).map((s: any) => ({ id: s.id || `${Math.random()}`, text: s.text, effectiveness: s.effectiveness || 50 }));
    const merged = [...fromTemplates, ...fromSaved];
    merged.sort((a, b) => (b.effectiveness || 0) - (a.effectiveness || 0));
    return merged.slice(0, 5);
  }, [templates, savedMessages]);

  const avgEffectiveness = useMemo(() => {
    const vals = (templates || []).map((t: any) => (typeof t.effectiveness === 'number' ? t.effectiveness : null)).filter(Boolean);
    if (!vals.length) return null;
    return Math.round(vals.reduce((a: number, b: number) => a + b, 0) / vals.length);
  }, [templates]);

  const percentileLabel = useMemo(() => {
    if (avgEffectiveness == null) return '—';
    if (avgEffectiveness >= 85) return 'Top 10%';
    if (avgEffectiveness >= 70) return 'Top 25%';
    return 'Top 50%';
  }, [avgEffectiveness]);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="mt-2 text-sm text-slate-400">Usage, performance, and top messages at a glance.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-slate-400">Performance</div>
            <div className="text-lg font-semibold">{percentileLabel} {percentileLabel === 'Top 10%' ? '🚀' : ''}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <StatsCard label="Messages (7d)" value={usageData.reduce((s,d) => s + d.count, 0)} hint="Recent activity" />
        <StatsCard label="Templates" value={(templates || []).length} hint="Saved templates" />
        <StatsCard label="Saved Messages" value={(savedMessages || []).length} hint="Your saved replies" />
        <StatsCard label="Avg Effectiveness" value={avgEffectiveness ?? '—'} hint="Average across templates" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <UsageChart data={usageData} />
          <PlatformDistribution data={platformData} />
        </div>

        <div className="lg:col-span-1 space-y-4">
          <TonePerformance data={tonesData} />
          <BestPerformingMessages messages={topMessages} />
        </div>
      </div>
    </div>
  );
}
