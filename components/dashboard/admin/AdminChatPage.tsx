"use client";

import { useState, useRef, useEffect } from "react";
import { PageHeader, Avatar } from "@/components/dashboard/shared/DashboardUI";
import { MOCK_CHAT_ROOMS, MOCK_CHAT_MESSAGES } from "@/lib/mock-data";
import type { ChatMessage, ChatRoom } from "@/types/dashboard";

function formatTime(dt: string) {
  const d = new Date(dt);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  return isToday
    ? d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function formatTimeFull(dt: string) {
  return new Date(dt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminChatPage() {
  const [rooms] = useState<ChatRoom[]>(MOCK_CHAT_ROOMS);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(
    MOCK_CHAT_ROOMS[0],
  );
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeRoom]);

  const roomMessages = messages.filter((m) => m.roomId === activeRoom?.id);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !activeRoom) return;
    const msg: ChatMessage = {
      id: `m${Date.now()}`,
      roomId: activeRoom.id,
      senderId: "u1",
      senderName: "Admin AnZ Pet Care",
      senderRole: "ADMIN",
      message: input.trim(),
      sentAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Chat Admin"
        subtitle="Kelola semua percakapan dengan customer"
      />

      <div className="flex bg-white rounded-2xl border border-stone-100 overflow-hidden h-[calc(100vh-11rem)]">
        {/* Room List */}
        <aside className="w-72 flex-shrink-0 border-r border-stone-100 flex flex-col">
          <div className="p-4 border-b border-stone-100">
            <input
              placeholder="Cari customer…"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveRoom(room)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors border-b border-stone-50 ${
                  activeRoom?.id === room.id
                    ? "bg-amber-50"
                    : "hover:bg-stone-50"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <Avatar name={room.customerName} size="md" />
                  {room.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {room.unreadCount}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <span
                      className={`text-sm font-semibold truncate ${room.unreadCount > 0 ? "text-stone-900" : "text-stone-700"}`}
                    >
                      {room.customerName}
                    </span>
                    {room.lastMessageAt && (
                      <span className="text-[10px] text-stone-400 flex-shrink-0 ml-1">
                        {formatTime(room.lastMessageAt)}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs truncate ${room.unreadCount > 0 ? "text-stone-700 font-medium" : "text-stone-400"}`}
                  >
                    {room.lastMessage ?? "Belum ada pesan"}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Quick stats */}
          <div className="p-4 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">Total chat aktif</span>
              <span className="font-bold text-stone-800">{rooms.length}</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-stone-500">Belum dibalas</span>
              <span className="font-bold text-amber-600">
                {rooms.filter((r) => r.unreadCount > 0).length}
              </span>
            </div>
          </div>
        </aside>

        {/* Chat area */}
        {activeRoom ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <Avatar name={activeRoom.customerName} />
                <div>
                  <p className="font-bold text-stone-900 text-sm">
                    {activeRoom.customerName}
                  </p>
                  <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
                  📋 Lihat Booking
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold text-stone-600 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors">
                  📞 Telepon
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-stone-50/30">
              {roomMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-stone-400">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-sm">Belum ada pesan di sini</p>
                  </div>
                </div>
              ) : (
                roomMessages.map((msg) => {
                  const isAdmin = msg.senderRole === "ADMIN";
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] flex flex-col gap-1 ${isAdmin ? "items-end" : "items-start"}`}
                      >
                        {!isAdmin && (
                          <span className="text-[10px] text-stone-400 font-medium px-1">
                            {msg.senderName}
                          </span>
                        )}
                        <div
                          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            isAdmin
                              ? "bg-amber-500 text-white rounded-tr-sm"
                              : "bg-white text-stone-800 border border-stone-100 shadow-sm rounded-tl-sm"
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-[10px] text-stone-400 px-1">
                          {formatTimeFull(msg.sentAt)}
                          {isAdmin && (msg.isRead ? " · ✓✓" : " · ✓")}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="px-4 py-3 border-t border-stone-100 flex gap-3 items-center bg-white"
            >
              <button
                type="button"
                className="text-stone-400 hover:text-stone-600 text-xl flex-shrink-0"
              >
                📎
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Balas ke ${activeRoom.customerName}…`}
                className="flex-1 bg-stone-50 border border-stone-100 focus:border-amber-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-200 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Kirim"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-stone-400">
            <div className="text-center">
              <div className="text-5xl mb-3">💬</div>
              <p className="font-semibold">Pilih percakapan</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
