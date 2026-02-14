import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

export default function ShareNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-2xl">🔱</span>
            <span>AI Marketing Skills</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Result Not Found</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            This shared result may have expired or the link is invalid.
            Shared results are available for 30 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/playground">
                Generate Your Own
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
