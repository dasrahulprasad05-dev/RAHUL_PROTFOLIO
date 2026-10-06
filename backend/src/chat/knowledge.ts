import prisma from "../config/database.js";

// ─── Interfaces ────────────────────────────────────────────────────────────

export interface PublicProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  shortDescription: string;
  content: string;
  problemStatement: string | null;
  solution: string | null;
  results: string | null;
  challenges: string | null;
  learnings: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
  technologies: string[];
}

export interface StructuredKnowledge {
  about: Record<string, string>;
  skills: Array<{
    id: string;
    name: string;
    category: string;
    level: string;
    order: number;
  }>;
  skillsByCategory: Record<string, Record<string, string[]>>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string | null;
    startYear: string;
    endYear: string | null;
    description: string | null;
    grade: string | null;
    current: boolean;
    order: number;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string | null;
    startDate: string;
    endDate: string | null;
    description: string;
    type: string;
    current: boolean;
    order: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    organization: string | null;
    date: string;
    description: string;
    category: string;
    certificateUrl: string | null;
    order: number;
  }>;
  timeline: Array<{
    id: string;
    year: string;
    month: string | null;
    title: string;
    description: string;
    category: string;
    order: number;
  }>;
  projects: PublicProject[];
  socialLinks: Array<{
    id: string;
    platform: string;
    url: string;
    order: number;
  }>;
  buildLogs: Array<{
    id: string;
    title: string;
    date: Date;
    content: string;
    tags: string | null;
  }>;
}

export interface KnowledgePack {
  structured: StructuredKnowledge;
  plainText: string;
}

// ─── In-Memory Cache (5 Minutes) ───────────────────────────────────────────

let cachedKnowledge: KnowledgePack | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function invalidateKnowledgeCache(): void {
  cachedKnowledge = null;
  cacheTimestamp = 0;
}

// ─── Plain Text Builder ────────────────────────────────────────────────────

