"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface MemoViewProps {
  content: string;
}

export function MemoView({ content }: MemoViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: JSX.Element[] = [];
    let inTable = false;
    let tableRows: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith("|") && line.endsWith("|")) {
        if (!inTable) {
          inTable = true;
        }
        tableRows.push(line);
      } else {
        if (inTable && tableRows.length > 0) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-4">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-raised">
                    {tableRows[0].split("|").filter(c => c.trim()).map((cell, j) => (
                      <th key={j} className="px-4 py-2 text-left font-medium text-text-secondary border-b border-border">
                        {cell.trim()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.slice(2).map((row, j) => (
                    <tr key={j} className="border-b border-border last:border-0">
                      {row.split("|").filter(c => c.trim()).map((cell, k) => (
                        <td key={k} className="px-4 py-2 text-text-primary">
                          {cell.trim()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          tableRows = [];
          inTable = false;
        }

        if (line.startsWith("# ")) {
          elements.push(
            <h1 key={i} className="font-serif text-2xl font-bold text-text-primary mt-8 mb-4 first:mt-0">
              {line.slice(2)}
            </h1>
          );
        } else if (line.startsWith("## ")) {
          elements.push(
            <h2 key={i} className="font-serif text-xl font-semibold text-text-primary mt-6 mb-3">
              {line.slice(3)}
            </h2>
          );
        } else if (line.startsWith("### ")) {
          elements.push(
            <h3 key={i} className="font-serif text-lg font-medium text-text-primary mt-4 mb-2">
              {line.slice(4)}
            </h3>
          );
        } else if (line.startsWith("**") && line.endsWith("**")) {
          elements.push(
            <p key={i} className="font-semibold text-text-primary my-3">
              {line.slice(2, -2)}
            </p>
          );
        } else if (line.startsWith("- ")) {
          elements.push(
            <li key={i} className="text-text-primary ml-4 my-1">
              {line.slice(2)}
            </li>
          );
        } else if (line.trim() === "") {
          elements.push(<div key={i} className="h-2" />);
        } else if (line.trim()) {
          elements.push(
            <p key={i} className="text-text-primary my-2 leading-relaxed">
              {line}
            </p>
          );
        }
      }
    }

    if (tableRows.length > 0 && inTable) {
      elements.push(
        <div key="table-end" className="overflow-x-auto my-4">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <tbody>
              {tableRows.map((row, j) => (
                <tr key={j} className="border-b border-border last:border-0">
                  {row.split("|").filter(c => c.trim()).map((cell, k) => (
                    <td key={k} className="px-4 py-2 text-text-primary">
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return elements;
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
