"use client";

import React, { useEffect, useRef, useState } from "react";
import MessageCard from "../ui/MessageCard";
import Modal from "../ui/Modal";
import ShareCard from "../ui/ShareCard";

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
  conversation?: Conversation | null;
  onSend: (conversationId: string, text: string) => void;
}

export default function MessageThread({ conversation, onSend }: Props) {
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [showShare, setShowShare] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [conversation?.messages?.length]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!conversation) return;
    const text = input.trim();
    if (!text) return;
    onSend(conversation.id, text);
    setInput("");
    setSuggestion(null);
  };

  function generateSuggestion() {
    if (!conversation) return;
    setLoadingSuggestion(true);
    setSuggestion(null);
    // lightweight deterministic suggestion generator (no external API)
    setTimeout(() => {
      const last = conversation.messages && conversation.messages.length ? conversation.messages[conversation.messages.length - 1] : null;
      const lastText = last?.text || "";
      const snippet = lastText.split(/\s+/).slice(0, 16).join(" ");
      const suggestionText = `Thanks for the update about "${snippet}". Quick reply: I'd love to help — can you share a bit more about your timeline and priorities?`;
      setSuggestion(suggestionText);
      setLoadingSuggestion(false);
    }, 600);
  }

  if (!conversation) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-slate-400">Select a conversation to view messages.</div>
    );
  }

  return (
    <div className="flex flex-col h-[72vh]">
      <div className="mb-3">
        <h3 className="text-lg font-semibold">{conversation.title}</h3>
        <div className="text-xs text-slate-400">{conversation.messages.length} messages • Last updated {conversation.updatedAt ? new Date(conversation.updatedAt).toLocaleString() : ''}</div>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto space-y-4 p-4 bg-slate-900 rounded-2xl">
        {conversation.messages.map((m) => (
          <MessageCard
            key={m.id}
            text={m.text}
            sender={m.sender}
            time={new Date(m.createdAt).toLocaleString()}
            onCopy={(t) => { try { navigator.clipboard.writeText(t); } catch (e) {} }}
            onSave={(t) => {
              try {
                const savedList = JSON.parse(localStorage.getItem('saved-messages') || '[]');
                savedList.unshift({ id: Date.now(), text: t, createdAt: new Date().toISOString() });
                localStorage.setItem('saved-messages', JSON.stringify(savedList.slice(0, 50)));
              } catch (e) {
                // ignore
              }
            }}
            onShare={(t) => { setShareMessage(t); setShowShare(true); }}
          />
        ))}
      </div>

      <div className="mt-4">
        {suggestion ? (
          <div className="bg-slate-800 rounded p-3 mb-3">
            <div className="text-sm text-slate-200 mb-2">AI suggestion</div>
            <div className="text-sm text-slate-100 whitespace-pre-wrap">{suggestion}</div>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => setInput(suggestion)} className="px-3 py-1 bg-slate-700 rounded">Use</button>
              <button onClick={() => { if (conversation) { onSend(conversation.id, suggestion); setSuggestion(null); } }} className="px-3 py-1 bg-indigo-600 rounded text-white">Send suggestion</button>
              <button onClick={() => setSuggestion(null)} className="px-3 py-1 bg-slate-700 rounded">Dismiss</button>
            </div>
          </div>
        ) : null}

        <form onSubmit={handleSend} className="flex items-start gap-3">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3} placeholder="Write a reply..." className="flex-1 bg-slate-800 rounded p-3 text-slate-200" />
          <div className="flex flex-col items-stretch gap-2">
            <button type="button" onClick={generateSuggestion} className="px-3 py-2 bg-slate-700 rounded text-sm">{loadingSuggestion ? 'Thinking…' : 'Follow-up suggestion'}</button>
            <button type="submit" className="px-3 py-2 bg-indigo-600 rounded text-white">Send</button>
          </div>
        </form>
      </div>

      <Modal open={showShare} onClose={() => setShowShare(false)} title="Share Message">
        {shareMessage ? <ShareCard message={shareMessage} /> : <div className="text-slate-400">No message</div>}
      </Modal>
    </div>
  );
}
