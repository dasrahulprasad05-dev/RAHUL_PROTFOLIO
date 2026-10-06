import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}`,
          }}
        />
      </head>
      <body className="noise-bg">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-dvh pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
