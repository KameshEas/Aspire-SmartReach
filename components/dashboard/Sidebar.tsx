"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Send, FileText, MessageSquare, BarChart3, CreditCard, Settings, LogOut, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("sidebar-collapsed") === "true";
    } catch (err) {
      return false;
    }
  });
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    try {
      if (!pathname) return false;
      if (pathname === href) return true;
      return pathname.startsWith(href + "/");
    } catch (err) {
      return false;
    }
  };

  const activeCollapsed = "bg-slate-700 text-white";
  const activeExpanded = "bg-slate-800 text-white font-medium";

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try {
      localStorage.setItem("sidebar-collapsed", String(next));
    } catch (err) {
      /* ignore */
    }
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new CustomEvent("sidebar:toggle", { detail: next }));
      } catch (err) {
        /* ignore */
      }
    }
  };

  // classes for collapsed vs expanded link items
  const baseLinkCollapsed = "group flex items-center justify-center w-12 h-12 rounded-full text-slate-300 hover:bg-slate-800";
  const baseLinkExpanded = "group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800";
  const logoutCollapsed = "group flex items-center justify-center w-12 h-12 rounded-full text-red-400 hover:bg-slate-800";
  const logoutExpanded = "group flex items-center gap-3 px-4 py-3 text-red-400 rounded-xl hover:bg-slate-800 flex-1";

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch (err) {
      // ignore
    }
    // navigate to login page
    router.push("/login");
  };

  return (
    <aside style={{ willChange: 'width' }} className={`fixed left-0 top-0 h-full flex flex-col ${collapsed ? "p-3" : "p-4"} ${collapsed ? "w-20 rounded-tr-none rounded-br-none" : "w-64 rounded-tr-xl rounded-br-xl"} border-r border-slate-800 bg-slate-900 text-white z-50 transition-all duration-300 ease-in-out overflow-hidden`}>
      <div className={`flex items-center gap-3 mb-6 px-2 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M13 2L3 14h9l-1 8L21 10h-9l1-8z" fill="currentColor" /></svg>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'}`}>
          <h1 className="text-xl font-bold tracking-tighter">Aspire</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">SmartReach</p>
        </div>
      </div>

      <nav className={`flex-1 flex flex-col gap-1 ${collapsed ? "items-center" : ""}`}>
        <Link
          href="/dashboard"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/dashboard') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/dashboard') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/dashboard') && !collapsed ? 'page' : undefined}
        >
          <Home className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Dashboard</span>
        </Link>

        <Link
          href="/generate-message"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/generate-message') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/generate-message') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/generate-message') && !collapsed ? 'page' : undefined}
        >
          <Send className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Generate Message</span>
        </Link>

        <Link
          href="/templates"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/templates') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/templates') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/templates') && !collapsed ? 'page' : undefined}
        >
          <FileText className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Templates</span>
        </Link>

        <Link
          href="/conversations"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/conversations') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/conversations') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/conversations') && !collapsed ? 'page' : undefined}
        >
          <MessageSquare className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Conversations</span>
        </Link>

        <Link
          href="/analytics"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/analytics') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/analytics') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/analytics') && !collapsed ? 'page' : undefined}
        >
          <BarChart3 className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Analytics</span>
        </Link>

        <div className="my-4 border-t border-slate-700 w-full" />

        <Link
          href="/billing"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/billing') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/billing') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/billing') && !collapsed ? 'page' : undefined}
        >
          <CreditCard className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Billing</span>
        </Link>

        <Link
          href="/settings"
          className={`${collapsed ? baseLinkCollapsed + (isActive('/settings') ? ' ' + activeCollapsed : '') : baseLinkExpanded + (isActive('/settings') ? ' ' + activeExpanded : '')}`}
          aria-current={isActive('/settings') && !collapsed ? 'page' : undefined}
        >
          <Settings className="h-5 w-5 transition-transform duration-200 transform group-hover:scale-110 group-hover:text-white motion-reduce:transform-none" />
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[140px] opacity-100 ml-2'}`}>Settings</span>
        </Link>
      </nav>

      <div className="mt-auto pt-4 w-full">
        <div className={`flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
          <button type="button" onClick={handleLogout} className={`${collapsed ? logoutCollapsed : logoutExpanded}`}>
            <LogOut className="h-4 w-4 transition-transform duration-200 transform group-hover:scale-110" />
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${collapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-[120px] opacity-100 ml-2'}`}>Logout</span>
          </button>

          <button type="button" onClick={toggle} aria-expanded={!collapsed} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200">
            <ChevronLeft className={`h-4 w-4 transition-transform duration-200 transform ${collapsed ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>
    </aside>
  );
}
