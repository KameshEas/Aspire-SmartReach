"use client";

export default function MetricsPanel() {
  // No mock metric data here; show an empty state prompting backend connection.
  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">Total Conversions</h4>
      <div className="flex items-end gap-3">
        <h3 className="text-4xl font-bold">—</h3>
        <span className="text-sm text-emerald-400">—</span>
      </div>
      <p className="text-xs text-slate-400 mt-2">Connect your backend to display metrics here.</p>
    </div>
  );
}
