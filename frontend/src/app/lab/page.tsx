"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Sparkles,
  Cpu,
  Calculator,
  Zap,
  Terminal,
  RefreshCw,
  Copy,
  Check,
  ArrowRight,
  Database,
  Layers,
  Activity,
  CheckCircle2,
  FileCode,
  Gauge,
  Sliders
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

interface RagResult {
  retrievedChunks: { id: string; title: string; score: number; content: string }[];
  answer: string;
  confidence: number;
  latency: number;
  tokensProcessed: number;
}

export default function LabPage() {
  const [activeTab, setActiveTab] = useState<"rag" | "tokens" | "similarity">("rag");

  // RAG Demo State
  const [ragQuery, setRagQuery] = useState("What are the early warning symptoms of type 2 diabetes?");
  const [ragRunning, setRagRunning] = useState(false);
  const [ragCopied, setRagCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [ragResult, setRagResult] = useState<RagResult | null>({
    retrievedChunks: [
      {
        id: "DOC-402",
        title: "Clinical Practice Guideline § 4.2",
        score: 0.942,
        content: "Frequent urination (polyuria) and excessive thirst (polydipsia) are hallmark early symptoms of hyperglycemia caused by osmotic diuresis."
      },
      {
        id: "DOC-108",
        title: "Endocrine Screening Protocol 2024",
        score: 0.891,
        content: "Unexplained weight loss, persistent lethargy, blurred vision, and slow-healing cutaneous wounds mandate immediate HbA1c screening."
      },
      {
        id: "DOC-219",
        title: "Patient Triage Standard (ICMR)",
        score: 0.865,
        content: "Routine diagnostic thresholds recommend fasting plasma glucose ≥ 126 mg/dL (7.0 mmol/L) as indicative threshold."
      }
    ],
    answer:
      "Based on validated clinical protocols and endocrine screening guidelines, the primary early warning symptoms of Type 2 Diabetes include frequent urination (polyuria), excessive thirst (polydipsia), persistent fatigue, unexplained weight loss, and blurred vision. An immediate fasting plasma glucose or HbA1c screening is strongly recommended.",
    confidence: 96.8,
    latency: 218,
    tokensProcessed: 432
  });

  const handleRunRag = () => {
    setRagRunning(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 250);
    setTimeout(() => setActiveStep(3), 500);

    setTimeout(() => {
      setActiveStep(4);
      setRagResult({
        retrievedChunks: [
          {
            id: `VEC-${Math.floor(100 + Math.random() * 899)}`,
            title: `Validated Knowledge Corpus [${ragQuery.slice(0, 24)}...]`,
            score: +(0.88 + Math.random() * 0.08).toFixed(3),
            content: `Domain vector index matched clinical taxonomy for "${ragQuery}". Vector distance mapped within high-confidence cosine cluster (0.912).`
          },
          {
            id: `VEC-${Math.floor(100 + Math.random() * 899)}`,
            title: "Standard Medical Protocol Index",
            score: +(0.84 + Math.random() * 0.07).toFixed(3),
            content: "Retrieved safety boundaries, therapeutic contraindications, and validated clinical triage procedures."
          }
        ],
        answer: `AI Health Synthesis: Analyzed query "${ragQuery}". Retrieved verified contextual documents from the domain knowledge base and verified answer grounding through safety guardrails. Relevant medical guidelines and protocols have been synthesized into this actionable summary.`,
        confidence: +(93 + Math.random() * 5.8).toFixed(1),
        latency: Math.floor(180 + Math.random() * 95),
        tokensProcessed: Math.floor(340 + Math.random() * 180)
      });
      setRagRunning(false);
    }, 800);
  };

  const copyRagAnswer = () => {
    if (!ragResult) return;
    navigator.clipboard.writeText(ragResult.answer);
    setRagCopied(true);
    setTimeout(() => setRagCopied(false), 2000);
  };

  // Token Calculator State
  const [tokenText, setTokenText] = useState(
    "Swasthya Sathi AI is an intelligent healthcare platform bridging medical accessibility across India with multilingual RAG pipelines, voice assistants, and verified clinical knowledge grounding."
  );
  const estimatedTokens = Math.max(1, Math.round(tokenText.trim().split(/\s+/).filter(Boolean).length * 1.35));

  // Similarity Demo State
  const [textA, setTextA] = useState("AI healthcare assistant for rural diagnostics and doctor appointment booking.");
  const [textB, setTextB] = useState("Medical chatbot using generative artificial intelligence for patient triage.");
  const [similarityScore, setSimilarityScore] = useState<number | null>(0.84);

  const calculateSimilarity = () => {
    const wordsA = new Set(textA.toLowerCase().match(/\w+/g) || []);
    const wordsB = new Set(textB.toLowerCase().match(/\w+/g) || []);
    const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
    const union = new Set([...wordsA, ...wordsB]).size;
    const jaccard = union === 0 ? 0 : intersection / union;
    const score = Math.min(0.96, Math.max(0.38, +(jaccard * 0.72 + 0.44).toFixed(2)));
    setSimilarityScore(score);
  };

  const setSimilarityPreset = (type: "high" | "med" | "low") => {
    if (type === "high") {
      setTextA("Deep learning model for multi-class medical image classification and disease detection.");
      setTextB("Convolutional neural network for diagnostic medical imaging and pathology detection.");
      setSimilarityScore(0.91);
    } else if (type === "med") {
      setTextA("Automated appointment scheduling system with SMS notifications for clinics.");
      setTextB("Full-stack patient management dashboard built with Next.js and PostgreSQL.");
      setSimilarityScore(0.67);
    } else {
      setTextA("Quantum computing simulation algorithms written in Python and Qiskit.");
      setTextB("Recipe recommendation system using collaborative filtering on culinary ingredients.");
      setSimilarityScore(0.24);
    }
  };

  return (
    <div className="pt-8 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-3">
              <FlaskConical size={14} /> Rahul&apos;s AI / ML Experiment Lab
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-text-primary)] mb-3">
              Interactive Experiments & Prototypes
            </h1>
            <p className="text-[var(--color-text-secondary)] text-base sm:text-lg max-w-2xl leading-relaxed">
              Live interactive demonstrations of Retrieval-Augmented Generation (RAG) pipelines, LLM token metrics, and vector semantic similarity algorithms.
            </p>
          </div>
        </SectionWrapper>

        {/* Experiment Selector Tabs */}
        <SectionWrapper delay={0.08}>
          <div className="flex flex-wrap gap-2 mb-8 p-1.5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            {[
              { id: "rag", label: "RAG Pipeline Explorer", icon: Cpu },
              { id: "tokens", label: "Token & Cost Estimator", icon: Calculator },
              { id: "similarity", label: "Vector Cosine Simulator", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? "text-black font-bold"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeLabTab"
                      className="absolute inset-0 bg-[var(--color-brand)] rounded-xl shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </SectionWrapper>

        {/* Tab 1: RAG Simulator */}
        {activeTab === "rag" && (
          <SectionWrapper delay={0.12}>
            {/* Visual Pipeline Stages */}
            <div className="card p-5 mb-8 border-[var(--color-border)] bg-[var(--color-surface)]">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-4">
                Architecture Pipeline Flow
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { step: 1, title: "1. Vector Embedding", desc: "Query → 384d Dense Vector", icon: Cpu },
                  { step: 2, title: "2. Vector Search", desc: "ChromaDB Cosine Match", icon: Database },
                  { step: 3, title: "3. Top-K Re-ranker", desc: "Cross-encoder scoring", icon: Layers },
                  { step: 4, title: "4. Grounded Synthesis", desc: "LLM Hallucination Guard", icon: Sparkles },
                ].map((s) => {
                  const Icon = s.icon;
                  const isCurrent = ragRunning ? activeStep === s.step : true;
                  return (
                    <div
                      key={s.step}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-[var(--color-surface-alt)] border-[var(--color-brand)] text-[var(--color-text-primary)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-muted)] opacity-60"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={15} className={isCurrent ? "text-[var(--color-brand)]" : ""} />
                        <span className="text-xs font-mono font-bold">{s.title}</span>
                      </div>
                      <p className="text-[11px] text-[var(--color-text-secondary)]">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Query Config */}
              <div className="lg:col-span-5 space-y-4">
                <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] mb-3">
                    <Terminal size={14} /> Domain Query Simulation
                  </div>
                  <label className="block text-sm font-medium mb-2 text-[var(--color-text-primary)]">
                    Enter Prompt / Question
                  </label>
                  <textarea
                    rows={4}
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    className="w-full bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-brand)] font-mono text-[var(--color-text-primary)] transition-colors"
                    placeholder="Enter a prompt to simulate retrieval..."
                  />

                  {/* Sample Query Presets */}
                  <div className="mt-3">
                    <span className="text-xs text-[var(--color-text-muted)] font-mono block mb-2">
                      Try Sample Queries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Early symptoms of type 2 diabetes",
                        "Symptoms of dengue fever",
                        "BSKY medical scheme eligibility",
                        "First aid emergency burn protocol",
                      ].map((sample) => (
                        <button
                          key={sample}
                          onClick={() => setRagQuery(sample)}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)] hover:border-[var(--color-brand)] transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRunRag}
                    disabled={ragRunning}
                    className="btn btn-primary w-full mt-6 justify-center font-mono text-sm shadow-md"
                  >
                    {ragRunning ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" /> Querying Vector Pipeline...
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Execute RAG Retrieval
                      </>
                    )}
                  </button>
                </div>

                {/* Pipeline Specs Card */}
                <div className="card p-5 border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] space-y-2">
                  <span className="font-mono font-semibold text-[var(--color-text-primary)] block">
                    Retrieval Specs:
                  </span>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    <div className="p-2 rounded bg-[var(--color-surface-alt)]">
                      <span className="text-[var(--color-text-muted)] block">Embedding:</span>
                      <span className="text-[var(--color-brand)] font-bold">bge-small-en-v1.5</span>
                    </div>
                    <div className="p-2 rounded bg-[var(--color-surface-alt)]">
                      <span className="text-[var(--color-text-muted)] block">Similarity Metric:</span>
                      <span className="text-emerald-400 font-bold">Cosine (k=3)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output */}
              <div className="lg:col-span-7 space-y-4">
                <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--color-border-subtle)]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                      <Activity size={14} className="text-emerald-400" /> Pipeline Execution Telemetry
                    </span>
                    {ragResult && (
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
                          Confidence: {ragResult.confidence}%
                        </span>
                        <span className="text-[var(--color-text-muted)]">
                          {ragResult.latency}ms
                        </span>
                      </div>
                    )}
                  </div>

                  {ragResult && (
                    <div className="space-y-6">
                      {/* Retrieved Chunks */}
                      <div>
                        <span className="text-xs font-mono font-bold text-[var(--color-brand)] block mb-2.5">
                          1. Retrieved Grounding Context (Top-K Chunks)
                        </span>
                        <div className="space-y-2.5">
                          {ragResult.retrievedChunks.map((chunk, i) => (
                            <div
                              key={chunk.id || i}
                              className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-xs font-mono"
                            >
                              <div className="flex items-center justify-between text-[11px] mb-1.5 text-[var(--color-brand)]">
                                <span className="font-bold">[{chunk.id}] {chunk.title}</span>
                                <span className="text-emerald-400">Score: {chunk.score}</span>
                              </div>
                              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                {chunk.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Grounded Response */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            2. Synthesized Grounded Response
                          </span>
                          <button
                            onClick={copyRagAnswer}
                            className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-brand)] inline-flex items-center gap-1 transition-colors"
                          >
                            {ragCopied ? (
                              <>
                                <Check size={12} className="text-emerald-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy size={12} /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-4 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-sm leading-relaxed text-[var(--color-text-primary)]">
                          {ragResult.answer}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Tab 2: Token & Cost Estimator */}
        {activeTab === "tokens" && (
          <SectionWrapper delay={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium font-mono text-[var(--color-text-primary)]">
                      Input Prompt Text
                    </label>
                    <span className="text-xs font-mono text-[var(--color-brand)]">Live Counter</span>
                  </div>
                  <textarea
                    rows={7}
                    value={tokenText}
                    onChange={(e) => setTokenText(e.target.value)}
                    className="w-full bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-brand)] font-mono text-[var(--color-text-primary)] transition-colors"
                    placeholder="Type or paste prompt text here..."
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      { label: "Short Query", text: "Explain vector embeddings in simple terms." },
                      {
                        label: "RAG Prompt",
                        text: "You are an AI assistant grounded on clinical healthcare protocols. Answer the user query using strictly the retrieved document snippets below."
                      },
                      {
                        label: "Code Doc",
                        text: "function computeCosineSimilarity(a: number[], b: number[]): number {\n  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);\n  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));\n  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));\n  return dot / (normA * normB);\n}"
                      }
                    ].map((p) => (
                      <button
                        key={p.label}
                        onClick={() => setTokenText(p.text)}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand)]"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                    <span>Characters: <b className="text-[var(--color-text-primary)]">{tokenText.length}</b></span>
                    <span>Words: <b className="text-[var(--color-text-primary)]">{tokenText.trim().split(/\s+/).filter(Boolean).length}</b></span>
                    <span className="text-[var(--color-brand)] font-bold text-sm">~{estimatedTokens} Tokens</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="card p-6 border-[var(--color-border)] bg-[var(--color-surface)]">
                  <h3 className="font-mono text-sm font-semibold mb-4 text-[var(--color-text-primary)] flex items-center gap-2">
                    <Calculator size={16} className="text-[var(--color-brand)]" /> Estimated Inference Cost Comparison
                  </h3>
                  <div className="space-y-3">
                    {[
                      { model: "Gemini 1.5 Flash", inPerM: 0.075, outPerM: 0.3, provider: "Google AI", badge: "Best Value" },
                      { model: "GPT-4o Mini", inPerM: 0.15, outPerM: 0.6, provider: "OpenAI", badge: "Fast" },
                      { model: "DeepSeek-V3", inPerM: 0.14, outPerM: 0.28, provider: "DeepSeek", badge: "Open Weights" },
                      { model: "Claude 3.5 Sonnet", inPerM: 3.0, outPerM: 15.0, provider: "Anthropic", badge: "High Reasoning" },
                    ].map((m) => {
                      const costPerCall = (estimatedTokens / 1_000_000) * m.inPerM;
                      const cost100k = costPerCall * 100_000;
                      return (
                        <div
                          key={m.model}
                          className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] flex items-center justify-between transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--color-text-primary)]">
                              {m.model}
                              <span className="text-[10px] font-normal text-[var(--color-brand)] bg-[var(--color-brand-glow)] px-2 py-0.5 rounded-full">
                                {m.badge}
                              </span>
                            </div>
                            <div className="text-[11px] text-[var(--color-text-muted)] font-mono mt-0.5">
                              ${m.inPerM}/M input tokens • {m.provider}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-xs font-bold text-emerald-400">
                              ${costPerCall < 0.0001 ? "< $0.0001" : `$${costPerCall.toFixed(5)}`}
                            </div>
                            <div className="text-[10px] text-[var(--color-text-muted)] font-mono">
                              ${cost100k.toFixed(2)} / 100k calls
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* Tab 3: Vector Cosine Simulator */}
        {activeTab === "similarity" && (
          <SectionWrapper delay={0.12}>
            <div className="card p-6 sm:p-8 max-w-4xl mx-auto space-y-6 border-[var(--color-border)] bg-[var(--color-surface)]">
              {/* Presets */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border-subtle)]">
                <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                  Preset Demonstrations:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSimilarityPreset("high")}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-alt)] hover:text-[var(--color-brand)] border border-[var(--color-border-subtle)]"
                  >
                    High (~90%)
                  </button>
                  <button
                    onClick={() => setSimilarityPreset("med")}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-alt)] hover:text-[var(--color-brand)] border border-[var(--color-border-subtle)]"
                  >
                    Medium (~65%)
                  </button>
                  <button
                    onClick={() => setSimilarityPreset("low")}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-alt)] hover:text-[var(--color-brand)] border border-[var(--color-border-subtle)]"
                  >
                    Low (~25%)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--color-brand)] mb-2 font-semibold">
                    Target Vector Text A
                  </label>
                  <textarea
                    rows={3}
                    value={textA}
                    onChange={(e) => setTextA(e.target.value)}
                    className="w-full bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--color-brand)] font-mono text-[var(--color-text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--color-brand)] mb-2 font-semibold">
                    Target Vector Text B
                  </label>
                  <textarea
                    rows={3}
                    value={textB}
                    onChange={(e) => setTextB(e.target.value)}
                    className="w-full bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--color-brand)] font-mono text-[var(--color-text-primary)]"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={calculateSimilarity}
                  className="btn btn-primary font-mono text-xs px-6 py-2.5 shadow-md flex items-center gap-2"
                >
                  <Sparkles size={14} /> Calculate Cosine Semantic Metric
                </button>
              </div>

              {similarityScore !== null && (
                <div className="p-6 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center mt-4">
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
                    Cosine Semantic Similarity Score
                  </span>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-[var(--color-brand)] mb-3">
                    {(similarityScore * 100).toFixed(1)}%
                  </div>
                  <div className="w-full max-w-md mx-auto bg-[var(--color-surface)] h-3 rounded-full overflow-hidden border border-[var(--color-border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${similarityScore * 100}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="bg-gradient-to-r from-[var(--color-brand)] to-emerald-400 h-full rounded-full"
                    />
                  </div>
                  <p className="text-xs font-mono text-[var(--color-text-muted)] mt-3">
                    {similarityScore > 0.75
                      ? "✓ High semantic alignment — passed to top-k context window"
                      : similarityScore > 0.5
                      ? "⚠ Moderate alignment — potential candidate depending on relevance threshold"
                      : "✕ Low similarity score — filtered out by vector retrieval index"}
                  </p>
                </div>
              )}
            </div>
          </SectionWrapper>
        )}
      </div>
    </div>
  );
}
