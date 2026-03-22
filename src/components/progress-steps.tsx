"use client";

import { CheckCircle, Circle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "active" | "complete" | "error";

interface Step {
  label: string;
  status: StepStatus;
}

interface ProgressStepsProps {
  steps: Step[];
}

const icons = {
  pending: Circle,
  active: Loader2,
  complete: CheckCircle,
  error: XCircle,
};

export function ProgressSteps({ steps }: ProgressStepsProps) {
  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const Icon = icons[step.status];
        const isLast = index === steps.length - 1;

        return (
          <div key={step.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  step.status === "active" && "bg-primary/20",
                  step.status === "complete" && "bg-accent/20",
                  step.status === "error" && "bg-red-500/20",
                  step.status === "pending" && "bg-surface-raised"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    step.status === "active" && "text-primary animate-spin",
                    step.status === "complete" && "text-accent",
                    step.status === "error" && "text-red-500",
                    step.status === "pending" && "text-text-muted"
                  )}
                />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-px h-6 mt-1",
                    steps[index + 1]?.status === "complete"
                      ? "bg-accent"
                      : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm transition-colors",
                step.status === "active" && "text-text-primary font-medium",
                step.status === "complete" && "text-text-secondary",
                step.status === "error" && "text-red-500",
                step.status === "pending" && "text-text-muted"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
