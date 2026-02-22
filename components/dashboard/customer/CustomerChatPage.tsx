"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_CHAT_MESSAGES } from "@/lib/mock-data";
import type { ChatMessage } from "@/types/dashboard";

function formatTime(dt: string) {
  return new Date(dt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function CustomerChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`, roomId: "cr1", senderId: "u3",
      senderName: "Rina Maulida", senderRole: "CUSTOMER",
      message: input.trim(), sentAt: new Date().toISOString(), isRead: false,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-stone-100 rounded-t-2xl px-5 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">🐾</div>
        <div>
          <p className="font-bold text-stone-900 text-sm">Admin KucingKu</p>
          <p className="text-xs text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-stone-50 border-x border-stone-100 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.senderRole === "CUSTOMER";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {!isMe && (
                  <span className="text-[10px] text-stone-400 font-medium px-1">{msg.senderName}</span>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMe
                    ? "bg-amber-500 text-white rounded-tr-sm"
                    : "bg-white text-stone-800 border border-stone-100 rounded-tl-sm shadow-sm"
                }`}>
                  {msg.message}
                </div>
                <span className="text-[10px] text-stone-400 px-1">
                  {formatTime(msg.sentAt)}
                  {isMe && (msg.isRead ? " · ✓✓" : " · ✓")}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border border-stone-100 rounded-b-2xl px-4 py-3 flex gap-3 items-center">
        <button type="button" className="text-stone-400 hover:text-stone-600 text-xl">📎</button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan…"
          className="flex-1 bg-stone-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-100 border border-stone-100 focus:border-amber-300"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-10 h-10 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white rounded-xl flex items-center justify-center transition-colors"
          aria-label="Kirim pesan"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
