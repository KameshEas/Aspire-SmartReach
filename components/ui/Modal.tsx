"use client";

import React, { useEffect } from "react";

interface Props {
  open: boolean;
  title?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function Modal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // prevent body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />

      <div role="dialog" aria-modal="true" aria-label={title || "Modal"} className="relative z-50 w-[min(1000px,96%)] max-h-[90vh] overflow-auto bg-slate-800 rounded-2xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-bold">{title}</h3>}
          </div>
          <div>
            <button onClick={onClose} className="px-3 py-1 bg-slate-700 rounded">Close</button>
          </div>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
