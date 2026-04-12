"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { renderMarkdown } from "@/lib/memo-markdown";
import { useEffect, useRef, useState } from "react";

interface MemoViewProps {
  readonly content: string;
}

export function MemoView({ content }: MemoViewProps) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);

    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }

    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
      copyTimeoutRef.current = null;
    }, 2000);
  };

  return (
    <Card className="bg-surface border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border">
        <CardTitle className="font-serif text-lg">Strategy Memo</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-text-secondary hover:text-text-primary"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-accent" />
              <span className="text-accent">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="prose prose-invert prose-sm max-w-none">
          {renderMarkdown(content)}
        </div>
      </CardContent>
    </Card>
  );
}
