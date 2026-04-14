"use client";

export default function Conversations() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Recent Conversations</h3>
        <button className="text-indigo-400 text-sm">View all Activity</button>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-700 p-4 rounded-xl"> 
          <p className="text-sm text-slate-200 font-bold">No conversations yet</p>
          <p className="text-xs text-slate-400">Connect your backend to surface messages and conversations.</p>
        </div>
      </div>
    </div>
  );
}
