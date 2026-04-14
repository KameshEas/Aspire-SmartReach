"use client";

import React, { useEffect, useState } from "react";

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState<{ messages_total?: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/services/metrics');
        if (!res.ok) throw new Error('no metrics');
        const data = await res.json();
        if (mounted) setMetrics(data);
      } catch (e) {
        if (mounted) setMetrics(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchMetrics();
    const id = setInterval(fetchMetrics, 15_000);
    return () => { mounted = false; clearInterval(id); };
  }, []);

  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Total Conversions</h4>
      <div className="flex items-end gap-3">
        <h3 className="text-4xl font-bold">{loading ? '…' : (metrics?.messages_total ?? '—')}</h3>
        <span className="text-sm text-emerald-400">{loading ? '' : 'since start'}</span>
      </div>
      <p className="text-xs text-slate-400 mt-2">{metrics ? 'Live metrics from backend' : 'Connect your backend to display metrics here.'}</p>
    </div>
  );
}
