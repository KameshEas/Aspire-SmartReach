"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "true";
    } catch (err) {
      return false;
    }
  });

  useEffect(() => {
    const handler = (e: any) => setSidebarCollapsed(Boolean(e?.detail));
    window.addEventListener("sidebar:toggle", handler);
    return () => window.removeEventListener("sidebar:toggle", handler);
  }, []);

  return (
    <>
      <Sidebar />
      <main
        style={{ marginLeft: sidebarCollapsed ? 80 : 256, transition: "margin-left 300ms ease-in-out" }}
        className="p-8 min-h-screen bg-slate-900 text-slate-100"
      >
        {children}
      </main>
    </>
  );
}
