"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Trash2,
  Sparkles,
  Bot,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import MarkdownViewer from "./MarkdownViewer";
import { api, ChatMessage, ChatSource } from "@/lib/api";

const SUGGESTED_QUESTIONS = [
  "What projects has Rahul built?",
  "What are his main skills?",
  "Tell me about his education",
  "How can I contact him?",
];

const STORAGE_KEY = "rahul_portfolio_chat_messages";

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Do NOT render on /admin or /login routes
  const isExcluded =
    pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  // Load chat history from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore sessionStorage read errors
    }
  }, []);

  // Sync messages to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (messages.length > 0) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore sessionStorage write errors
    }
  }, [messages]);

  // Focus textarea when widget opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (isExcluded) {
    return null;
  }

  const handleClearChat = () => {
    setMessages([]);
    setErrorMessage(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? input).trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setErrorMessage("Message is too long (maximum 500 characters).");
      return;
    }

    setErrorMessage(null);
    setInput("");

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    const assistantId = `ast-${Date.now()}`;
    // Temporary assistant message for live stream accumulation
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        content: "",
        isStreaming: true,
      },
    ]);

    const apiMessagesPayload = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    await api.sendChatMessageStream({
      messages: apiMessagesPayload,
      onToken: (token: string) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: m.content + token, isStreaming: false }
              : m
          )
        );
      },
      onDone: (sources: ChatSource[]) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, sources, isStreaming: false }
              : m
          )
        );
        setIsLoading(false);
      },
      onError: (errText: string) => {
        setErrorMessage(errText);
        setMessages((prev) => {
          // If the assistant message received no tokens at all, remove it
          const last = prev[prev.length - 1];
          if (last && last.id === assistantId && !last.content.trim()) {
            return prev.slice(0, -1);
          }
          return prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          );
        });
        setIsLoading(false);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ─── Floating Launcher Button ──────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)]">
        <motion.button
          id="chat-widget-launcher"
          aria-label={isOpen ? "Close AI chat" : "Open AI assistant chat"}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 h-14 px-5 rounded-full bg-gradient-to-r from-[var(--color-brand)] via-emerald-500 to-teal-400 text-white shadow-xl shadow-[var(--color-brand)]/25 hover:shadow-2xl hover:shadow-[var(--color-brand)]/40 transition-all duration-300 font-medium text-sm"
        >
          {isOpen ? (
            <X size={22} className="transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <div className="relative">
                <Bot size={22} className="relative z-10" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
              </div>
              <span className="hidden sm:inline-block tracking-wide">Ask AI Assistant</span>
              <Sparkles size={16} className="text-amber-200 animate-pulse hidden sm:inline-block" />
            </>
          )}
        </motion.button>
      </div>

      {/* ─── Chat Drawer / Modal ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-widget-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[560px] sm:max-h-[85dvh] z-50 flex flex-col bg-[var(--color-surface)] sm:rounded-2xl sm:border sm:border-[var(--color-border)] shadow-2xl overflow-hidden backdrop-blur-xl h-[100dvh]"
          >
            {/* ─── Header ─────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand)] to-teal-400 text-white shadow-sm">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[var(--color-surface)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight flex items-center gap-1.5">
                    Rahul&apos;s Assistant
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[var(--color-brand)]/10 text-[var(--color-brand)] border border-[var(--color-brand)]/20 font-bold">
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-[var(--color-text-muted)]">
                    Grounded in portfolio facts
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    id="clear-chat-button"
                    onClick={handleClearChat}
                    title="Clear chat history"
                    aria-label="Clear chat"
                    className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-surface-alt)] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  id="close-chat-button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ─── Message List ───────────────────────────────────────── */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth text-sm"
              aria-live="polite"
            >
              {/* Welcome Screen when no messages */}
              {messages.length === 0 && (
                <div className="space-y-4 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-xs leading-relaxed space-y-2">
                    <p className="font-medium text-[var(--color-text-primary)] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[var(--color-brand)]" />
                      Welcome!
                    </p>
                    <p>
                      I can answer questions about Rahul&apos;s projects, technical stack,
                      engineering journey, education, and how to get in touch.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-1">
                      Suggested questions
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {SUGGESTED_QUESTIONS.map((question, idx) => (
                        <button
                          key={idx}
                          id={`suggested-question-${idx}`}
                          onClick={() => handleSendMessage(question)}
                          className="flex items-center justify-between text-left p-2.5 rounded-xl bg-[var(--color-surface-alt)]/60 hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-brand)]/40 text-xs text-[var(--color-text-primary)] transition-all duration-200 group"
                        >
                          <span>{question}</span>
                          <ChevronRight
                            size={14}
                            className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] group-hover:translate-x-0.5 transition-all"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages stream */}
              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[88%] text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[var(--color-brand)] to-emerald-500 text-white rounded-tr-xs"
                        : "bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-tl-xs"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    ) : (
                      <>
                        {msg.isStreaming && !msg.content ? (
                          <div className="flex items-center gap-1.5 py-1 px-1">
                            <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 rounded-full bg-[var(--color-brand)] animate-bounce"></span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <MarkdownViewer content={msg.content} />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Sources chips */}
                  {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                      {msg.sources.map((src, sIdx) => {
                        const isInternal = src.url.startsWith("/");
                        return isInternal ? (
                          <Link
                            key={sIdx}
                            href={src.url}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-surface-alt)] hover:bg-[var(--color-brand)]/10 border border-[var(--color-border)] hover:border-[var(--color-brand)]/50 text-[11px] font-medium text-[var(--color-brand)] transition-all"
                          >
                            <span>{src.title}</span>
                            <ChevronRight size={11} />
                          </Link>
                        ) : (
                          <a
                            key={sIdx}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-surface-alt)] hover:bg-[var(--color-brand)]/10 border border-[var(--color-border)] hover:border-[var(--color-brand)]/50 text-[11px] font-medium text-[var(--color-brand)] transition-all"
                          >
                            <span>{src.title}</span>
                            <ExternalLink size={11} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Error banner */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ─── Input Form & Notice ─────────────────────────────────── */}
            <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-elevated)]/60">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-end gap-2"
              >
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Rahul... (Enter to send)"
                    maxLength={500}
                    rows={1}
                    disabled={isLoading}
                    className="w-full resize-none max-h-24 py-2.5 pl-3 pr-10 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs md:text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand)] focus:ring-1 focus:ring-[var(--color-brand)] transition-all disabled:opacity-50"
                  />
                  {input.length > 400 && (
                    <span className="absolute bottom-1 right-2 text-[10px] text-[var(--color-text-muted)] font-mono">
                      {input.length}/500
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  id="chat-submit-button"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="flex items-center justify-center h-9 w-9 rounded-xl bg-[var(--color-brand)] text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 shadow-md shadow-[var(--color-brand)]/20"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </form>

              {/* One-line notice required verbatim */}
              <p className="mt-2 text-[10px] text-center text-[var(--color-text-muted)] leading-tight px-1 select-none">
                AI answers come from Rahul&apos;s portfolio data. Chats are stored to improve answers.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
