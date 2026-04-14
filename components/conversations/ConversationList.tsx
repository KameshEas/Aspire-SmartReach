"use client";

import React from "react";

export type Message = {
  id: string;
  text: string;
  sender: "me" | "them" | "ai";
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  unread?: number;
  updatedAt?: string;
};

interface Props {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onCreate?: () => void;
}

export default function ConversationList({ conversations, selectedId, onSelect, onCreate }: Props) {
  return (
    <div className="w-[340px] max-w-[36rem]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Conversations</h2>
          <div className="text-xs text-slate-400">Recent chats and message history</div>
        </div>
        <div>
          <button onClick={onCreate} className="px-3 py-1 bg-indigo-600 rounded text-sm">New</button>
        </div>
      </div>

      <div className="space-y-2 overflow-auto max-h-[72vh] pr-2">
        {conversations.length === 0 && (
          <div className="text-sm text-slate-400">No conversations yet — start a new one.</div>
        )}

        {conversations.map((c) => {
          const last = c.messages && c.messages.length ? c.messages[c.messages.length - 1] : null;
          const lastText = last ? last.text : "No messages";
          const updated = c.updatedAt ? new Date(c.updatedAt).toLocaleString() : "";
          const active = selectedId === c.id;

          return (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`p-3 rounded-xl cursor-pointer ${active ? "bg-slate-700" : "bg-slate-900 hover:bg-slate-800"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-medium">{c.title}</div>
                  <div className="text-xs text-slate-400 truncate max-w-[18rem]">{lastText}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">{updated}</div>
                  {c.unread ? <div className="mt-1 text-[11px] bg-rose-500 text-white px-2 py-[2px] rounded">{c.unread}</div> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