function buildPlainText(structured: StructuredKnowledge): string {
  const sections: string[] = [];

  // 1. ABOUT
  const aboutLines: string[] = ["=== ABOUT ==="];
  const settings = structured.about;
  if (settings.site_title) {
    aboutLines.push(`Name: ${settings.site_title}`);
  }
  if (settings.site_tagline) {
    aboutLines.push(`Tagline: ${settings.site_tagline}`);
  }
  if (settings.hero_title || settings.hero_subtitle) {
    aboutLines.push(`Headline: ${[settings.hero_title, settings.hero_subtitle].filter(Boolean).join(" | ").replace(/\n/g, " ")}`);
  }
  if (settings.about_text) {
    aboutLines.push(`Bio: ${settings.about_text}`);
  } else if (settings.site_description) {
    aboutLines.push(`Description: ${settings.site_description}`);
  }
  if (settings.currently_building_title || settings.currently_building_description) {
    aboutLines.push(`Currently Building: ${[settings.currently_building_title, settings.currently_building_description].filter(Boolean).join(" - ")}`);
  }
  if (settings.currently_learning) {
    aboutLines.push(`Currently Learning: ${settings.currently_learning}`);
  }
  if (settings.currently_preparing) {
    aboutLines.push(`Currently Preparing For: ${settings.currently_preparing}`);
  }
  if (settings.current_goal) {
    aboutLines.push(`Current Goal: ${settings.current_goal}`);
  }
  if (settings.contact_email) {
    aboutLines.push(`Contact Email: ${settings.contact_email}`);
  }
  sections.push(aboutLines.join("\n"));

  // 2. SKILLS (grouped by category and level)
  const skillsLines: string[] = ["=== SKILLS ==="];
  const categories = Object.keys(structured.skillsByCategory).sort();
  if (categories.length === 0) {
    skillsLines.push("No skills listed.");
  } else {
    for (const cat of categories) {
      skillsLines.push(`[${cat}]`);
      const levelsMap = structured.skillsByCategory[cat];
      const levelNames = Object.keys(levelsMap);
      for (const lvl of levelNames) {
        const skillList = levelsMap[lvl].join(", ");
        skillsLines.push(`  - ${lvl}: ${skillList}`);
      }
    }
  }
  sections.push(skillsLines.join("\n"));

  // 3. EDUCATION
  const eduLines: string[] = ["=== EDUCATION ==="];
  if (structured.education.length === 0) {
    eduLines.push("No education records listed.");
  } else {
    for (const edu of structured.education) {
      const dates = edu.current ? `${edu.startYear} - Present` : [edu.startYear, edu.endYear].filter(Boolean).join(" - ");
      const loc = edu.location ? ` (${edu.location})` : "";
      const grade = edu.grade ? ` | Grade: ${edu.grade}` : "";
      eduLines.push(`- ${edu.degree} at ${edu.institution}${loc} [${dates}]${grade}`);
      if (edu.description) {
        eduLines.push(`  Description: ${edu.description}`);
      }
    }
  }
  sections.push(eduLines.join("\n"));

  // 4. EXPERIENCE
  const expLines: string[] = ["=== EXPERIENCE ==="];
  if (structured.experience.length === 0) {
    expLines.push("No formal work experience listed (open to engineering & internship opportunities).");
  } else {
    for (const exp of structured.experience) {
      const dates = exp.current ? `${exp.startDate} - Present` : [exp.startDate, exp.endDate].filter(Boolean).join(" - ");
      const loc = exp.location ? ` (${exp.location})` : "";
      expLines.push(`- ${exp.title} at ${exp.company}${loc} [${dates}] (Type: ${exp.type})`);
      if (exp.description) {
        expLines.push(`  Details: ${exp.description}`);
      }
    }
  }
  sections.push(expLines.join("\n"));

  // 5. ACHIEVEMENTS
  const achLines: string[] = ["=== ACHIEVEMENTS ==="];
  if (structured.achievements.length === 0) {
    achLines.push("No achievements listed.");
  } else {
    for (const ach of structured.achievements) {
      const org = ach.organization ? ` - ${ach.organization}` : "";
      achLines.push(`- [${ach.date}] ${ach.title}${org} (Category: ${ach.category})`);
      if (ach.description) {
        achLines.push(`  Details: ${ach.description}`);
      }
    }
  }
  sections.push(achLines.join("\n"));

  // 6. TIMELINE
  const timeLines: string[] = ["=== TIMELINE ==="];
  if (structured.timeline.length === 0) {
    timeLines.push("No timeline events listed.");
  } else {
    for (const item of structured.timeline) {
      const dateLabel = item.month ? `${item.month} ${item.year}` : item.year;
      timeLines.push(`- [${dateLabel}] ${item.title} (${item.category}): ${item.description}`);
    }
  }
  sections.push(timeLines.join("\n"));

  // 7. PROJECTS
  // Format required: title, slug, category, status, tech list, shortDescription, problemStatement, solution, results, githubUrl, liveUrl
  const projLines: string[] = ["=== PROJECTS ==="];
  if (structured.projects.length === 0) {
    projLines.push("No projects listed.");
  } else {
    for (const p of structured.projects) {
      projLines.push(`- Title: ${p.title}`);
      projLines.push(`  Slug: ${p.slug}`);
      projLines.push(`  Category: ${p.category} | Status: ${p.status}`);
      projLines.push(`  Technologies: ${p.technologies.length > 0 ? p.technologies.join(", ") : "None specified"}`);
      projLines.push(`  Short Description: ${p.shortDescription}`);
      if (p.problemStatement) {
        projLines.push(`  Problem Statement: ${p.problemStatement}`);
      }
      if (p.solution) {
        projLines.push(`  Solution: ${p.solution}`);
      }
      if (p.results) {
        projLines.push(`  Results: ${p.results}`);
      }
      if (p.githubUrl) {
        projLines.push(`  GitHub: ${p.githubUrl}`);
      }
      if (p.liveUrl) {
        projLines.push(`  Live: ${p.liveUrl}`);
      }
    }
  }
  sections.push(projLines.join("\n"));

  // 8. LINKS
  const linkLines: string[] = ["=== LINKS ==="];
  if (settings.contact_email) {
    linkLines.push(`- Email: mailto:${settings.contact_email}`);
  }
  if (settings.github_url) {
    linkLines.push(`- GitHub: ${settings.github_url}`);
  }
  if (settings.linkedin_url) {
    linkLines.push(`- LinkedIn: ${settings.linkedin_url}`);
  }
  if (settings.resume_url) {
    linkLines.push(`- Resume: ${settings.resume_url}`);
  }
  for (const s of structured.socialLinks) {
    // Avoid duplicate lines if already listed from settings
    const isDup = linkLines.some((l) => l.toLowerCase().includes(s.url.toLowerCase()));
    if (!isDup) {
      linkLines.push(`- ${s.platform}: ${s.url}`);
    }
  }
  sections.push(linkLines.join("\n"));

  return sections.join("\n\n");
}

// ─── Core Data Fetcher ─────────────────────────────────────────────────────

