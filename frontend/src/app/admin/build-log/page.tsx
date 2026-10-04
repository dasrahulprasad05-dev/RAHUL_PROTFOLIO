"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X, Eye, EyeOff } from "lucide-react";
import { adminApi, type BuildLog } from "@/lib/api";

export default function AdminBuildLog() {
  const [logs, setLogs] = useState<BuildLog[]>([]);
  const [editing, setEditing] = useState<Partial<BuildLog> | null>(null);

  const load = () => { adminApi.getAllBuildLogs().then(setLogs); };
  useEffect(load, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) { await adminApi.updateBuildLog(editing.id, editing); }
      else { await adminApi.createBuildLog(editing); }
      setEditing(null); load();
    } catch (err) { alert(err instanceof Error ? err.message : "Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this log?")) return;
    await adminApi.deleteBuildLog(id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Build Log</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{logs.length} entries</p>
        </div>
        <button onClick={() => setEditing({ title: "", content: "", date: new Date().toISOString(), tags: "", published: true })} className="btn btn-primary">
          <Plus size={16} /> New Entry
        </button>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="card flex items-start justify-between gap-4">
            <div className="flex gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 text-center w-14">
                <div className="text-xl font-black text-[var(--color-brand)]">
                  {new Date(log.date).getDate().toString().padStart(2, "0")}
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                  {new Date(log.date).toLocaleString("en", { month: "short", year: "numeric" })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-sm truncate">{log.title}</h3>
                  {!log.published && (
                    <span className="text-[10px] font-mono text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-1.5 py-0.5 rounded">DRAFT</span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{log.content.replace(/[#*\-✅→✓]/g, "").slice(0, 120)}</p>
                {log.tags && (
                  <div className="flex gap-1 mt-2">
                    {log.tags.split(",").map((t) => <span key={t} className="badge text-[10px]">{t.trim()}</span>)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditing(log)} className="p-1.5 rounded-lg hover:bg-[var(--color-brand-glow)] text-[var(--color-brand)]"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(log.id)} className="p-1.5 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-6 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-surface-elevated)] rounded-2xl border border-[var(--color-border)] w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing.id ? "Edit" : "New"} Build Log Entry</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></div>
              <div><label className="block text-sm font-medium mb-1">Date</label><input type="date" value={editing.date ? new Date(editing.date).toISOString().split("T")[0] : ""} onChange={(e) => setEditing({ ...editing, date: new Date(e.target.value).toISOString() })} className="input" /></div>
              <div><label className="block text-sm font-medium mb-1">Content (Markdown)</label><textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="input font-mono text-sm" rows={10} /></div>
              <div><label className="block text-sm font-medium mb-1">Tags (comma-separated)</label><input value={editing.tags || ""} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} className="input" placeholder="portfolio, backend, api" /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 accent-[var(--color-brand)]" />
                <span className="text-sm font-medium flex items-center gap-1">{editing.published ? <Eye size={14} /> : <EyeOff size={14} />} Published</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary">Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
