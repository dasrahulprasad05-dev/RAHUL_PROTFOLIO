import { Request, Response } from "express";
import prisma from "../config/database.js";

// ─── Skills ───────────────────────────────────────────────

export async function getAllSkills(_req: Request, res: Response): Promise<void> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    // Group by category
    const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ skills, grouped });
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createSkill(req: Request, res: Response): Promise<void> {
  try {
    const skill = await prisma.skill.create({ data: req.body });
    res.status(201).json(skill);
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateSkill(req: Request, res: Response): Promise<void> {
  try {
    const skill = await prisma.skill.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(skill);
  } catch (error) {
    console.error("Update skill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteSkill(req: Request, res: Response): Promise<void> {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.json({ message: "Skill deleted" });
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Education ────────────────────────────────────────────

export async function getAllEducation(_req: Request, res: Response): Promise<void> {
  try {
    const education = await prisma.education.findMany({ orderBy: { order: "asc" } });
    res.json(education);
  } catch (error) {
    console.error("Get education error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createEducation(req: Request, res: Response): Promise<void> {
  try {
    const education = await prisma.education.create({ data: req.body });
    res.status(201).json(education);
  } catch (error) {
    console.error("Create education error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateEducation(req: Request, res: Response): Promise<void> {
  try {
    const education = await prisma.education.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(education);
  } catch (error) {
    console.error("Update education error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteEducation(req: Request, res: Response): Promise<void> {
  try {
    await prisma.education.delete({ where: { id: req.params.id } });
    res.json({ message: "Education deleted" });
  } catch (error) {
    console.error("Delete education error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Achievements ─────────────────────────────────────────

export async function getAllAchievements(_req: Request, res: Response): Promise<void> {
  try {
    const achievements = await prisma.achievement.findMany({ orderBy: { order: "asc" } });
    res.json(achievements);
  } catch (error) {
    console.error("Get achievements error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createAchievement(req: Request, res: Response): Promise<void> {
  try {
    const achievement = await prisma.achievement.create({ data: req.body });
    res.status(201).json(achievement);
  } catch (error) {
    console.error("Create achievement error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateAchievement(req: Request, res: Response): Promise<void> {
  try {
    const achievement = await prisma.achievement.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(achievement);
  } catch (error) {
    console.error("Update achievement error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteAchievement(req: Request, res: Response): Promise<void> {
  try {
    await prisma.achievement.delete({ where: { id: req.params.id } });
    res.json({ message: "Achievement deleted" });
  } catch (error) {
    console.error("Delete achievement error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// ─── Experience ───────────────────────────────────────────

export async function getAllExperience(_req: Request, res: Response): Promise<void> {
  try {
    const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    res.json(experience);
  } catch (error) {
    console.error("Get experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createExperience(req: Request, res: Response): Promise<void> {
  try {
    const experience = await prisma.experience.create({ data: req.body });
    res.status(201).json(experience);
  } catch (error) {
    console.error("Create experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateExperience(req: Request, res: Response): Promise<void> {
  try {
    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(experience);
  } catch (error) {
    console.error("Update experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteExperience(req: Request, res: Response): Promise<void> {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    console.error("Delete experience error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
