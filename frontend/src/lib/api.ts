const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Public API ───────────────────────────────────────────

import {
  fallbackProjects,
  fallbackSkills,
  fallbackEducation,
  fallbackAchievements,
  fallbackTimeline,
  fallbackBuildLogs,
  fallbackSettings,
} from "./fallbackData";

export const api = {
  // Projects
  getProjects: async (params?: Record<string, string>): Promise<ProjectWithTech[]> => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    try {
      const data = await fetchAPI<ProjectWithTech[]>(`/projects${query}`);
      return data && data.length > 0 ? data : (params?.featured === "true" ? fallbackProjects.filter((p) => p.featured) : fallbackProjects);
    } catch {
      if (params?.featured === "true") {
        return fallbackProjects.filter((p) => p.featured);
      }
      return fallbackProjects;
    }
  },
  getProject: async (slug: string): Promise<ProjectWithTech> => {
    try {
      return await fetchAPI<ProjectWithTech>(`/projects/${slug}`);
    } catch {
      const match = fallbackProjects.find((p) => p.slug === slug);
      if (match) return match;
      throw new Error("Project not found");
    }
  },

  // Skills
  getSkills: async (): Promise<{ skills: Skill[]; grouped: Record<string, Skill[]> }> => {
    try {
      const data = await fetchAPI<{ skills: Skill[]; grouped: Record<string, Skill[]> }>("/skills");
      return data?.skills?.length ? data : fallbackSkills;
    } catch {
      return fallbackSkills;
    }
  },

  // Education
  getEducation: async (): Promise<Education[]> => {
    try {
      const data = await fetchAPI<Education[]>("/education");
      return data?.length ? data : fallbackEducation;
    } catch {
      return fallbackEducation;
    }
  },

  // Experience
  getExperience: async (): Promise<Experience[]> => {
    try {
      return await fetchAPI<Experience[]>("/experience");
    } catch {
      return [];
    }
  },

  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    try {
      const data = await fetchAPI<Achievement[]>("/achievements");
      return data?.length ? data : fallbackAchievements;
    } catch {
      return fallbackAchievements;
    }
  },

  // Timeline
  getTimeline: async (): Promise<{ events: TimelineEvent[]; grouped: Record<string, TimelineEvent[]> }> => {
    try {
      const data = await fetchAPI<{ events: TimelineEvent[]; grouped: Record<string, TimelineEvent[]> }>("/timeline");
      return data?.events?.length ? data : fallbackTimeline;
    } catch {
      return fallbackTimeline;
    }
  },

  // Build Log
  getBuildLogs: async (): Promise<BuildLog[]> => {
    try {
      const data = await fetchAPI<BuildLog[]>("/build-log");
      return data?.length ? data : fallbackBuildLogs;
    } catch {
      return fallbackBuildLogs;
    }
  },

  // Social Links
  getSocialLinks: async (): Promise<SocialLink[]> => {
    try {
      return await fetchAPI<SocialLink[]>("/social-links");
    } catch {
      return [
        { id: "sl-1", platform: "github", url: "https://github.com/dasrahulprasad05-dev", icon: "Github", order: 1 },
        { id: "sl-2", platform: "linkedin", url: "https://linkedin.com/in/rahul-prasad-das", icon: "Linkedin", order: 2 },
        { id: "sl-3", platform: "instagram", url: "https://www.instagram.com/the___cyber__rahul/", icon: "Instagram", order: 3 },
        { id: "sl-4", platform: "twitter", url: "https://x.com", icon: "Twitter", order: 4 },
        { id: "sl-5", platform: "email", url: "mailto:dasrahulprasad05@gmail.com", icon: "Mail", order: 5 },
      ];
    }
  },

  // Settings
  getSettings: async (): Promise<Record<string, string>> => {
    try {
      const data = await fetchAPI<Record<string, string>>("/settings");
      return Object.keys(data || {}).length ? data : fallbackSettings;
    } catch {
      return fallbackSettings;
    }
  },

  // Contact
  sendMessage: (data: { name: string; email: string; subject: string; message: string }) =>
    fetchAPI("/messages", { method: "POST", body: JSON.stringify(data) }),

  // Analytics
  trackPageView: (page: string) =>
    fetchAPI("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ page, referrer: typeof document !== "undefined" ? document.referrer : "" }),
    }).catch(() => {}), // Silent fail for analytics

  // Chat
  sendChatMessageStream: async ({
    messages,
    onToken,
    onDone,
    onError,
  }: {
    messages: { role: "user" | "assistant"; content: string }[];
    onToken: (token: string) => void;
    onDone: (sources: ChatSource[]) => void;
    onError: (error: string) => void;
  }): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({ error: "Failed to connect to chat assistant." }));
        if (res.status === 429) {
          onError("Rate limit exceeded. You can send up to 20 messages per hour. Please try again later.");
        } else {
          onError(errorJson.error || "The AI assistant is temporarily unavailable. Please try again shortly.");
        }
        return;
      }

      if (!res.body) {
        onError("No response stream available.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            const dataStr = trimmed.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.token) {
                onToken(data.token);
              }
              if (data.done) {
                onDone(data.sources || []);
              }
              if (data.error) {
                onError(data.error);
              }
            } catch {
              // Ignore partial SSE JSON chunks
            }
          }
        }
      }
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Network error connecting to AI assistant.");
    }
  },
};

// ─── Admin API ────────────────────────────────────────────

