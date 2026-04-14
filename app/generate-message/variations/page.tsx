"use client";

import React from "react";
import VariationsGrid, { Variant } from "../../../components/generate/VariationsGrid";

const mockVariants: Variant[] = [
  { id: 'v-a', label: 'A', text: 'Variant A: (replace with generated text)', platform: 'LinkedIn', tone: 'Neutral', length: 'Medium', effectiveness: 72, powerWords: ['exclusive','proven'] },
  { id: 'v-b', label: 'B', text: 'Variant B: (replace with generated text)', platform: 'LinkedIn', tone: 'Polite', length: 'Short', effectiveness: 68, powerWords: ['save','free'] },
  { id: 'v-c', label: 'C', text: 'Variant C: (replace with generated text)', platform: 'LinkedIn', tone: 'Friendly', length: 'Long', effectiveness: 77, powerWords: ['limited','priority'] },
];

export default function Page() {
  const handleSelectBest = (v: Variant) => {
    try {
      // simple event to notify GenerateMessage or other listeners about selection
      window.dispatchEvent(new CustomEvent('variations:select', { detail: v }));
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Variations</h1>
        <div className="text-sm text-slate-400">Compare generated message variants</div>
      </div>

      <VariationsGrid variants={mockVariants} onSelectBest={handleSelectBest} />
    </div>
  );
}
