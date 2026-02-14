"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileText, Loader2, Share2, Check } from "lucide-react";

interface StreamingOutputProps {
  content: string;
  isStreaming: boolean;
  onCopy: () => void;
  onExportMarkdown: () => void;
  onExportPDF: () => void;
  onShare?: () => Promise<string | null>;
}

export function StreamingOutput({
  content,
  isStreaming,
  onCopy,
  onExportMarkdown,
  onExportPDF,
  onShare,
}: StreamingOutputProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto-scroll while streaming
  useEffect(() => {
    if (isStreaming && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content, isStreaming]);

  const hasContent = content.length > 0;

  const handleShare = async () => {
    if (!onShare) return;
    setIsSharing(true);
    try {
      const shareId = await onShare();
      if (shareId) {
        const url = `${window.location.origin}/r/${shareId}`;
        setShareUrl(url);
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {isStreaming && <Loader2 className="h-4 w-4 animate-spin" />}
          Output
        </CardTitle>
        {hasContent && !isStreaming && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onCopy}>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={onExportMarkdown}>
              <FileText className="h-4 w-4 mr-1" />
              MD
            </Button>
            <Button variant="outline" size="sm" onClick={onExportPDF}>
              <Download className="h-4 w-4 mr-1" />
              PDF
            </Button>
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                disabled={isSharing}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : isSharing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div
          ref={contentRef}
          className="h-full overflow-y-auto rounded-lg bg-muted/50 p-4"
        >
          {!hasContent && !isStreaming && (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Fill in the form and click &quot;Run&quot; to see results</p>
            </div>
          )}
          {hasContent && (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <MarkdownContent content={content} isStreaming={isStreaming} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MarkdownContent({ content, isStreaming }: { content: string; isStreaming: boolean }) {
  // Simple markdown rendering - in production use react-markdown
  const lines = content.split("\n");
  
  return (
    <div className={isStreaming ? "streaming-cursor" : ""}>
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-xl font-bold mt-6 mb-3 text-primary">{line.slice(3)}</h2>;
        }
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
        }
        // Bold text
        if (line.startsWith("**") && line.endsWith("**")) {
          return <p key={i} className="font-semibold mt-2">{line.slice(2, -2)}</p>;
        }
        // List items
        if (line.startsWith("- ")) {
          return <li key={i} className="ml-4">{formatInlineMarkdown(line.slice(2))}</li>;
        }
        if (/^\d+\.\s/.test(line)) {
          return <li key={i} className="ml-4 list-decimal">{formatInlineMarkdown(line.replace(/^\d+\.\s/, ""))}</li>;
        }
        // Empty lines
        if (line.trim() === "") {
          return <br key={i} />;
        }
        // Regular paragraphs
        return <p key={i} className="my-1">{formatInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

function formatInlineMarkdown(text: string): React.ReactNode {
  // Handle **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
