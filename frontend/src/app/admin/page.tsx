"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Folder,
  Zap,
  MessageSquare,
  Trophy,
  Eye,
  BarChart3,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { adminApi, type AnalyticsData, type Message } from "@/lib/api";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([adminApi.getAnalytics(), adminApi.getMessages()])
      .then(([ana, msgs]) => {
        setAnalytics(ana);
        setMessages(msgs.slice(0, 5));
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const stats = analytics?.overview;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Portfolio overview and analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Projects", value: stats?.totalProjects || 0, icon: Folder, color: "var(--color-brand)" },
          { label: "Skills", value: stats?.totalSkills || 0, icon: Zap, color: "var(--color-accent)" },
          { label: "Messages", value: stats?.totalMessages || 0, icon: MessageSquare, color: "var(--color-success)", badge: stats?.unreadMessages },
          { label: "Achievements", value: stats?.totalAchievements || 0, icon: Trophy, color: "var(--color-warning)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} style={{ color: stat.color }} />
              {stat.badge ? (
                <span className="text-xs font-bold bg-[var(--color-error)] text-white px-2 py-0.5 rounded-full">
                  {stat.badge} new
                </span>
              ) : null}
            </div>
            <p className="text-3xl font-black">{stat.value}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Page Views", value: stats?.totalPageViews || 0, icon: Eye },
          { label: "Project Views", value: stats?.totalProjectViews || 0, icon: BarChart3 },
          { label: "Last 30 Days", value: stats?.recentViews || 0, icon: TrendingUp },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="card flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-[var(--color-surface-alt)]">
              <item.icon size={20} className="text-[var(--color-text-muted)]" />
            </div>
            <div>
              <p className="text-xl font-bold">{item.value.toLocaleString()}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Top Projects</h2>
            <Link href="/admin/projects" className="text-xs text-[var(--color-brand)] hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {analytics?.topProjects && analytics.topProjects.length > 0 ? (
            <div className="space-y-3">
              {analytics.topProjects.map((proj, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] w-5">
                      #{i + 1}
                    </span>
                    <span className="text-sm font-medium">{proj.title}</span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {proj.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">No project views yet</p>
          )}
        </motion.div>

        {/* Recent Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recent Messages</h2>
            <Link href="/admin/messages" className="text-xs text-[var(--color-brand)] hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {messages.length > 0 ? (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      msg.status === "unread" ? "bg-[var(--color-brand)]" : "bg-[var(--color-border)]"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{msg.subject}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {msg.name} • {new Date(msg.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">No messages yet</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
