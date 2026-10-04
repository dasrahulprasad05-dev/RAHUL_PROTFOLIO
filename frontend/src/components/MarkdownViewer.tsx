"use client";

import React from "react";
import { ExternalLink, Terminal } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className = "" }: MarkdownViewerProps) {
  if (!content) return null;

  // Split into blocks by double newlines or code block fences
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLang = "";
  let listBuffer: string[] = [];

  const flushList = (key: string) => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul key={key} className="space-y-2.5 my-4 pl-1">
          {listBuffer.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] mt-2 flex-shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  const flushCode = (key: string) => {
    if (codeBuffer.length > 0) {
      elements.push(
        <div key={key} className="my-5 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)]/50 text-xs font-mono text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Terminal size={13} className="text-[var(--color-brand)]" />
              {codeLang || "architecture / code"}
            </span>
          </div>
          <pre className="p-4 text-xs md:text-sm font-mono overflow-x-auto text-[var(--color-text-primary)] leading-relaxed">
            <code>{codeBuffer.join("\n")}</code>
          </pre>
        </div>
      );
      codeBuffer = [];
      codeLang = "";
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        flushCode(`code-${index}`);
        inCodeBlock = false;
      } else {
        flushList(`list-before-code-${index}`);
        inCodeBlock = true;
        codeLang = trimmed.replace("```", "").trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listBuffer.push(trimmed.slice(2));
      return;
    } else {
      flushList(`list-${index}`);
    }

    // Empty lines
    if (!trimmed) {
      return;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-lg md:text-xl font-bold mt-6 mb-3 text-[var(--color-text-primary)]">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-xl md:text-2xl font-black mt-8 mb-4 tracking-tight text-[var(--color-text-primary)]">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={`h1-${index}`} className="text-2xl md:text-3xl font-black mt-10 mb-4 tracking-tight text-[var(--color-text-primary)]">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    // Standard Paragraph
    elements.push(
      <p key={`p-${index}`} className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed my-3">
        {renderInline(line)}
      </p>
    );
  });

  flushList("list-end");
  flushCode("code-end");

  return <div className={`prose-custom ${className}`}>{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // Parse inline elements: `code`, **bold**, [link](url)
  // Simple token regex for inline markdown
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for link [text](url)
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    // Check for inline code `code`
    const codeMatch = remaining.match(/`(.*?)`/);

    // Find earliest match
    const matches = [
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
    ].filter(Boolean) as { type: string; index: number; match: RegExpMatchArray }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    matches.sort((a, b) => a.index - b.index);
    const earliest = matches[0];

    // Push text preceding the match
    if (earliest.index > 0) {
      parts.push(remaining.substring(0, earliest.index));
    }

    if (earliest.type === "link") {
      const linkText = earliest.match[1];
      const linkHref = earliest.match[2];
      const isExternal = linkHref.startsWith("http");
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={linkHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-[var(--color-brand)] underline underline-offset-4 hover:opacity-80 font-medium"
        >
          {linkText}
          {isExternal && <ExternalLink size={12} className="inline opacity-70" />}
        </a>
      );
      remaining = remaining.substring(earliest.index + earliest.match[0].length);
    } else if (earliest.type === "bold") {
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-bold text-[var(--color-text-primary)]">
          {earliest.match[1]}
        </strong>
      );
      remaining = remaining.substring(earliest.index + earliest.match[0].length);
    } else if (earliest.type === "code") {
      parts.push(
        <code
          key={`code-${keyIndex++}`}
          className="px-1.5 py-0.5 rounded-md font-mono text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-brand)] font-semibold"
        >
          {earliest.match[1]}
        </code>
      );
      remaining = remaining.substring(earliest.index + earliest.match[0].length);
    }
  }

  return parts;
}
