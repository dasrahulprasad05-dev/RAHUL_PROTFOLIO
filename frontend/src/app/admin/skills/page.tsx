"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { api, adminApi, type Skill } from "@/lib/api";

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [grouped, setGrouped] = useState<Record<string, Skill[]>>({});
  const [editing, setEditing] = useState<Partial<Skill> | null>(null);

  const load = () => {
    api.getSkills().then((data) => {
      setSkills(data.skills);
      setGrouped(data.grouped);
    });
  };

  useEffect(load, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await adminApi.updateSkill(editing.id, editing);
      } else {
        await adminApi.createSkill(editing);
      }
      setEditing(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await adminApi.deleteSkill(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{skills.length} skills</p>
        </div>
        <button
          onClick={() => setEditing({ name: "", category: "AI/ML", level: "practicing", order: 0 })}
          className="btn btn-primary"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-sm font-mono font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
            {category} ({items.length})
          </h2>
          <div className="space-y-2">
            {items.map((skill) => (
              <div key={skill.id} className="card flex items-center justify-between py-3 px-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <span className="badge text-[10px]">{skill.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setEditing(skill)} className="p-1.5 rounded-lg hover:bg-[var(--color-brand-glow)] text-[var(--color-brand)]">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="p-1.5 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--color-surface-elevated)] rounded-2xl border border-[var(--color-border)] w-full max-w-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">{editing.id ? "Edit Skill" : "New Skill"}</h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-alt)]">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="input" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input">
                  <option value="AI/ML">AI/ML</option>
                  <option value="Data">Data</option>
                  <option value="Development">Development</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select value={editing.level || ""} onChange={(e) => setEditing({ ...editing, level: e.target.value })} className="input">
                  <option value="learning">Learning</option>
                  <option value="practicing">Practicing</option>
                  <option value="proficient">Proficient</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Order</label>
                <input type="number" value={editing.order || 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) })} className="input" />
              </div>
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
