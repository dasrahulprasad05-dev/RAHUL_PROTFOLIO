"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, CheckCircle, Archive, Eye } from "lucide-react";
import { adminApi, type Message } from "@/lib/api";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => {
    adminApi.getMessages().then(setMessages);
  };

  useEffect(load, []);

  const handleStatus = async (id: string, status: string) => {
    await adminApi.updateMessage(id, status);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await adminApi.deleteMessage(id);
    setSelected(null);
    load();
  };

  const unread = messages.filter((m) => m.status === "unread").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {messages.length} total • {unread} unread
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto">
          {messages.map((msg) => (
            <motion.button
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => {
                setSelected(msg);
                if (msg.status === "unread") handleStatus(msg.id, "read");
              }}
              className={`card w-full text-left py-3 px-4 ${
                selected?.id === msg.id ? "border-[var(--color-brand)]" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    msg.status === "unread"
                      ? "bg-[var(--color-brand)]"
                      : msg.status === "archived"
                      ? "bg-[var(--color-text-muted)]"
                      : "bg-[var(--color-border)]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{msg.name}</p>
                  <p className="text-xs font-medium truncate">{msg.subject}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Mail size={32} className="mx-auto text-[var(--color-text-muted)] mb-2" />
              <p className="text-sm text-[var(--color-text-muted)]">No messages yet</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="card"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold">{selected.subject}</h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    From <span className="font-medium">{selected.name}</span> ({selected.email})
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleStatus(selected.id, "read")}
                    className="p-2 rounded-lg hover:bg-[var(--color-success)]/10 text-[var(--color-success)]"
                    title="Mark as read"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => handleStatus(selected.id, "archived")}
                    className="p-2 rounded-lg hover:bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                    title="Archive"
                  >
                    <Archive size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="h-px bg-[var(--color-border)] mb-4" />
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </p>
              <div className="mt-6">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="btn btn-primary"
                >
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            </motion.div>
          ) : (
            <div className="card text-center py-20">
              <Eye size={32} className="mx-auto text-[var(--color-text-muted)] mb-2" />
              <p className="text-[var(--color-text-muted)]">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
