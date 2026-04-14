"use client";

import React, { useEffect, useState } from "react";
import UserCard from "@/components/dashboard/UserCard";
import MetricsPanel from "@/components/dashboard/MetricsPanel";
import Conversations from "@/components/dashboard/Conversations";

type User = { id: string; name: string; email?: string; plan?: string; avatar?: string } | null;

export default function DashboardClient() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) return;
        const data = await res.json();
        if (mounted) setUser(data);
      } catch (e) {
        // swallow; show empty state
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight">Generate New Outreach</h3>
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="text-sm text-slate-400">Loading user…</div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold">{user.name}</p>
                <p className="text-[10px] text-slate-400">{user.plan}</p>
              </div>
              <img className="w-10 h-10 rounded-full border-2 border-indigo-500" src={user.avatar ?? ''} alt={user?.name ?? 'avatar'} />
            </div>
          ) : (
            <div className="text-sm text-slate-400">No user</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="relative">
              <h4 className="text-sm font-bold mb-2">Generate New Outreach</h4>
              <textarea
                placeholder="Describe who you want to reach out to and why..."
                className="w-full bg-slate-700 border-none focus:ring-0 text-slate-200 placeholder-slate-400 resize-none h-28 p-3 rounded"
              />
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-indigo-600 rounded text-white font-bold">Analyze &amp; Write</button>
                </div>
                <div className="text-xs text-slate-400">Connect backend to generate messages</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <MetricsPanel />
            <MetricsPanel />
            <MetricsPanel />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <UserCard user={user} />
          <Conversations />
        </div>
      </div>
    </div>
  );
}
