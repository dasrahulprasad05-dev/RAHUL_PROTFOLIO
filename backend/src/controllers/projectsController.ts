import { Request, Response } from "express";
import prisma from "../config/database.js";
import { invalidateKnowledgeCache } from "../chat/knowledge.js";

// ─── Public ───────────────────────────────────────────────

export async function getAllProjects(req: Request, res: Response): Promise<void> {
  try {
    const { category, status, featured, search } = req.query;

    const where: Record<string, unknown> = {};
    if (category && category !== "all") where.category = category;
    if (status) where.status = status;
    if (featured === "true") where.featured = true;
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { shortDescription: { contains: search as string } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        technologies: {
          include: { technology: true },
        },
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });

    const formatted = projects.map((p) => ({
      ...p,
      technologies: p.technologies.map((pt) => pt.technology),
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProjectBySlug(req: Request, res: Response): Promise<void> {
  try {
    const slug = req.params.slug as string;

    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: {
          include: { technology: true },
        },
      },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    // Track view
    await prisma.projectView.create({
      data: {
        projectId: project.id,
        referrer: req.headers.referer || null,
      },
    });

    res.json({
      ...project,
      technologies: (project as any).technologies.map((pt: any) => pt.technology),
    });
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Admin ────────────────────────────────────────────────

export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const { technologies: techIds, ...data } = req.body;

    const project = await prisma.project.create({
      data: {
        ...data,
        technologies: techIds
          ? {
              create: techIds.map((id: string) => ({
                technologyId: id,
              })),
            }
          : undefined,
      },
      include: {
        technologies: { include: { technology: true } },
      },
    });

    invalidateKnowledgeCache();
    res.status(201).json({
      ...project,
      technologies: (project as any).technologies.map((pt: any) => pt.technology),
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    const { technologies: techIds, ...data } = req.body;

    // If technologies are provided, replace them
    if (techIds) {
      await prisma.projectTechnology.deleteMany({ where: { projectId: id } });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        technologies: techIds
          ? {
              create: techIds.map((tid: string) => ({
                technologyId: tid,
              })),
            }
          : undefined,
      },
      include: {
        technologies: { include: { technology: true } },
      },
    });

    invalidateKnowledgeCache();
    res.json({
      ...project,
      technologies: (project as any).technologies.map((pt: any) => pt.technology),
    });
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteProject(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    await prisma.project.delete({ where: { id } });
    invalidateKnowledgeCache();
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