export const adminApi = {
  // Auth
  login: (email: string, password: string) =>
    fetchAPI<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => fetchAPI("/auth/logout", { method: "POST" }),
  me: () => fetchAPI<{ user: User }>("/auth/me"),

  // Projects
  createProject: (data: Partial<Project>) =>
    fetchAPI<ProjectWithTech>("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id: string, data: Partial<Project>) =>
    fetchAPI<ProjectWithTech>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id: string) =>
    fetchAPI(`/projects/${id}`, { method: "DELETE" }),

  // Skills
  createSkill: (data: Partial<Skill>) =>
    fetchAPI<Skill>("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id: string, data: Partial<Skill>) =>
    fetchAPI<Skill>(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id: string) =>
    fetchAPI(`/skills/${id}`, { method: "DELETE" }),

  // Education
  createEducation: (data: Partial<Education>) =>
    fetchAPI<Education>("/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id: string, data: Partial<Education>) =>
    fetchAPI<Education>(`/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id: string) =>
    fetchAPI(`/education/${id}`, { method: "DELETE" }),

  // Achievements
  createAchievement: (data: Partial<Achievement>) =>
    fetchAPI<Achievement>("/achievements", { method: "POST", body: JSON.stringify(data) }),
  updateAchievement: (id: string, data: Partial<Achievement>) =>
    fetchAPI<Achievement>(`/achievements/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteAchievement: (id: string) =>
    fetchAPI(`/achievements/${id}`, { method: "DELETE" }),

  // Messages
  getMessages: () => fetchAPI<Message[]>("/messages"),
  updateMessage: (id: string, status: string) =>
    fetchAPI(`/messages/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
  deleteMessage: (id: string) =>
    fetchAPI(`/messages/${id}`, { method: "DELETE" }),

  // Timeline
  createTimelineEvent: (data: Partial<TimelineEvent>) =>
    fetchAPI<TimelineEvent>("/timeline", { method: "POST", body: JSON.stringify(data) }),
  updateTimelineEvent: (id: string, data: Partial<TimelineEvent>) =>
    fetchAPI<TimelineEvent>(`/timeline/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTimelineEvent: (id: string) =>
    fetchAPI(`/timeline/${id}`, { method: "DELETE" }),

  // Build Log
  getAllBuildLogs: () => fetchAPI<BuildLog[]>("/build-log/all"),
  createBuildLog: (data: Partial<BuildLog>) =>
    fetchAPI<BuildLog>("/build-log", { method: "POST", body: JSON.stringify(data) }),
  updateBuildLog: (id: string, data: Partial<BuildLog>) =>
    fetchAPI<BuildLog>(`/build-log/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBuildLog: (id: string) =>
    fetchAPI(`/build-log/${id}`, { method: "DELETE" }),

  // Settings
  updateSettings: (data: Record<string, string>) =>
    fetchAPI("/settings", { method: "PUT", body: JSON.stringify(data) }),

  // Social Links
  upsertSocialLink: (data: Partial<SocialLink>) =>
    fetchAPI("/social-links", { method: "POST", body: JSON.stringify(data) }),
  deleteSocialLink: (id: string) =>
    fetchAPI(`/social-links/${id}`, { method: "DELETE" }),

  // Analytics
  getAnalytics: () => fetchAPI<AnalyticsData>("/analytics"),

  // Chat Logs
  getChatLogs: (params?: { page?: number; limit?: number; answered?: string }) => {
    const q = new URLSearchParams();
    if (params?.page) q.append("page", String(params.page));
    if (params?.limit) q.append("limit", String(params.limit));
    if (params?.answered && params.answered !== "all") q.append("answered", params.answered);
    const query = q.toString() ? `?${q.toString()}` : "";
    return fetchAPI<ChatLogsResponse>(`/admin/chat-logs${query}`);
  },

  deleteChatLog: (id: string) => {
    return fetchAPI<{ message: string }>(`/admin/chat-logs/${id}`, { method: "DELETE" });
  },
};

// ─── Types ────────────────────────────────────────────────

export interface ChatSource {
  type: "project" | "section" | "link";
  title: string;
  url: string;
}

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
  isStreaming?: boolean;
}

export interface ChatLogItem {
  id: string;
  question: string;
  answer: string;
  sources: ChatSource[];
  answered: boolean;
  createdAt: string;
}

export interface ChatLogsResponse {
  logs: ChatLogItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  category: string;
  status: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  demoUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  order: number;
  problemStatement?: string | null;
  solution?: string | null;
  results?: string | null;
  challenges?: string | null;
  learnings?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Technology {
  id: string;
  name: string;
  icon?: string | null;
}

export interface ProjectWithTech extends Project {
  technologies: Technology[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string | null;
  level: string;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location?: string | null;
  startYear: string;
  endYear?: string | null;
  description?: string | null;
  grade?: string | null;
  current: boolean;
  order: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  description: string;
  type: string;
  current: boolean;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string | null;
  date: string;
  description: string;
  category: string;
  certificateUrl?: string | null;
  imageUrl?: string | null;
  verificationUrl?: string | null;
  order: number;
}

export interface TimelineEvent {
  id: string;
  year: string;
  month?: string | null;
  title: string;
  description: string;
  category: string;
  icon?: string | null;
  order: number;
}

export interface BuildLog {
  id: string;
  date: string;
  title: string;
  content: string;
  tags?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string | null;
  order: number;
}

export interface AnalyticsData {
  overview: {
    totalPageViews: number;
    totalProjectViews: number;
    totalMessages: number;
    unreadMessages: number;
    recentViews: number;
    totalProjects: number;
    totalSkills: number;
    totalAchievements: number;
  };
  topProjects: { title: string; slug: string; views: number }[];
}
