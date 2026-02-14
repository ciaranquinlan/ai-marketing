import Link from "next/link";
import { SkillCard } from "@/components/skill-card";
import { skills, getSkillsByCategory } from "@/lib/skills";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PlaygroundPage() {
  const strategySkills = getSkillsByCategory("strategy");
  const contentSkills = getSkillsByCategory("content");
  const conversionSkills = getSkillsByCategory("conversion");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🔱</span>
            <span>AI Marketing Skills</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Choose a Skill</h1>
            <p className="text-muted-foreground">
              Select a marketing framework to run. Each skill guides you through
              specific inputs and delivers expert-level output.
            </p>
          </div>

          {/* Strategy Skills */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Strategy & Positioning
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategySkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          {/* Content Skills */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Content & Authority
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          {/* Conversion Skills */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Conversion & Sales
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversionSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          {/* Multi-skill workflow hint */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <h3 className="font-semibold mb-2">💡 Pro Tip: Chain Skills Together</h3>
            <p className="text-muted-foreground text-sm">
              Start with Positioning Basics, then use your positioning to generate
              Content Ideas, then build your LinkedIn strategy. Each skill can feed into the next.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
