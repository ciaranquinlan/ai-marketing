import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { getSkill } from "@/lib/skills";
import { NextRequest } from "next/server";

export const runtime = "edge";

// Simple in-memory rate limiting (in production, use Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ skill: string }> }
) {
  const { skill: skillId } = await params;
  const skill = getSkill(skillId);

  if (!skill) {
    return new Response(JSON.stringify({ error: "Skill not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await request.json();
    const { inputs } = body;

    // Build the user prompt from inputs
    const userPrompt = buildUserPrompt(skill, inputs);

    const result = streamText({
      model: anthropic("claude-sonnet-4-20250514"),
      system: skill.systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
      maxOutputTokens: 4000,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Skill execution error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to execute skill" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

function buildUserPrompt(
  skill: ReturnType<typeof getSkill>,
  inputs: Record<string, string>
): string {
  if (!skill) return "";

  const parts: string[] = [];

  for (const field of skill.fields) {
    const value = inputs[field.id];
    if (value && value.trim()) {
      parts.push(`**${field.label}**\n${value.trim()}`);
    }
  }

  return parts.join("\n\n");
}
