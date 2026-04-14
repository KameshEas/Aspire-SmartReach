"use client";

import React from "react";

type User = {
  id: string;
  name: string;
  email?: string;
  plan?: string;
  avatar?: string;
};

export default function UserCard({ user }: { user: User | null }) {
  if (!user) {
    return (
      <div className="bg-slate-800 rounded-2xl p-6">
        <p className="text-sm text-slate-400">No user signed in</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex items-center gap-4">
      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-indigo-500" />
      <div>
        <p className="font-bold">{user.name}</p>
        <p className="text-xs text-slate-400">{user.plan}</p>
        <p className="text-xs text-slate-400">{user.email}</p>
      </div>
    </div>
  );
}
