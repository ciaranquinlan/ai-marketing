"use client";

import { nanoid } from "nanoid";

export interface WorkflowStep {
  skillId: string;
  skillName: string;
  status: "pending" | "running" | "complete" | "skipped";
  output?: string;
  inputs?: Record<string, string>;
}

export interface WorkflowState {
  id: string;
  currentStep: number;
  steps: WorkflowStep[];
  context: Record<string, string>;
  startedAt: string;
  completedAt?: string;
}

const STORAGE_KEY = "ai-marketing-workflow";

// Skill chains: which skills can follow which
export const skillChains: Record<string, string[]> = {
  "positioning-basics": ["content-ideas", "homepage-audit"],
  "content-ideas": ["linkedin-authority"],
  "homepage-audit": ["ai-discoverability"],
  "linkedin-authority": [],
  "ai-discoverability": [],
};

// Starter skills (can begin a workflow)
export const starterSkills = ["positioning-basics", "homepage-audit"];

// Get suggested next skills
export function getNextSkills(currentSkillId: string): string[] {
  return skillChains[currentSkillId] || [];
}

// Check if skill can start a workflow
export function canStartWorkflow(skillId: string): boolean {
  return starterSkills.includes(skillId);
}

// Create a new workflow
export function createWorkflow(firstSkillId: string, firstSkillName: string): WorkflowState {
  const workflow: WorkflowState = {
    id: nanoid(8),
    currentStep: 0,
    steps: [
      {
        skillId: firstSkillId,
        skillName: firstSkillName,
        status: "pending",
      },
    ],
    context: {},
    startedAt: new Date().toISOString(),
  };
  
  saveWorkflow(workflow);
  return workflow;
}

// Add a step to workflow
export function addWorkflowStep(
  workflow: WorkflowState,
  skillId: string,
  skillName: string
): WorkflowState {
  const updatedWorkflow: WorkflowState = {
    ...workflow,
    steps: [
      ...workflow.steps,
      {
        skillId,
        skillName,
        status: "pending",
      },
    ],
  };
  
  saveWorkflow(updatedWorkflow);
  return updatedWorkflow;
}

// Update current step status
export function updateStepStatus(
  workflow: WorkflowState,
  status: WorkflowStep["status"],
  output?: string,
  inputs?: Record<string, string>
): WorkflowState {
  const steps = [...workflow.steps];
  steps[workflow.currentStep] = {
    ...steps[workflow.currentStep],
    status,
    output,
    inputs,
  };

  const updatedWorkflow: WorkflowState = {
    ...workflow,
    steps,
    context: output
      ? { ...workflow.context, [steps[workflow.currentStep].skillId]: output }
      : workflow.context,
  };

  saveWorkflow(updatedWorkflow);
  return updatedWorkflow;
}

// Move to next step
export function nextStep(workflow: WorkflowState): WorkflowState {
  const updatedWorkflow: WorkflowState = {
    ...workflow,
    currentStep: workflow.currentStep + 1,
  };

  saveWorkflow(updatedWorkflow);
  return updatedWorkflow;
}

// Complete workflow
export function completeWorkflow(workflow: WorkflowState): WorkflowState {
  const updatedWorkflow: WorkflowState = {
    ...workflow,
    completedAt: new Date().toISOString(),
  };

  saveWorkflow(updatedWorkflow);
  return updatedWorkflow;
}

// Save workflow to localStorage
export function saveWorkflow(workflow: WorkflowState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workflow));
}

// Load workflow from localStorage
export function loadWorkflow(): WorkflowState | null {
  if (typeof window === "undefined") return null;
  
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  
  try {
    return JSON.parse(saved);
  } catch {
    return null;
  }
}

// Clear workflow
export function clearWorkflow(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Get combined output for export
export function getCombinedOutput(workflow: WorkflowState): string {
  const completedSteps = workflow.steps.filter((s) => s.status === "complete" && s.output);
  
  if (completedSteps.length === 0) return "";
  
  return completedSteps
    .map((step) => `# ${step.skillName}\n\n${step.output}`)
    .join("\n\n---\n\n");
}

// Get context summary for display
export function getContextSummary(workflow: WorkflowState): { key: string; value: string }[] {
  const summary: { key: string; value: string }[] = [];
  
  for (const step of workflow.steps) {
    if (step.status === "complete" && step.inputs) {
      for (const [key, value] of Object.entries(step.inputs)) {
        if (value && value.length < 100) {
          summary.push({ key, value });
        }
      }
    }
  }
  
  return summary.slice(0, 5); // Limit to 5 items
}
