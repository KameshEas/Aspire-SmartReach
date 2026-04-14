"use client";

import React, { useMemo, useState } from "react";
import ToneSelector from "@/components/ui/ToneSelector";
import PlatformSelector from "@/components/ui/PlatformSelector";
import { getBestSendTime } from "@/components/utils/bestSendTime";
import FollowUpScheduler from "@/components/scheduler/FollowUpScheduler";

interface Props {
  response: string;
  onUse?: (text: string) => void;
  onSend?: (text: string) => void;
  onSave?: (text: string) => void;
  onCopy?: (text: string) => void;
}

export default function AIResponseBox({ response, onUse, onSend, onSave, onCopy }: Props) {
  const [tone, setTone] = useState<string | undefined>(undefined);
  const [platform, setPlatform] = useState<string | undefined>(undefined);
  const [schedulingOpen, setSchedulingOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const messages = useMemo(() => {
    try {
      const c = JSON.parse(localStorage.getItem('conversations') || '[]');
      return Array.isArray(c) ? c.flatMap((x: any) => (x.messages || [])) : [];
    } catch (e) {
      return [];
    }
  }, []);

  const bestTime = useMemo(() => getBestSendTime(messages), [messages]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
      onCopy?.(response);
    } catch (e) { }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm text-slate-200 whitespace-pre-wrap">{response}</div>
          <div className="mt-3 flex items-center gap-3">
            <ToneSelector value={tone} onChange={setTone} />
            <PlatformSelector value={platform} onChange={setPlatform} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button onClick={() => onUse?.(response)} className="px-3 py-2 bg-slate-700 rounded">Use</button>
          <button onClick={() => onSend?.(response)} className="px-3 py-2 bg-indigo-600 text-white rounded">Send</button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-400">Suggested send time: <span className="text-slate-200">{bestTime.label}</span></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSchedulingOpen(true)} className="px-3 py-1 bg-slate-700 rounded text-sm">Schedule follow-up</button>
          <button onClick={handleCopy} className="px-3 py-1 bg-slate-700 rounded text-sm">{copied ? 'Copied' : 'Copy'}</button>
          <button onClick={() => onSave?.(response)} className="px-3 py-1 bg-slate-700 rounded text-sm">Save</button>
        </div>
      </div>

      {schedulingOpen ? (
        <div className="mt-3">
          <FollowUpScheduler text={response} onSchedule={() => setSchedulingOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
