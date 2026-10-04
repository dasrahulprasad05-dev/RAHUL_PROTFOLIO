"use client";

import { useEffect, useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { api, adminApi } from "@/lib/api";

const settingsFields = [
  { key: "site_title", label: "Site Title", type: "text" },
  { key: "site_tagline", label: "Tagline", type: "text" },
  { key: "site_description", label: "Site Description", type: "textarea" },
  { key: "hero_title", label: "Hero Title", type: "textarea" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
  { key: "currently_building_title", label: "Currently Building", type: "text" },
  { key: "currently_building_description", label: "Building Description", type: "text" },
  { key: "currently_learning", label: "Currently Learning", type: "text" },
  { key: "currently_preparing", label: "Currently Preparing For", type: "text" },
  { key: "current_goal", label: "Current Goal", type: "text" },
  { key: "about_text", label: "About Text", type: "textarea" },
  { key: "resume_url", label: "Resume URL", type: "text" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await adminApi.updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-[var(--color-text-muted)]">Site configuration and content</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
          {saved ? (
            <><CheckCircle size={16} /> Saved!</>
          ) : saving ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </button>
      </div>

      <div className="space-y-5 max-w-2xl">
        {settingsFields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium mb-1.5">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={settings[field.key] || ""}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="input font-mono text-sm"
                rows={field.key === "about_text" ? 6 : 3}
              />
            ) : (
              <input
                type="text"
                value={settings[field.key] || ""}
                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                className="input"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
