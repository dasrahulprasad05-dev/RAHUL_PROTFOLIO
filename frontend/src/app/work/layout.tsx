import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore my projects in AI/ML, Data Science, and Full Stack Development.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
