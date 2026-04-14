"use client";

import React, { useState } from "react";

interface Props {
  text: string;
  defaultWhen?: string; // ISO date-time
  onSchedule?: (reminder: { id: string; text: string; when: string }) => void;
}

export default function FollowUpScheduler({ text, defaultWhen, onSchedule }: Props) {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  now.setHours(10, 0, 0, 0);
  const defaultDate = defaultWhen ? new Date(defaultWhen) : now;

  const [date, setDate] = useState(() => defaultDate.toISOString().slice(0, 10));
  const [time, setTime] = useState(() => defaultDate.toTimeString().slice(0,5));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setSaving(true);
    try {
      const when = new Date(`${date}T${time}`);
      const reminder = { id: `r-${Date.now()}`, text, when: when.toISOString() };
      const list = JSON.parse(localStorage.getItem('followup-reminders') || '[]');
      list.unshift(reminder);
      localStorage.setItem('followup-reminders', JSON.stringify(list.slice(0, 100)));
      onSchedule?.(reminder);
      setMessage('Saved reminder');
      setTimeout(() => setMessage(null), 2000);
    } catch (e) {
      setMessage('Failed to save');
      setTimeout(() => setMessage(null), 2000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded p-3">
      <div className="text-sm text-slate-200 mb-2">Schedule follow-up reminder</div>
      <div className="grid grid-cols-2 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-slate-700 rounded px-2 py-2 text-slate-200" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bg-slate-700 rounded px-2 py-2 text-slate-200" />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button onClick={handleSave} disabled={saving} className="px-3 py-2 bg-indigo-600 text-white rounded">Set reminder</button>
        {message ? <div className="text-sm text-slate-200">{message}</div> : null}
      </div>
    </div>
  );
}
