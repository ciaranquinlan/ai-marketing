"use client";

import { Check, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkflowState } from "@/lib/workflow";

interface WorkflowStepperProps {
  workflow: WorkflowState;
  className?: string;
}

export function WorkflowStepper({ workflow, className }: WorkflowStepperProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {workflow.steps.map((step, index) => {
        const isComplete = step.status === "complete";
        const isRunning = step.status === "running";
        const isCurrent = index === workflow.currentStep;
        const isPending = step.status === "pending" && !isCurrent;

        return (
          <div key={step.skillId} className="flex items-center gap-2">
            {index > 0 && (
              <div
                className={cn(
                  "w-8 h-0.5",
                  isComplete ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isComplete && "bg-primary text-primary-foreground",
                  isRunning && "bg-primary/20 text-primary",
                  isCurrent && !isRunning && "bg-primary/10 text-primary border-2 border-primary",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:block",
                  isComplete && "text-primary",
                  isCurrent && "text-foreground",
                  isPending && "text-muted-foreground"
                )}
              >
                {step.skillName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
