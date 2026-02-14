import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/skill-card";
import { skills } from "@/lib/skills";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🔱</span>
            <span>AI Marketing Skills</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
              Playground
            </Link>
            <a
              href="https://github.com/BrianRWagner/ai-marketing-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Powered by Agent Skills
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Marketing Frameworks
            <br />
            <span className="text-primary">AI Actually Executes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Stop reading guides. Start getting results. Enter your marketing challenge,
            and watch AI deliver polished, actionable output in real-time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/playground">
                Try It Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a
                href="https://github.com/BrianRWagner/ai-marketing-skills"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Choose a Skill</h3>
              <p className="text-muted-foreground">
                Pick from positioning, content strategy, homepage audits, and more.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Enter Your Details</h3>
              <p className="text-muted-foreground">
                Fill in a simple form with your business context.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Get Expert Output</h3>
              <p className="text-muted-foreground">
                Watch AI execute the framework and export your results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Skills</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each skill is a proven marketing framework, packaged for AI execution.
              Click any skill to try it instantly.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* What are Agent Skills */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">What Are Agent Skills?</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p>
              <strong>Agent Skills</strong> are an{" "}
              <a href="https://agentskills.ai" target="_blank" rel="noopener noreferrer">
                open standard
              </a>{" "}
              for packaging expertise as instructions that AI agents can follow.
            </p>
            <p>
              <strong>Traditional content:</strong> You read it → You apply it → You forget half of it.
            </p>
            <p>
              <strong>Agent Skills:</strong> Your agent reads it → Your agent applies it → Every time. Perfectly.
            </p>
            <p>
              Think of it like giving your AI a playbook written by an expert. Instead of prompting
              from scratch every time, the skill provides the framework, questions, and output
              format automatically.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔱</span>
              <span className="font-semibold">AI Marketing Skills</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://github.com/BrianRWagner/ai-marketing-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://agentskills.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Agent Skills Standard
              </a>
              <a
                href="https://intelliagent.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Built by IntelliAgent
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>
              Skills by{" "}
              <a
                href="https://brianrwagner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Brian Wagner
              </a>
              . Showcase by{" "}
              <a
                href="https://intelliagent.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                IntelliAgent
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
