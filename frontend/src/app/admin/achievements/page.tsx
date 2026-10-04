"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { api, adminApi, type Achievement } from "@/lib/api";

const categoryEmojis: Record<string, string> = { hackathon: "🏆", competition: "🥇", certification: "📜", launch: "🚀", academic: "🎓" };

export default function AdminAchievements() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [editing, setEditing] = useState<Partial<Achievement> | null>(null);

  const load = () => { api.getAchievements().then(setItems); };
  useEffect(load, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) { await adminApi.updateAchievement(editing.id, editing); }
      else { await adminApi.createAchievement(editing); }
      setEditing(null); load();
    } catch (err) { alert(err instanceof Error ? err.message : "Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await adminApi.deleteAchievement(id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Achievements</h1>
        <button onClick={() => setEditing({ title: "", date: "", description: "", category: "certification", order: 0 })} className="btn btn-primary">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{categoryEmojis[item.category] || "✨"}</span>
              <div>
                <h3 className="font-bold text-sm">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">{item.organization && `${item.organization} • `}{item.date}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg hover:bg-[var(--color-brand-glow)] text-[var(--color-brand)]"><Edit2 size={14} /></button>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[var(--color-surface-elevated)] rounded-2xl border border-[var(--color-border)] w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing.id ? "Edit" : "Add"} Achievement</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Title</label><input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></div>
              <div><label className="block text-sm font-medium mb-1">Organization</label><input value={editing.organization || ""} onChange={(e) => setEditing({ ...editing, organization: e.target.value })} className="input" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Date</label><input value={editing.date || ""} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className="input" placeholder="e.g., 2025" /></div>
                <div><label className="block text-sm font-medium mb-1">Category</label>
                  <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input">
                    <option value="hackathon">Hackathon</option><option value="competition">Competition</option><option value="certification">Certification</option><option value="launch">Launch</option><option value="academic">Academic</option>
                  </select>
                </div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input" rows={3} /></div>
              <div><label className="block text-sm font-medium mb-1">Verification URL</label><input value={editing.verificationUrl || ""} onChange={(e) => setEditing({ ...editing, verificationUrl: e.target.value })} className="input" /></div>
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
