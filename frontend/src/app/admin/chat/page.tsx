"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Trash2,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  MessageSquareQuote,
} from "lucide-react";
import { adminApi, type ChatLogItem, type ChatLogsResponse } from "@/lib/api";

export default function AdminChatLogsPage() {
  const [logs, setLogs] = useState<ChatLogItem[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const [filter, setFilter] = useState<"all" | "true" | "false">("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLogs = useCallback(
    async (pageToLoad = pagination.page, filterToApply = filter) => {
      setLoading(true);
      try {
        const res: ChatLogsResponse = await adminApi.getChatLogs({
          page: pageToLoad,
          limit: pagination.limit,
          answered: filterToApply,
        });
        setLogs(res.logs || []);
        setPagination(res.pagination || { total: 0, page: 1, limit: 12, totalPages: 1 });
      } catch (err) {
        console.error("Failed to load chat logs:", err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, pagination.page, filter]
  );

  useEffect(() => {
    fetchLogs(1, filter);
  }, [filter, fetchLogs]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat log?")) return;
    setDeletingId(id);
    try {
      await adminApi.deleteChatLog(id);
      setLogs((prev) => prev.filter((l) => l.id !== id));
      setPagination((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete log");
    } finally {
      setDeletingId(null);
    }
  };

  const answeredCount = logs.filter((l) => l.answered).length;
  const unansweredCount = logs.filter((l) => !l.answered).length;

  return (
    <div className="space-y-6">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
              <Bot size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Chat Logs</h1>
              <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                Review visitor interactions, answer accuracy, and unanswered fallback queries
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => fetchLogs(pagination.page, filter)}
          disabled={loading}
          className="btn btn-secondary text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ─── Filters & Summary ───────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
        <div className="flex items-center gap-1.5 text-xs">
          <Filter size={14} className="text-[var(--color-text-muted)] mr-1" />
          <span className="text-[var(--color-text-muted)] font-medium mr-2">Filter:</span>
          {(
            [
              { id: "all", label: "All Questions" },
              { id: "true", label: "Answered" },
              { id: "false", label: "Unanswered (Fallback)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium text-xs transition-all ${
                filter === tab.id
                  ? "bg-[var(--color-brand)] text-white shadow-sm"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] font-mono">
          <span>Total: <strong className="text-[var(--color-text-primary)]">{pagination.total}</strong></span>
          <span>•</span>
          <span className="text-emerald-500">Answered: <strong>{answeredCount}</strong></span>
          <span>•</span>
          <span className="text-amber-500">Unanswered: <strong>{unansweredCount}</strong></span>
        </div>
      </div>

      {/* ─── Chat Log Cards Grid (grid-cols-1 sm:grid-cols-2) ─────────────── */}
      {loading && logs.length === 0 ? (
        <div className="py-16 text-center text-[var(--color-text-muted)] text-sm">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-[var(--color-brand)]" />
          Loading chat exchanges...
        </div>
      ) : logs.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-[var(--color-border)] p-8 space-y-2">
          <MessageSquareQuote size={32} className="mx-auto text-[var(--color-text-muted)]" />
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
            No chat logs found
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
            {filter === "all"
              ? "Visitors have not asked any questions through the AI widget yet."
              : `No questions match the "${filter === "true" ? "Answered" : "Unanswered"}" filter.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="card flex flex-col justify-between p-4 space-y-3 relative group"
            >
              {/* Card Header: Status & Delete */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {log.answered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={12} />
                      Answered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <HelpCircle size={12} />
                      Fallback Triggered
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                    {new Date(log.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <button
                    onClick={() => handleDelete(log.id)}
                    disabled={deletingId === log.id}
                    title="Delete log"
                    className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Question */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand)] font-mono">
                  Visitor Query
                </span>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                  &ldquo;{log.question}&rdquo;
                </p>
              </div>

              {/* Answer */}
              <div className="space-y-1 bg-[var(--color-surface-alt)]/50 p-3 rounded-xl border border-[var(--color-border)]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-text-muted)] font-mono">
                  AI Response
                </span>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line line-clamp-4 hover:line-clamp-none transition-all cursor-pointer">
                  {log.answer}
                </p>
              </div>

              {/* Sources Returned */}
              {log.sources && log.sources.length > 0 && (
                <div className="pt-1">
                  <span className="text-[10px] text-[var(--color-text-muted)] block mb-1">
                    Sources linked:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {log.sources.map((s, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-brand)] font-mono"
                      >
                        {s.title}
                        <ExternalLink size={9} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── Pagination Controls ─────────────────────────────────────────── */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            Showing Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fetchLogs(pagination.page - 1, filter)}
              disabled={pagination.page <= 1 || loading}
              className="btn btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1 disabled:opacity-40"
            >
              <ChevronLeft size={14} />
              Previous
            </button>
            <button
              onClick={() => fetchLogs(pagination.page + 1, filter)}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="btn btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1 disabled:opacity-40"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
