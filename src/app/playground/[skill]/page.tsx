"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useCompletion } from "@ai-sdk/react";
import { getSkill, skills } from "@/lib/skills";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { StreamingOutput } from "@/components/streaming-output";
import { ArrowLeft, ArrowRight, Play, RotateCcw } from "lucide-react";
import { analytics } from "@/lib/analytics";

export default function SkillPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.skill as string;
  const skill = getSkill(skillId);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [hasRun, setHasRun] = useState(false);
  const startTimeRef = useRef<number>(0);
  const hasTrackedCompletion = useRef(false);

  const { completion, isLoading, complete, setCompletion } = useCompletion({
    api: `/api/skills/${skillId}`,
    body: { inputs },
    onError: (error) => {
      analytics.skillError({
        skillId,
        errorType: "api_error",
        errorMessage: error.message,
      });
    },
  });

  // Track completion when streaming finishes
  useEffect(() => {
    if (!isLoading && completion && hasRun && !hasTrackedCompletion.current) {
      const durationMs = Date.now() - startTimeRef.current;
      analytics.skillCompleted({
        skillId,
        source: "direct",
        durationMs,
        outputLength: completion.length,
      });
      hasTrackedCompletion.current = true;
    }
  }, [isLoading, completion, hasRun, skillId]);

  const handleInputChange = useCallback((fieldId: string, value: string) => {
    setInputs((prev) => ({ ...prev, [fieldId]: value }));
  }, []);

  const handleRun = useCallback(async () => {
    if (!skill) return;
    
    // Validate required fields
    const missingRequired = skill.fields
      .filter((f) => f.required && !inputs[f.id]?.trim())
      .map((f) => f.label);

    if (missingRequired.length > 0) {
      alert(`Please fill in: ${missingRequired.join(", ")}`);
      return;
    }

    // Track skill started
    startTimeRef.current = Date.now();
    hasTrackedCompletion.current = false;
    analytics.skillStarted({ skillId, source: "direct" });

    setHasRun(true);
    await complete("", { body: { inputs } });
  }, [skill, inputs, complete, skillId]);

  const handleReset = useCallback(() => {
    setInputs({});
    setCompletion("");
    setHasRun(false);
  }, [setCompletion]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(completion);
    analytics.skillExported({ skillId, format: "clipboard" });
  }, [completion, skillId]);

  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([completion], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skillId}-output.md`;
    a.click();
    URL.revokeObjectURL(url);
    analytics.skillExported({ skillId, format: "markdown" });
  }, [completion, skillId]);

  const handleShare = useCallback(async (): Promise<string | null> => {
    if (!skill || !completion) return null;
    
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skillId,
          skillName: skill.name,
          input: inputs,
          output: completion,
        }),
      });
      
      if (!response.ok) return null;
      
      const { shareId } = await response.json();
      analytics.shareCreated(skillId);
      return shareId;
    } catch {
      return null;
    }
  }, [skill, skillId, inputs, completion]);

  const handleExportPDF = useCallback(() => {
    analytics.skillExported({ skillId, format: "pdf" });
    // Simple print-to-PDF approach
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${skill?.name} Output</title>
          <style>
            body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }
            h1 { color: #0D99FF; }
            h2 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; }
            h3 { color: #555; }
            ul, ol { padding-left: 24px; }
            li { margin: 4px 0; }
          </style>
        </head>
        <body>
          <h1>${skill?.name}</h1>
          ${completion.split("\n").map(line => {
            if (line.startsWith("## ")) return `<h2>${line.slice(3)}</h2>`;
            if (line.startsWith("### ")) return `<h3>${line.slice(4)}</h3>`;
            if (line.startsWith("- ")) return `<li>${line.slice(2)}</li>`;
            if (line.trim() === "") return "<br/>";
            return `<p>${line}</p>`;
          }).join("")}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }, [completion, skill?.name]);

  // Find next skill suggestion
  const currentIndex = skills.findIndex((s) => s.id === skillId);
  const nextSkill = skills[(currentIndex + 1) % skills.length];

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
          <Button asChild>
            <Link href="/playground">Back to Playground</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/playground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Skills
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{skill.icon}</span>
              <span className="font-semibold">{skill.name}</span>
            </div>
          </div>
          {hasRun && completion && !isLoading && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/playground/${nextSkill.id}`}>
                Next: {nextSkill.name}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Input Panel */}
          <Card className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {skill.icon} {skill.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {skill.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {skill.inputType === "url" ? "URL" : skill.inputType === "mixed" ? "URL + Text" : "Text"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {skill.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    {field.label}
                    {field.required && <span className="text-destructive">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      value={inputs[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      rows={3}
                      disabled={isLoading}
                    />
                  ) : (
                    <Input
                      type={field.type === "url" ? "url" : "text"}
                      placeholder={field.placeholder}
                      value={inputs[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      disabled={isLoading}
                    />
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleRun}
                  disabled={isLoading}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>Running...</>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Skill
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <StreamingOutput
            content={completion}
            isStreaming={isLoading}
            onCopy={handleCopy}
            onExportMarkdown={handleExportMarkdown}
            onExportPDF={handleExportPDF}
            onShare={handleShare}
          />
        </div>
      </main>
    </div>
  );
}
