"use client";

import React, { useEffect, useMemo, useState } from "react";
import ConversationList, { Conversation as ConvType } from "@/components/conversations/ConversationList";
import MessageThread from "@/components/conversations/MessageThread";

type Message = { id: string; text: string; sender: 'me' | 'them' | 'ai'; createdAt: string };
type Conversation = { id: string; title: string; messages: Message[]; unread?: number; updatedAt?: string };

const SEED: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Alice — Hiring follow-up',
    messages: [
      { id: 'm1', sender: 'them', text: "Hi, I'm reaching out about the open role you posted. Are you still hiring?", createdAt: new Date().toISOString() },
      { id: 'm2', sender: 'me', text: "Thanks for reaching out — yes, we are. Can you send over your resume?", createdAt: new Date().toISOString() }
    ],
    unread: 0,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'conv-2',
    title: 'Bob — Quick sync',
    messages: [
      { id: 'm3', sender: 'them', text: "Can we sync tomorrow about the Q2 roadmap?", createdAt: new Date().toISOString() }
    ],
    unread: 1,
    updatedAt: new Date().toISOString(),
  }
];

export default function Page() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('conversations');
      if (raw) {
        const parsed = JSON.parse(raw);
        setConversations(Array.isArray(parsed) ? parsed : SEED);
      } else {
        setConversations(SEED);
        localStorage.setItem('conversations', JSON.stringify(SEED));
      }
    } catch (e) {
      setConversations(SEED);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    } catch (e) {
      // ignore
    }
  }, [conversations]);

  useEffect(() => {
    const preferred = localStorage.getItem('selected-conversation');
    if (preferred && conversations.find(c => c.id === preferred)) {
      setSelectedId(preferred);
      return;
    }
    if (conversations.length) setSelectedId(conversations[0].id);
  }, [conversations]);

  const selectedConversation = useMemo(() => conversations.find(c => c.id === selectedId) || null, [conversations, selectedId]);

  const createConversation = () => {
    const now = Date.now();
    const conv: Conversation = { id: `conv-${now}`, title: 'New conversation', messages: [{ id: `m-${now}`, sender: 'them', text: 'New conversation started', createdAt: new Date().toISOString() }], unread: 0, updatedAt: new Date().toISOString() };
    setConversations((s) => [conv, ...s]);
    setSelectedId(conv.id);
    localStorage.setItem('selected-conversation', conv.id);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    try { localStorage.setItem('selected-conversation', id); } catch (e) { }
  };

  const handleSend = (conversationId: string, text: string) => {
    const now = new Date().toISOString();
    const tempId = `m-${Date.now()}`;
    // optimistic local update
    setConversations(prev => prev.map(c => c.id === conversationId ? ({ ...c, messages: [...c.messages, { id: tempId, sender: 'me', text, createdAt: now }], updatedAt: now, unread: 0 }) : c));

    // send to backend (fire-and-forget, update when response arrives)
    (async () => {
      try {
        const conv = conversations.find(c => c.id === conversationId);
        const subject = conv?.title || 'Conversation message';
        const res = await fetch('/api/services/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ subject, body: text }),
        });
        if (res.ok) {
          const data = await res.json();
          const stored = data?.data || data;
          setConversations(prev => prev.map(c => {
            if (c.id !== conversationId) return c;
            const msgs = c.messages.map(m => m.id === tempId ? { id: stored.id || m.id, sender: 'me', text: stored.body || m.text, createdAt: stored.created_at || m.createdAt } : m);
            return { ...c, messages: msgs, updatedAt: stored.created_at || c.updatedAt, unread: 0 };
          }));
        }
      } catch (e) {
        // network error — keep optimistic message
      }
    })();

    // Simulate a short auto-reply for demo purposes
    setTimeout(() => {
      const reply = { id: `m-${Date.now()}`, sender: 'them', text: 'Thanks — I will follow up with next steps.', createdAt: new Date().toISOString() };
      setConversations(prev => prev.map(c => c.id === conversationId ? ({ ...c, messages: [...c.messages, reply], updatedAt: new Date().toISOString(), unread: 0 }) : c));
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex gap-6">
        <ConversationList conversations={conversations} selectedId={selectedId ?? undefined} onSelect={handleSelect} onCreate={createConversation} />

        <div className="flex-1">
          <div className="bg-transparent">
            <MessageThread conversation={selectedConversation} onSend={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