export async function getKnowledge(): Promise<KnowledgePack> {
  const now = Date.now();
  if (cachedKnowledge && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedKnowledge;
  }

  // Query ONLY public models
  const [
    projectsRaw,
    skillsRaw,
    educationRaw,
    experienceRaw,
    achievementsRaw,
    timelineRaw,
    socialLinksRaw,
    settingsRaw,
    buildLogsRaw,
  ] = await Promise.all([
    prisma.project.findMany({
      include: {
        technologies: {
          include: { technology: true },
        },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.education.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.experience.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.achievement.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.timelineEvent.findMany({
      orderBy: [{ year: "asc" }, { order: "asc" }],
    }),
    prisma.socialLink.findMany({
      orderBy: { order: "asc" },
    }),
    prisma.siteSetting.findMany(),
    prisma.buildLog.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    }),
  ]);

  // Format projects
  const projects: PublicProject[] = projectsRaw.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    status: p.status,
    shortDescription: p.shortDescription,
    content: p.content,
    problemStatement: p.problemStatement,
    solution: p.solution,
    results: p.results,
    challenges: p.challenges,
    learnings: p.learnings,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    demoUrl: p.demoUrl,
    imageUrl: p.imageUrl,
    featured: p.featured,
    order: p.order,
    technologies: p.technologies.map((pt) => pt.technology.name),
  }));

  // Format settings map
  const about: Record<string, string> = {};
  for (const s of settingsRaw) {
    about[s.key] = s.value;
  }

  // Format skills grouped by category and level
  const skillsByCategory: Record<string, Record<string, string[]>> = {};
  for (const s of skillsRaw) {
    const cat = s.category || "General";
    const lvl = s.level || "practicing";
    if (!skillsByCategory[cat]) {
      skillsByCategory[cat] = {};
    }
    if (!skillsByCategory[cat][lvl]) {
      skillsByCategory[cat][lvl] = [];
    }
    skillsByCategory[cat][lvl].push(s.name);
  }

  const structured: StructuredKnowledge = {
    about,
    skills: skillsRaw.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      level: s.level,
      order: s.order,
    })),
    skillsByCategory,
    education: educationRaw.map((e) => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      location: e.location,
      startYear: e.startYear,
      endYear: e.endYear,
      description: e.description,
      grade: e.grade,
      current: e.current,
      order: e.order,
    })),
    experience: experienceRaw.map((ex) => ({
      id: ex.id,
      title: ex.title,
      company: ex.company,
      location: ex.location,
      startDate: ex.startDate,
      endDate: ex.endDate,
      description: ex.description,
      type: ex.type,
      current: ex.current,
      order: ex.order,
    })),
    achievements: achievementsRaw.map((a) => ({
      id: a.id,
      title: a.title,
      organization: a.organization,
      date: a.date,
      description: a.description,
      category: a.category,
      certificateUrl: a.certificateUrl,
      order: a.order,
    })),
    timeline: timelineRaw.map((t) => ({
      id: t.id,
      year: t.year,
      month: t.month,
      title: t.title,
      description: t.description,
      category: t.category,
      order: t.order,
    })),
    projects,
    socialLinks: socialLinksRaw.map((sl) => ({
      id: sl.id,
      platform: sl.platform,
      url: sl.url,
      order: sl.order,
    })),
    buildLogs: buildLogsRaw.map((b) => ({
      id: b.id,
      title: b.title,
      date: b.date,
      content: b.content,
      tags: b.tags,
    })),
  };

  const plainText = buildPlainText(structured);

  cachedKnowledge = {
    structured,
    plainText,
  };
  cacheTimestamp = now;

  return cachedKnowledge;
}

// ─── Project Detail Extractor ──────────────────────────────────────────────

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchesWord(text: string, keyword: string): boolean {
  if (!keyword || keyword.trim().length === 0) return false;
  const escaped = escapeRegex(keyword.trim());
  // Match keyword bounded by non-alphanumeric or start/end
  const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}($|[^a-zA-Z0-9])`, "i");
  return regex.test(text);
}

/**
 * If the question contains a project title, slug, or technology name (case-insensitive),
 * returns that project's full `content` markdown, truncated to ~3000 characters;
 * otherwise returns null.
 */
export async function getProjectDetail(question: string): Promise<string | null> {
  if (!question || typeof question !== "string") {
    return null;
  }

  const q = question.toLowerCase();
  const pack = await getKnowledge();
  const projects = pack.structured.projects;

  // 1. Direct match on project title or slug
  for (const project of projects) {
    const titleMatch = project.title && q.includes(project.title.toLowerCase());
    const slugMatch = project.slug && q.includes(project.slug.toLowerCase());
    if (titleMatch || slugMatch) {
      return truncateContent(project.content);
    }
  }

  // 2. Match on technology name
  for (const project of projects) {
    for (const tech of project.technologies) {
      if (matchesWord(question, tech)) {
        return truncateContent(project.content);
      }
    }
  }

  return null;
}

function truncateContent(content: string | null | undefined, maxChars = 3000): string | null {
  if (!content) return null;
  if (content.length <= maxChars) {
    return content;
  }
  return content.slice(0, maxChars) + "\n\n...[Content truncated for length]";
}
