"use client";

import React, { useEffect, useRef, useState } from "react";
import VariationsGrid, { Variant as VariationType } from "./VariationsGrid";
import Modal from "../ui/Modal";

const POWER_WORDS = ["exclusive", "limited", "proven", "guaranteed", "special", "now", "join", "save", "free", "priority", "best"];

function highlightParts(text: string) {
  const parts: Array<{ text: string; isPower?: boolean }> = [];
  const regex = /\w+|\s+|[^\s\w]+/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text))) {
    const token = m[0];
    const clean = token.trim().toLowerCase();
    if (clean && POWER_WORDS.includes(clean)) {
      parts.push({ text: token, isPower: true });
    } else {
      parts.push({ text: token });
    }
  }
  return parts;
}

export default function GenerateMessage() {
  const [platform, setPlatform] = useState("LinkedIn");
  const [tone, setTone] = useState("Neutral");
  const [experience, setExperience] = useState("");
  const [lengthOpt, setLengthOpt] = useState<"short"|"medium"|"long">("medium");
  const [goal, setGoal] = useState("");

  const [targetText, setTargetText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState(false);
  const typingRef = useRef<number | null>(null);
  const [variants, setVariants] = useState<VariationType[]>([]);
  const [showVariations, setShowVariations] = useState(false);

  useEffect(() => {
    const onSelect = (e: Event) => {
      try {
        // @ts-ignore
        const v = e?.detail;
        if (v && v.text) {
          setTargetText(v.text);
          setDisplayText(v.text);
          setGenerating(false);
          setSaved(true);
          setTimeout(() => setSaved(false), 1400);
        }
      } catch (err) {
        // ignore
      }
    };

    window.addEventListener('variations:select', onSelect as EventListener);

    return () => {
      if (typingRef.current) window.clearTimeout(typingRef.current);
      window.removeEventListener('variations:select', onSelect as EventListener);
    };
  }, []);

  const buildMessage = () => {
    const baseGoal = goal || "share something that could help you";
    let body = "";
    if (platform === "LinkedIn") {
      body = `Hi there,\n\nI'm reaching out because ${baseGoal}.`;
    } else if (platform === "WhatsApp") {
      body = `Hey! ${baseGoal}.`;
    } else {
      body = `Hello,\n\nI hope you're well. ${baseGoal}.`;
    }

    if (experience) {
      body += ` I have ${experience} experience that may be relevant.`;
    }

    if (lengthOpt === "short") {
      body = body.split(".")[0] + ".";
    } else if (lengthOpt === "long") {
      body += "\n\nIf you're open, I'd love to arrange a quick call to discuss further and show how this could work for you.";
    }

    // Tone adjustments
    if (tone === "Polite") body = `Would you be open to a brief chat?\n\n${body}`;
    if (tone === "Aggressive") body = `This is a high priority — ${body}`;
    if (tone === "Friendly") body = `Hi! Hope you're doing great :)\n\n${body}`;

    return body;
  };

  const typeText = (out: string) => {
    if (typingRef.current) {
      window.clearTimeout(typingRef.current);
      typingRef.current = null;
    }
    setSaved(false);
    setTargetText(out);
    setDisplayText("");
    setGenerating(true);
    let i = 0;

    const step = () => {
      i += 1;
      setDisplayText(out.slice(0, i));
      if (i >= out.length) {
        setGenerating(false);
        typingRef.current = null;
        return;
      }
      const ch = out.charAt(i - 1);
      let delay = 12 + Math.random() * 40;
      if (/[.,!?\n]/.test(ch)) delay += 80 + Math.random() * 120;
      typingRef.current = window.setTimeout(step, delay);
    };

    typingRef.current = window.setTimeout(step, 40 + Math.random() * 60);
  };

  const generate = (opts?: { regenerate?: boolean }) => {
    const out = buildMessage();
    typeText(out);
  };

  const regenerate = () => generate({ regenerate: true });

  const copy = async () => {
    try {
      const text = displayText || targetText;
      if (!text) return;
      await navigator.clipboard.writeText(text);
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
    } catch (e) {
      alert("Copy failed");
    }
  };

  const makePolite = () => {
    const t = (displayText || targetText) || buildMessage();
    typeText(`Would you be open to this?\n\n${t}`);
  };

  const makeAggressive = () => {
    const t = (displayText || targetText) || buildMessage();
    typeText(`This is urgent — ${t}`);
  };

  const save = () => {
    // placeholder: local save simulation
    try {
      const savedList = JSON.parse(localStorage.getItem('saved-messages') || '[]');
      savedList.unshift({ id: Date.now(), text: targetText || displayText, createdAt: new Date().toISOString() });
      localStorage.setItem('saved-messages', JSON.stringify(savedList.slice(0, 20)));
      setSaved(true);
      setTimeout(() => setSaved(false), 1600);
    } catch (e) {
      // ignore
    }
  };

  const powerMatches = (text: string) => {
    const lowered = text.toLowerCase();
    return POWER_WORDS.filter(w => lowered.includes(w));
  };

  const effectiveness = (text: string) => {
    const base = 55;
    const matches = powerMatches(text).length;
    const extra = Math.min(30, matches * 6) + (text.length > 80 ? 10 : 0) + (tone !== 'Neutral' ? 5 : 0);
    return Math.min(95, base + extra);
  };

  const generateVariants = async (count = 3) => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generate-variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, tone, experience, length: lengthOpt, goal, count }),
      });

      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      if (data?.variants && Array.isArray(data.variants)) {
        setVariants(data.variants);
        setShowVariations(true);
      } else {
        // fallback to local generation
        const base = buildMessage();
        const out: VariationType[] = [];
        for (let i = 0; i < count; i++) {
          let text = base;
          if (i === 1) text = `Would you be open to a brief chat?\n\n${base}`;
          else if (i === 2) {
            const pw = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
            text = `${base}\n\nP.S. ${pw} opportunity — let me know.`;
          } else if (i > 2) text = `Hi! Hope you're doing well — ${base}`;
          const pws = Array.from(new Set(powerMatches(text)));
          const eff = effectiveness(text);
          out.push({ id: `v-${Date.now()}-${i}`, label: String.fromCharCode(65 + i), text, platform, tone, length: lengthOpt, effectiveness: Math.round(eff), powerWords: pws });
        }
        setVariants(out);
        setShowVariations(true);
      }
    } catch (err) {
      // fallback local
      const base = buildMessage();
      const out: VariationType[] = [];
      for (let i = 0; i < count; i++) {
        let text = base;
        if (i === 1) text = `Would you be open to a brief chat?\n\n${base}`;
        else if (i === 2) {
          const pw = POWER_WORDS[Math.floor(Math.random() * POWER_WORDS.length)];
          text = `${base}\n\nP.S. ${pw} opportunity — let me know.`;
        } else if (i > 2) text = `Hi! Hope you're doing well — ${base}`;
        const pws = Array.from(new Set(powerMatches(text)));
        const eff = effectiveness(text);
        out.push({ id: `v-${Date.now()}-${i}`, label: String.fromCharCode(65 + i), text, platform, tone, length: lengthOpt, effectiveness: Math.round(eff), powerWords: pws });
      }
      setVariants(out);
      setShowVariations(true);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-400">Dashboard → <span className="text-slate-200 font-medium">Generate</span></div>
        <div className="text-sm text-slate-400">Sidebar: <span className="text-indigo-400 font-medium">Generate Message</span></div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold">Generate New Outreach</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-slate-400">Platform</label>
                <div className="flex gap-2 mt-2">
                  {['LinkedIn','WhatsApp','Email'].map(p => (
                    <button key={p} onClick={() => setPlatform(p)} className={`px-3 py-1 rounded ${platform===p ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <Modal open={showVariations} onClose={() => setShowVariations(false)} title="Variations">
                <div>
                  <VariationsGrid variants={variants} onSelectBest={(v) => {
                    try {
                      setTargetText(v.text);
                      setDisplayText(v.text);
                      setSaved(true);
                      setShowVariations(false);
                      setTimeout(() => setSaved(false), 1400);
                    } catch (err) {
                      // ignore
                    }
                  }} />
                </div>
              </Modal>

              <div>
                <label className="text-sm text-slate-400">Tone</label>
                <select value={tone} onChange={(e) => setTone(e.target.value)} className="w-full mt-2 bg-slate-700 rounded px-3 py-2 text-slate-200">
                  <option>Neutral</option>
                  <option>Polite</option>
                  <option>Friendly</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-slate-400">Experience (optional)</label>
                <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g., 10+ years in sales" className="mt-2 w-full bg-slate-700 rounded px-3 py-2 text-slate-200" />
              </div>

              <div>
                <label className="text-sm text-slate-400">Length</label>
                <div className="flex gap-2 mt-2">
                  {['short','medium','long'].map(l => (
                    <button key={l} onClick={() => setLengthOpt(l as any)} className={`px-3 py-1 rounded ${lengthOpt===l ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {l[0].toUpperCase() + l.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400">Experience preview</label>
                <div className="mt-2 text-sm text-slate-400">{experience || '—'}</div>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400">Goal</label>
              <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Describe who you want to reach out to and why..." className="w-full mt-2 bg-slate-700 rounded p-3 h-40 text-slate-200" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                  <button
                    onClick={() => generate()}
                    disabled={generating}
                    className={`px-4 py-2 rounded font-bold ${generating ? 'bg-indigo-500 opacity-70 cursor-not-allowed' : 'bg-indigo-600 text-white'}`}
                  >
                    {generating ? 'Generating…' : 'Generate'}
                  </button>
                  <button onClick={regenerate} disabled={generating} className={`px-3 py-2 rounded ${generating ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Regenerate</button>
                  <button onClick={makePolite} disabled={generating} className={`px-3 py-2 rounded ${generating ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Make Polite</button>
                  <button onClick={makeAggressive} disabled={generating} className={`px-3 py-2 rounded ${generating ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Make Aggressive</button>
                </div>
              <div className="text-sm text-slate-400">Real-time typing simulation • Effectiveness preview</div>
            </div>
            <div className="mt-3">
              <button onClick={() => generateVariants(3)} className="text-sm text-indigo-400 hover:underline">Show Variations…</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Total Conversions</div>
              <div className="h-2 bg-slate-700 rounded mt-3"><div style={{width:'20%'}} className="h-2 bg-white rounded"></div></div>
              <div className="text-xs text-slate-400 mt-3">Connect your backend to display metrics here.</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Total Conversions</div>
              <div className="h-2 bg-slate-700 rounded mt-3"><div style={{width:'18%'}} className="h-2 bg-white rounded"></div></div>
              <div className="text-xs text-slate-400 mt-3">Connect your backend to display metrics here.</div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Total Conversions</div>
              <div className="h-2 bg-slate-700 rounded mt-3"><div style={{width:'22%'}} className="h-2 bg-white rounded"></div></div>
              <div className="text-xs text-slate-400 mt-3">Connect your backend to display metrics here.</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-md font-bold">Generated Message</h3>
                <div className="text-xs text-slate-400">Effectiveness • <span className="font-bold text-indigo-300">🔥 {effectiveness(targetText || displayText)}%</span></div>
                <div className="mt-2 w-40 h-2 bg-slate-700 rounded overflow-hidden">
                  <div className="h-2 bg-indigo-500 transition-all" style={{ width: `${effectiveness(targetText || displayText)}%` }} />
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={copy} disabled={!displayText && !targetText} className={`px-3 py-1 rounded ${(!displayText && !targetText) ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Copy</button>
                <button onClick={regenerate} disabled={generating} className={`px-3 py-1 rounded ${generating ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Regenerate</button>
                <button onClick={save} disabled={!displayText && !targetText} className={`px-3 py-1 rounded ${(!displayText && !targetText) ? 'bg-slate-700 opacity-60 cursor-not-allowed' : 'bg-slate-700 text-slate-200'}`}>Save</button>
              </div>
            </div>

            <div className="bg-slate-700 rounded p-4 min-h-[180px] text-slate-100 whitespace-pre-wrap leading-relaxed">
              <div aria-live="polite">
                {displayText || (!generating && targetText) ? (
                  <>
                    {highlightParts(displayText || targetText).map((p, i) => (
                      <span key={i} className={p.isPower ? 'text-indigo-300 font-semibold transition-colors duration-150' : ''}>{p.text}</span>
                    ))}
                    {generating && <span className="inline-block w-0.5 h-5 bg-slate-100 ml-1 align-bottom animate-pulse" />}
                  </>
                ) : (
                  <div className="text-slate-400">Click Generate to create a message.</div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 mb-2">Power words</div>
                <div className="flex flex-wrap gap-2">
                  {powerMatches(targetText || displayText).length ? (
                    powerMatches(targetText || displayText).map((p, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 text-indigo-300 rounded text-xs">{p}</span>
                    ))
                  ) : (
                    <div className="text-xs text-slate-400">—</div>
                  )}
                </div>
              </div>
              <div className="text-xs text-slate-400">{saved ? 'Saved ✓' : (generating ? 'Generating…' : '')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
