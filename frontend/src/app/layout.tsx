import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Rahul Prasad Das | AI/ML & Data Science",
    template: "%s | Rahul Prasad Das",
  },
  description:
    "Building intelligent systems and turning ideas into products. AI/ML • Data • Full Stack developer portfolio.",
  keywords: [
    "Rahul Prasad Das",
    "AI/ML",
    "Machine Learning",
    "Data Science",
    "Full Stack Developer",
    "Portfolio",
    "Python",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Rahul Prasad Das" }],
  openGraph: {
    title: "Rahul Prasad Das | AI/ML & Data Science",
    description: "Building intelligent systems and turning ideas into products.",
    type: "website",
    locale: "en_US",
    siteName: "Rahul.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Prasad Das | AI/ML & Data Science",
    description: "Building intelligent systems and turning ideas into products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="noise-bg">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
