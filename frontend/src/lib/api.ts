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

export const api = {
  // Projects
  getProjects: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params)}` : "";
    return fetchAPI<ProjectWithTech[]>(`/projects${query}`);
  },
  getProject: (slug: string) => fetchAPI<ProjectWithTech>(`/projects/${slug}`),

  // Skills
  getSkills: () => fetchAPI<{ skills: Skill[]; grouped: Record<string, Skill[]> }>("/skills"),

  // Education
  getEducation: () => fetchAPI<Education[]>("/education"),

  // Experience
  getExperience: () => fetchAPI<Experience[]>("/experience"),

  // Achievements
  getAchievements: () => fetchAPI<Achievement[]>("/achievements"),

  // Timeline
  getTimeline: () =>
    fetchAPI<{ events: TimelineEvent[]; grouped: Record<string, TimelineEvent[]> }>("/timeline"),

  // Build Log
  getBuildLogs: () => fetchAPI<BuildLog[]>("/build-log"),

  // Social Links
  getSocialLinks: () => fetchAPI<SocialLink[]>("/social-links"),

  // Settings
  getSettings: () => fetchAPI<Record<string, string>>("/settings"),

  // Contact
  sendMessage: (data: { name: string; email: string; subject: string; message: string }) =>
    fetchAPI("/messages", { method: "POST", body: JSON.stringify(data) }),

  // Analytics
  trackPageView: (page: string) =>
    fetchAPI("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ page, referrer: typeof document !== "undefined" ? document.referrer : "" }),
    }).catch(() => {}), // Silent fail for analytics
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
};

// ─── Types ────────────────────────────────────────────────

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
