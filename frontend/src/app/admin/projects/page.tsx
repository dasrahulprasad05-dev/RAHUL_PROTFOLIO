"use client";

import { Github } from "@/components/Icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Edit2, Trash2, ExternalLink, X
} from "lucide-react";
import { api, adminApi, type ProjectWithTech } from "@/lib/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState<ProjectWithTech[]>([]);
  const [editing, setEditing] = useState<Partial<ProjectWithTech> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.getProjects().then(setProjects).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async () => {
    if (!editing) return;
    try {
      if (editing.id) {
        await adminApi.updateProject(editing.id, editing);
      } else {
        await adminApi.createProject(editing);
      }
      setEditing(null);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await adminApi.deleteProject(id);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{projects.length} projects</p>
        </div>
        <button
          onClick={() =>
            setEditing({
              title: "",
              slug: "",
              shortDescription: "",
              content: "",
              category: "AI/ML",
              status: "completed",
              featured: false,
              order: 0,
            })
          }
          className="btn btn-primary"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((proj, i) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono status-${proj.status}`}>
                  {proj.status.replace("-", " ").toUpperCase()}
                </span>
                {proj.featured && (
                  <span className="text-[10px] font-mono font-bold text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-1.5 py-0.5 rounded">
                    FEATURED
                  </span>
                )}
                <span className="badge text-[10px]">{proj.category}</span>
              </div>
              <h3 className="font-bold truncate">{proj.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] truncate">
                {proj.shortDescription}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {proj.liveUrl && (
                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
                  <ExternalLink size={16} />
                </a>
              )}
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]">
                  <Github size={16} />
                </a>
              )}
              <button
                onClick={() => setEditing(proj)}
                className="p-2 rounded-lg hover:bg-[var(--color-brand-glow)] text-[var(--color-brand)]"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(proj.id)}
                className="p-2 rounded-lg hover:bg-[var(--color-error)]/10 text-[var(--color-error)]"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto p-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface-elevated)] rounded-2xl border border-[var(--color-border)] w-full max-w-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">
                {editing.id ? "Edit Project" : "New Project"}
              </h2>
              <button onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-[var(--color-surface-alt)]">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" placeholder="auto-generated" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Short Description</label>
                <input value={editing.shortDescription || ""} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} className="input" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="input">
                    <option value="AI/ML">AI/ML</option>
                    <option value="Data">Data</option>
                    <option value="Web">Web</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={editing.status || ""} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="input">
                    <option value="live">Live</option>
                    <option value="in-development">In Development</option>
                    <option value="completed">Completed</option>
                    <option value="experiment">Experiment</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub URL</label>
                  <input value={editing.githubUrl || ""} onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })} className="input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Live URL</label>
                  <input value={editing.liveUrl || ""} onChange={(e) => setEditing({ ...editing, liveUrl: e.target.value })} className="input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Problem Statement</label>
                <textarea value={editing.problemStatement || ""} onChange={(e) => setEditing({ ...editing, problemStatement: e.target.value })} className="input" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Solution</label>
                <textarea value={editing.solution || ""} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} className="input" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Results</label>
                <textarea value={editing.results || ""} onChange={(e) => setEditing({ ...editing, results: e.target.value })} className="input" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                <textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="input font-mono text-sm" rows={6} />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]" />
                <span className="text-sm font-medium">Featured project</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[var(--color-border)]">
              <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleSave} className="btn btn-primary">Save Project</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
