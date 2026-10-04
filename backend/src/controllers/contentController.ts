import { Request, Response } from "express";
import prisma from "../config/database.js";

// ─── Messages ─────────────────────────────────────────────

export async function createMessage(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const msg = await prisma.message.create({
      data: { name, email, subject, message },
    });

    res.status(201).json({ message: "Message sent successfully", id: msg.id });
  } catch (error) {
    console.error("Create message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMessages(_req: Request, res: Response): Promise<void> {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMessageStatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const msg = await prisma.message.update({
      where: { id },
      data: { status },
    });
    res.json(msg);
  } catch (error) {
    console.error("Update message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMessage(req: Request, res: Response): Promise<void> {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Timeline ─────────────────────────────────────────────

export async function getTimeline(_req: Request, res: Response): Promise<void> {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: [{ year: "asc" }, { order: "asc" }],
    });

    // Group by year
    const grouped = events.reduce<Record<string, typeof events>>((acc, event) => {
      if (!acc[event.year]) acc[event.year] = [];
      acc[event.year].push(event);
      return acc;
    }, {});

    res.json({ events, grouped });
  } catch (error) {
    console.error("Get timeline error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createTimelineEvent(req: Request, res: Response): Promise<void> {
  try {
    const event = await prisma.timelineEvent.create({ data: req.body });
    res.status(201).json(event);
  } catch (error) {
    console.error("Create timeline event error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTimelineEvent(req: Request, res: Response): Promise<void> {
  try {
    const event = await prisma.timelineEvent.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(event);
  } catch (error) {
    console.error("Update timeline event error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTimelineEvent(req: Request, res: Response): Promise<void> {
  try {
    await prisma.timelineEvent.delete({ where: { id: req.params.id } });
    res.json({ message: "Timeline event deleted" });
  } catch (error) {
    console.error("Delete timeline event error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Build Log ────────────────────────────────────────────

export async function getBuildLogs(_req: Request, res: Response): Promise<void> {
  try {
    const logs = await prisma.buildLog.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
    res.json(logs);
  } catch (error) {
    console.error("Get build logs error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllBuildLogs(_req: Request, res: Response): Promise<void> {
  try {
    const logs = await prisma.buildLog.findMany({
      orderBy: { date: "desc" },
    });
    res.json(logs);
  } catch (error) {
    console.error("Get all build logs error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createBuildLog(req: Request, res: Response): Promise<void> {
  try {
    const log = await prisma.buildLog.create({ data: req.body });
    res.status(201).json(log);
  } catch (error) {
    console.error("Create build log error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateBuildLog(req: Request, res: Response): Promise<void> {
  try {
    const log = await prisma.buildLog.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(log);
  } catch (error) {
    console.error("Update build log error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteBuildLog(req: Request, res: Response): Promise<void> {
  try {
    await prisma.buildLog.delete({ where: { id: req.params.id } });
    res.json({ message: "Build log deleted" });
  } catch (error) {
    console.error("Delete build log error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Social Links ─────────────────────────────────────────

export async function getSocialLinks(_req: Request, res: Response): Promise<void> {
  try {
    const links = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
    res.json(links);
  } catch (error) {
    console.error("Get social links error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function upsertSocialLink(req: Request, res: Response): Promise<void> {
  try {
    const { id, ...data } = req.body;
    let link;
    if (id) {
      link = await prisma.socialLink.update({ where: { id }, data });
    } else {
      link = await prisma.socialLink.create({ data });
    }
    res.json(link);
  } catch (error) {
    console.error("Upsert social link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteSocialLink(req: Request, res: Response): Promise<void> {
  try {
    await prisma.socialLink.delete({ where: { id: req.params.id } });
    res.json({ message: "Social link deleted" });
  } catch (error) {
    console.error("Delete social link error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Site Settings ────────────────────────────────────────

export async function getSettings(_req: Request, res: Response): Promise<void> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const mapped = settings.reduce<Record<string, string>>((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {});
    res.json(mapped);
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const updates = req.body as Record<string, string>;
    for (const [key, value] of Object.entries(updates)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
    res.json({ message: "Settings updated" });
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Analytics ────────────────────────────────────────────

export async function trackPageView(req: Request, res: Response): Promise<void> {
  try {
    await prisma.pageView.create({
      data: {
        page: req.body.page,
        referrer: req.body.referrer || null,
        userAgent: req.headers["user-agent"] || null,
      },
    });
    res.status(201).json({ message: "Tracked" });
  } catch (error) {
    console.error("Track page view error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAnalytics(_req: Request, res: Response): Promise<void> {
  try {
    const totalPageViews = await prisma.pageView.count();
    const totalProjectViews = await prisma.projectView.count();
    const totalMessages = await prisma.message.count();
    const unreadMessages = await prisma.message.count({ where: { status: "unread" } });

    // Top viewed projects
    const projectViewCounts = await prisma.projectView.groupBy({
      by: ["projectId"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    });

    const topProjects = await Promise.all(
      projectViewCounts.map(async (pv) => {
        const project = await prisma.project.findUnique({
          where: { id: pv.projectId },
          select: { title: true, slug: true },
        });
        return { ...project, views: pv._count.id };
      })
    );

    // Recent page views (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentViews = await prisma.pageView.count({
      where: { createdAt: { gte: thirtyDaysAgo } },
    });

    // Projects count
    const totalProjects = await prisma.project.count();
    const totalSkills = await prisma.skill.count();
    const totalAchievements = await prisma.achievement.count();

    res.json({
      overview: {
        totalPageViews,
        totalProjectViews,
        totalMessages,
        unreadMessages,
        recentViews,
        totalProjects,
        totalSkills,
        totalAchievements,
      },
      topProjects,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
