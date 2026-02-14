import { track } from "@vercel/analytics";

export interface SkillEvent {
  skillId: string;
  source?: "direct" | "workflow";
}

export interface SkillCompletedEvent extends SkillEvent {
  durationMs: number;
  outputLength: number;
}

export interface SkillExportedEvent extends SkillEvent {
  format: "clipboard" | "markdown" | "pdf";
}

export interface SkillErrorEvent extends SkillEvent {
  errorType: string;
  errorMessage?: string;
}

export const analytics = {
  skillStarted: (event: SkillEvent) => {
    track("skill_started", event);
  },

  skillCompleted: (event: SkillCompletedEvent) => {
    track("skill_completed", event);
  },

  skillExported: (event: SkillExportedEvent) => {
    track("skill_exported", event);
  },

  skillError: (event: SkillErrorEvent) => {
    track("skill_error", event);
  },

  ctaClicked: (ctaType: "intelliagent" | "contact" | "github") => {
    track("cta_clicked", { ctaType });
  },

  shareCreated: (skillId: string) => {
    track("share_created", { skillId });
  },

  shareViewed: (shareId: string, skillId: string) => {
    track("share_viewed", { shareId, skillId });
  },

  workflowStarted: (workflowId: string, firstSkillId: string) => {
    track("workflow_started", { workflowId, firstSkillId });
  },

  workflowCompleted: (
    workflowId: string,
    stepsCompleted: number,
    totalMs: number
  ) => {
    track("workflow_completed", { workflowId, stepsCompleted, totalMs });
  },
};
