"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/lib/skills";

const categoryColors = {
  strategy: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  content: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  conversion: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

const categoryLabels = {
  strategy: "Strategy",
  content: "Content",
  conversion: "Conversion",
};

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/playground/${skill.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <span className="text-4xl">{skill.icon}</span>
            <Badge variant="secondary" className={categoryColors[skill.category]}>
              {categoryLabels[skill.category]}
            </Badge>
          </div>
          <CardTitle className="mt-3">{skill.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {skill.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {skill.inputType === "url" && (
              <span className="flex items-center gap-1">
                🔗 URL input
              </span>
            )}
            {skill.inputType === "text" && (
              <span className="flex items-center gap-1">
                ✏️ Text input
              </span>
            )}
            {skill.inputType === "mixed" && (
              <span className="flex items-center gap-1">
                🔗 URL + Text
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
