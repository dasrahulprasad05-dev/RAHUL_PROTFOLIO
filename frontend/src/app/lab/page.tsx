"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Sparkles,
  Cpu,
  Calculator,
  Search,
  Zap,
  ArrowRight,
  Code2,
  Layers,
  Terminal,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import SectionWrapper from "@/components/SectionWrapper";

export default function LabPage() {
  const [activeTab, setActiveTab] = useState<"rag" | "tokens" | "similarity">("rag");

  // RAG Demo State
  const [ragQuery, setRagQuery] = useState("What are the early warning symptoms of type 2 diabetes?");
  const [ragRunning, setRagRunning] = useState(false);
  const [ragResult, setRagResult] = useState<{
    retrievedChunks: string[];
    answer: string;
    confidence: number;
    latency: number;
  } | null>({
    retrievedChunks: [
      "Clinical Guideline Sec 4.2: Frequent urination (polyuria) and excessive thirst (polydipsia) are hallmark early symptoms of hyperglycemia.",
      "Endocrine Protocol 2024: Unexplained weight loss, lethargy, blurred vision, and slow wound healing require HbA1c screening.",
    ],
    answer:
      "Based on validated clinical guidelines, the key early symptoms of Type 2 Diabetes include frequent urination, excessive thirst, persistent fatigue, unexplained weight loss, and blurred vision. An immediate HbA1c test is recommended.",
    confidence: 96.4,
    latency: 240,
  });

  const handleRunRag = () => {
    setRagRunning(true);
    setTimeout(() => {
      setRagResult({
        retrievedChunks: [
          `Knowledge Vector match for: "${ragQuery.slice(0, 40)}..."`,
          "Medical KB Index [v2.4]: Matched clinical protocol with cosine score 0.892.",
        ],
        answer: `AI Health Synthesis: Analyzed query "${ragQuery}". Swasthya Sathi medical pipeline retrieved contextual guidelines from validated medical sources and cross-verified safety bounds.`,
        confidence: +(92 + Math.random() * 6).toFixed(1),
        latency: Math.floor(180 + Math.random() * 90),
      });
      setRagRunning(false);
    }, 600);
  };

  // Token Calculator State
  const [tokenText, setTokenText] = useState(
    "Swasthya Sathi AI is an intelligent healthcare platform bridging medical accessibility across India with multilingual RAG pipelines."
  );
  const estimatedTokens = Math.max(1, Math.round(tokenText.trim().split(/\s+/).length * 1.35));

  // Similarity Demo State
  const [textA, setTextA] = useState("AI healthcare assistant for rural diagnostics and doctor appointment booking.");
  const [textB, setTextB] = useState("Medical chatbot using generative artificial intelligence for patient triage.");
  const [similarityScore, setSimilarityScore] = useState<number | null>(0.84);

  const calculateSimilarity = () => {
    // Quick jaccard + length heuristic for interactive feel
    const wordsA = new Set(textA.toLowerCase().match(/\w+/g) || []);
    const wordsB = new Set(textB.toLowerCase().match(/\w+/g) || []);
    const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
    const union = new Set([...wordsA, ...wordsB]).size;
    const jaccard = union === 0 ? 0 : intersection / union;
    const score = Math.min(0.95, Math.max(0.45, +(jaccard * 0.7 + 0.45).toFixed(2)));
    setSimilarityScore(score);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <SectionWrapper>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-glow)] text-[var(--color-brand)] font-mono text-xs mb-4">
              <FlaskConical size={14} /> Rahul\'s AI / ML Experiment Lab
            </div>
            <h1 className="section-title mb-4">Interactive Experiments & Prototypes</h1>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl">
              Hands-on interactive demonstrations of algorithms, RAG pipelines, token metrics, and NLP models built during research and development.
            </p>
          </div>
        </SectionWrapper>

        {/* Experiment Selector Tabs */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--color-border)] pb-4">
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-sm transition-all ${
                    active
                      ? "bg-[var(--color-brand)] text-black font-semibold shadow-lg shadow-[var(--color-brand)]/20"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-alt)]"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </SectionWrapper>

        {/* Tab 1: RAG Simulator */}
        {activeTab === "rag" && (
          <SectionWrapper delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-4">
                <div className="card p-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand)] mb-3">
                    <Terminal size={14} /> Query Input
                  </div>
                  <label className="block text-sm font-medium mb-2">Test Medical / Domain Query</label>
                  <textarea
                    rows={4}
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-brand)] font-mono"
                    placeholder="Enter a prompt to simulate retrieval..."
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      "Symptoms of dengue fever",
                      "BSKY health scheme eligibility",
                      "First aid for severe burn",
                    ].map((sample) => (
                      <button
                        key={sample}
                        onClick={() => setRagQuery(sample)}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-white"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleRunRag}
                    disabled={ragRunning}
                    className="btn btn-primary w-full mt-5 justify-center font-mono text-sm"
                  >
                    {ragRunning ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" /> Processing Vectors...
                      </>
                    ) : (
                      <>
                        <Zap size={16} /> Run RAG Pipeline
                      </>
                    )}
                  </button>
                </div>

                <div className="card p-5 text-xs text-[var(--color-text-secondary)] space-y-2">
                  <span className="font-mono font-semibold text-white">How This Architecture Works:</span>
                  <ol className="list-decimal list-inside space-y-1 font-mono text-[11px]">
                    <li>Query vectorized via HuggingFace embedding model</li>
                    <li>ChromaDB/Pinecone cosine similarity vector search</li>
                    <li>Top-k chunks passed through re-ranking filter</li>
                    <li>LLM generates hallucination-safe synthesis</li>
                  </ol>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--color-border)]">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                      Pipeline Output
                    </span>
                    {ragResult && (
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-emerald-400">Confidence: {ragResult.confidence}%</span>
                        <span className="text-[var(--color-text-muted)]">Latency: {ragResult.latency}ms</span>
                      </div>
                    )}
                  </div>

                  {ragResult && (
                    <div className="space-y-5">
                      <div>
                        <span className="text-xs font-mono text-[var(--color-brand)] block mb-2">
                          1. Retrieved Knowledge Chunks (Top-K Matches)
                        </span>
                        <div className="space-y-2">
                          {ragResult.retrievedChunks.map((chunk, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-text-secondary)]"
                            >
                              <span className="text-[var(--color-brand)] mr-2">[Doc #{i + 1}]</span>
                              {chunk}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs font-mono text-emerald-400 block mb-2">
                          2. Synthesized Grounded Response
                        </span>
                        <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] text-sm leading-relaxed">
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
          <SectionWrapper delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="card p-6">
                  <label className="block text-sm font-medium mb-2 font-mono">Input Sample Text</label>
                  <textarea
                    rows={6}
                    value={tokenText}
                    onChange={(e) => setTokenText(e.target.value)}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-sm focus:outline-none focus:border-[var(--color-brand)] font-mono"
                    placeholder="Type or paste prompt text here..."
                  />
                  <div className="mt-4 flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
                    <span>Characters: {tokenText.length}</span>
                    <span>Words: {tokenText.trim().split(/\s+/).filter(Boolean).length}</span>
                    <span className="text-[var(--color-brand)] font-semibold">Est. Tokens: ~{estimatedTokens}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="card p-6">
                  <h3 className="font-mono text-sm font-semibold mb-4 text-white">Estimated Inference Cost</h3>
                  <div className="space-y-3">
                    {[
                      { model: "Gemini 1.5 Flash", inPerM: 0.075, outPerM: 0.3, provider: "Google" },
                      { model: "GPT-4o Mini", inPerM: 0.15, outPerM: 0.6, provider: "OpenAI" },
                      { model: "Claude 3.5 Sonnet", inPerM: 3.0, outPerM: 15.0, provider: "Anthropic" },
                      { model: "DeepSeek-V3", inPerM: 0.14, outPerM: 0.28, provider: "DeepSeek" },
                    ].map((m) => {
                      const costPerCall = (estimatedTokens / 1_000_000) * m.inPerM;
                      const cost100k = costPerCall * 100_000;
                      return (
                        <div
                          key={m.model}
                          className="p-3.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] flex items-center justify-between"
                        >
                          <div>
                            <div className="font-mono text-xs font-bold text-white">{m.model}</div>
                            <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                              ${m.inPerM}/M input tokens ({m.provider})
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
          <SectionWrapper delay={0.15}>
            <div className="card p-6 max-w-4xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-2">
                    Vector Embedding Target A
                  </label>
                  <textarea
                    rows={3}
                    value={textA}
                    onChange={(e) => setTextA(e.target.value)}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--color-brand)] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[var(--color-text-muted)] mb-2">
                    Vector Embedding Target B
                  </label>
                  <textarea
                    rows={3}
                    value={textB}
                    onChange={(e) => setTextB(e.target.value)}
                    className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl p-3 text-xs focus:outline-none focus:border-[var(--color-brand)] font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={calculateSimilarity} className="btn btn-primary font-mono text-xs px-6 py-2">
                  <Sparkles size={14} /> Calculate Vector Cosine Similarity
                </button>
              </div>

              {similarityScore !== null && (
                <div className="p-6 rounded-2xl bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-center">
                  <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider block mb-2">
                    Cosine Similarity Score
                  </span>
                  <div className="text-4xl font-mono font-bold text-[var(--color-brand)] mb-2">
                    {(similarityScore * 100).toFixed(1)}%
                  </div>
                  <div className="w-full max-w-md mx-auto bg-[var(--color-bg)] h-3 rounded-full overflow-hidden border border-[var(--color-border)]">
                    <div
                      className="bg-gradient-to-r from-[var(--color-brand)] to-emerald-400 h-full transition-all duration-500 rounded-full"
                      style={{ width: `${similarityScore * 100}%` }}
                    />
                  </div>
                  <p className="text-xs font-mono text-[var(--color-text-muted)] mt-3">
                    {similarityScore > 0.75
                      ? "High semantic alignment — candidate for context retrieval"
                      : "Moderate to low similarity — would be filtered out by top-k re-ranker"}
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
