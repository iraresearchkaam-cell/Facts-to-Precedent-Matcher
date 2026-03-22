"use client";

import { Scale, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropZone } from "@/components/drop-zone";
import { ProgressSteps, type StepStatus } from "@/components/progress-steps";
import { FactCard } from "@/components/fact-card";
import { ResultsTable, type PrecedentResult } from "@/components/results-table";
import { MemoView } from "@/components/memo-view";
import { useState, useCallback } from "react";
import { toast } from "@/components/ui/toaster";
import type { ExtractedFacts } from "@/lib/openai";

interface AnalysisState {
  isProcessing: boolean;
  steps: Array<{ label: string; status: StepStatus }>;
  extractedFacts: ExtractedFacts | null;
  results: PrecedentResult[];
  memo: string | null;
  error: string | null;
}

const INITIAL_STEPS = [
  { label: "Extracting facts from PDF", status: "pending" as StepStatus },
  { label: "Vectorizing fact pattern", status: "pending" as StepStatus },
  { label: "Searching precedents", status: "pending" as StepStatus },
  { label: "Generating strategy memo", status: "pending" as StepStatus },
];

export default function HomePage() {
  const [state, setState] = useState<AnalysisState>({
    isProcessing: false,
    steps: INITIAL_STEPS,
    extractedFacts: null,
    results: [],
    memo: null,
    error: null,
  });

  const updateStep = (index: number, status: StepStatus) => {
    setState((prev) => {
      const newSteps = [...prev.steps];
      newSteps[index] = { ...newSteps[index], status };
      return { ...prev, steps: newSteps };
    });
  };

  const resetAnalysis = () => {
    setState({
      isProcessing: false,
      steps: INITIAL_STEPS,
      extractedFacts: null,
      results: [],
      memo: null,
      error: null,
    });
  };

  const analyzeFile = useCallback(async (file: File) => {
    setState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
      steps: INITIAL_STEPS.map((s) => ({ ...s, status: "pending" as StepStatus })),
    }));

    try {
      updateStep(0, "active");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      updateStep(0, "complete");
      updateStep(1, "active");

      const data = await response.json();

      updateStep(1, "complete");
      updateStep(2, "active");

      setState((prev) => ({
        ...prev,
        extractedFacts: data.extractedFacts,
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));

      updateStep(2, "complete");
      updateStep(3, "active");

      setState((prev) => ({
        ...prev,
        results: data.precedents,
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));

      updateStep(3, "complete");

      setState((prev) => ({
        ...prev,
        memo: data.comparisonMemo,
        isProcessing: false,
      }));

      toast({
        title: "Analysis complete",
        description: `Found ${data.precedents.length} matching precedents`,
        variant: "success",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isProcessing: false,
        steps: prev.steps.map((s) =>
          s.status === "active" ? { ...s, status: "error" as StepStatus } : s
        ),
      }));

      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      analyzeFile(file);
    },
    [analyzeFile]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold text-text-primary">
                Precedent Matcher
              </h1>
              <p className="text-xs text-text-muted">
                AI-Powered Legal Research
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <History className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-text-primary mb-2">
            Find Relevant Precedents
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Upload a legal case PDF and let AI find semantically similar precedents
            based on fact patterns, not just keywords.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <DropZone
              onFileSelect={handleFileSelect}
              isProcessing={state.isProcessing}
            />

            {state.isProcessing && (
              <div className="bg-surface border border-border rounded-lg p-6 fade-in">
                <h3 className="font-medium text-text-primary mb-4">Analysis Progress</h3>
                <ProgressSteps steps={state.steps} />
              </div>
            )}

            {state.error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 fade-in">
                <p className="text-red-500 text-sm">{state.error}</p>
              </div>
            )}

            {state.extractedFacts && (
              <div className="fade-in">
                <FactCard facts={state.extractedFacts} />
              </div>
            )}

            {state.results.length > 0 && (
              <div className="fade-in">
                <h3 className="font-serif text-lg font-semibold text-text-primary mb-4">
                  Matching Precedents
                </h3>
                <ResultsTable results={state.results} />
              </div>
            )}

            {state.memo && (
              <div className="fade-in">
                <MemoView content={state.memo} />
              </div>
            )}

            {state.extractedFacts && !state.isProcessing && (
              <Button
                variant="outline"
                onClick={resetAnalysis}
                className="w-full"
              >
                Analyze Another Document
              </Button>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-text-primary mb-4">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                    1
                  </span>
                  <div>
                    <p className="text-text-primary text-sm font-medium">Upload PDF</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Drag and drop or click to select
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                    2
                  </span>
                  <div>
                    <p className="text-text-primary text-sm font-medium">Extract Facts</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      GPT-4o identifies parties, conflicts, timeline
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                    3
                  </span>
                  <div>
                    <p className="text-text-primary text-sm font-medium">Vector Search</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Semantic matching using OpenAI embeddings
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
                    4
                  </span>
                  <div>
                    <p className="text-text-primary text-sm font-medium">Get Insights</p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Side-by-side comparison and winning arguments
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="font-medium text-text-primary mb-4">The Needle Test</h3>
              <p className="text-text-secondary text-sm mb-3">
                Upload a fact pattern about a &ldquo;leaking roof during a pandemic&rdquo; and
                the system will find cases involving both property damage AND
                extraordinary circumstances (Force Majeure)&mdash;even without those
                exact keywords.
              </p>
              <div className="text-xs text-text-muted italic">
                Semantic understanding over keyword matching.
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-text-muted">
          <p>Powered by OpenAI &bull; Built with Next.js &bull; Database by Prisma</p>
          <p className="font-mono text-xs">v1.0.0</p>
        </div>
      </footer>
    </div>
  );
}
