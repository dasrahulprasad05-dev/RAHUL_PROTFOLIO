import { Request, Response } from "express";
import { z } from "zod";
import prisma from "../config/database.js";
import { getKnowledge, getProjectDetail } from "../chat/knowledge.js";
import { buildSystemPrompt, extractSources } from "../chat/prompt.js";
import { generate } from "../chat/llm.js";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"], {
          errorMap: () => ({ message: "Role must be 'user' or 'assistant'" }),
        }),
        content: z
          .string()
          .trim()
          .min(1, "Message content cannot be empty")
          .max(500, "Message content cannot exceed 500 characters"),
      })
    )
    .min(1, "At least one message is required")
    .refine((msgs) => msgs[msgs.length - 1]?.role === "user", {
      message: "The last message must be from 'user'",
    }),
});

/**
 * POST /api/chat
 * Server-Sent Events streaming by default.
 * ?stream=false provides non-streaming JSON fallback.
 */
export async function handleChat(req: Request, res: Response): Promise<void> {
  const parseResult = chatRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: "Invalid chat request format",
      details: parseResult.error.errors.map((e) => e.message),
    });
    return;
  }

  const allMessages = parseResult.data.messages;
  // Keep max 6 messages, ending with the user's latest query
  const trimmedMessages = allMessages.slice(-6);
  const lastUserMessage = trimmedMessages[trimmedMessages.length - 1].content;
  const isStream = req.query.stream !== "false";

  try {
    const [pack, projectDetail] = await Promise.all([
      getKnowledge(),
      getProjectDetail(lastUserMessage),
    ]);

    const systemPrompt = buildSystemPrompt(pack.plainText, projectDetail);

    // Non-streaming fallback (?stream=false)
    if (!isStream) {
      const result = await generate({
        system: systemPrompt,
        messages: trimmedMessages,
        stream: false,
      });

      const sources = extractSources(lastUserMessage, result.text, pack.structured.projects);
      const isAnswered = !result.text.toLowerCase().includes("i don't have that information");

      // Save exchange to ChatLog
      try {
        await prisma.chatLog.create({
          data: {
            question: lastUserMessage.slice(0, 500),
            answer: result.text,
            sources: JSON.stringify(sources),
            answered: isAnswered,
          },
        });
      } catch (logErr) {
        console.error("Failed to persist chat log:", logErr);
      }

      res.json({
        answer: result.text,
        sources,
      });
      return;
    }

    // Server-Sent Events (SSE) streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    let fullAnswer = "";

    try {
      const result = await generate({
        system: systemPrompt,
        messages: trimmedMessages,
        stream: true,
      });

      if (result.stream) {
        for await (const token of result.stream) {
          fullAnswer += token;
          res.write(`data: ${JSON.stringify({ token })}\n\n`);
        }
      } else if (result.text) {
        fullAnswer = result.text;
        res.write(`data: ${JSON.stringify({ token: result.text })}\n\n`);
      }

      const sources = extractSources(lastUserMessage, fullAnswer, pack.structured.projects);

      // Final SSE event containing sources
      res.write(`data: ${JSON.stringify({ done: true, sources })}\n\n`);
      res.end();

      // Persist exchange to database
      const isAnswered = !fullAnswer.toLowerCase().includes("i don't have that information");
      try {
        await prisma.chatLog.create({
          data: {
            question: lastUserMessage.slice(0, 500),
            answer: fullAnswer,
            sources: JSON.stringify(sources),
            answered: isAnswered,
          },
        });
      } catch (logErr) {
        console.error("Failed to persist chat log:", logErr);
      }
    } catch (streamErr) {
      const msg = streamErr instanceof Error ? streamErr.message : "AI service error";
      console.error("Chat streaming error:", msg);
      if (res.headersSent) {
        res.write(
          `data: ${JSON.stringify({ error: "The AI assistant is temporarily unavailable." })}\n\n`
        );
        res.end();
      } else {
        res.status(502).json({
          error: "The AI assistant is temporarily unavailable. Please try again in a moment.",
        });
      }
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("Chat generation failed:", msg);
    if (!res.headersSent) {
      res.status(502).json({
        error: "The AI assistant is temporarily unavailable. Please try again in a moment.",
      });
    }
  }
}

/**
 * GET /api/admin/chat-logs (paginated)
 */
export async function getChatLogs(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const limit = Math.max(1, Math.min(100, parseInt((req.query.limit as string) || "20", 10)));
    const answeredParam = req.query.answered as string | undefined;

    const where: { answered?: boolean } = {};
    if (answeredParam === "true") where.answered = true;
    if (answeredParam === "false") where.answered = false;

    const [total, logs] = await Promise.all([
      prisma.chatLog.count({ where }),
      prisma.chatLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const formattedLogs = logs.map((log) => {
      let parsedSources = [];
      try {
        parsedSources = JSON.parse(log.sources);
      } catch {
        parsedSources = [];
      }
      return {
        ...log,
        sources: parsedSources,
      };
    });

    res.json({
      logs: formattedLogs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch chat logs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * DELETE /api/admin/chat-logs/:id
 */
export async function deleteChatLog(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params.id as string;
    await prisma.chatLog.delete({
      where: { id },
    });
    res.json({ message: "Chat log deleted successfully" });
  } catch (error) {
    console.error("Failed to delete chat log:", error);
    res.status(500).json({ error: "Failed to delete chat log" });
  }
}
