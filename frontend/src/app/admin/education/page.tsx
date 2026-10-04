"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { api, adminApi, type Education } from "@/lib/api";

export default function AdminEducation() {
  const [items, setItems] = useState<Education[]>([]);
  const [editing, setEditing] = useState<Partial<Education> | null>(null);

  const load = () => { api.getEducation().then(setItems); };
  useEffect(load, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) { await adminApi.updateEducation(editing.id, editing); }
      else { await adminApi.createEducation(editing); }
      setEditing(null); load();
    } catch (err) { alert(err instanceof Error ? err.message : "Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete?")) return;
    await adminApi.deleteEducation(id); load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Education</h1>
        <button onClick={() => setEditing({ degree: "", institution: "", startYear: "", order: 0, current: false })} className="btn btn-primary">
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm">{item.degree}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{item.institution} • {item.startYear}–{item.endYear || "Present"}</p>
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
              <h2 className="text-lg font-bold">{editing.id ? "Edit" : "Add"} Education</h2>
              <button onClick={() => setEditing(null)}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Degree</label><input value={editing.degree || ""} onChange={(e) => setEditing({ ...editing, degree: e.target.value })} className="input" /></div>
              <div><label className="block text-sm font-medium mb-1">Institution</label><input value={editing.institution || ""} onChange={(e) => setEditing({ ...editing, institution: e.target.value })} className="input" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Start Year</label><input value={editing.startYear || ""} onChange={(e) => setEditing({ ...editing, startYear: e.target.value })} className="input" /></div>
                <div><label className="block text-sm font-medium mb-1">End Year</label><input value={editing.endYear || ""} onChange={(e) => setEditing({ ...editing, endYear: e.target.value })} className="input" placeholder="Leave empty if current" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Grade</label><input value={editing.grade || ""} onChange={(e) => setEditing({ ...editing, grade: e.target.value })} className="input" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input" rows={3} /></div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editing.current || false} onChange={(e) => setEditing({ ...editing, current: e.target.checked })} className="w-4 h-4 accent-[var(--color-brand)]" /><span className="text-sm">Currently enrolled</span></label>
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
