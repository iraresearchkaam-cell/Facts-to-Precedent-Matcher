"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PrecedentResult {
  id: string;
  caseName: string;
  citation: string;
  similarityScore: number;
  factSummary: string;
  winningArgument: string;
}

interface ResultsTableProps {
  results: PrecedentResult[];
  onSelectCase?: (caseId: string) => void;
}

function getMatchColor(score: number): string {
  if (score >= 0.85) return "text-accent bg-accent/10";
  if (score >= 0.7) return "text-warning bg-warning/10";
  return "text-text-secondary bg-surface-raised";
}

function getMatchLabel(score: number): string {
  if (score >= 0.85) return "Strong";
  if (score >= 0.7) return "Moderate";
  return "Weak";
}

export function ResultsTable({
  results,
  onSelectCase,
}: Readonly<ResultsTableProps>) {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-text-secondary mb-2">No matching precedents found</p>
        <p className="text-text-muted text-sm">
          Try uploading a more detailed case description
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-surface-raised hover:bg-surface-raised">
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Case Name</TableHead>
            <TableHead>Citation</TableHead>
            <TableHead className="text-center">Match</TableHead>
            <TableHead className="text-center">Strength</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow
              key={result.id}
              className="cursor-pointer"
              onClick={() => onSelectCase?.(result.id)}
            >
              <TableCell className="font-mono text-text-muted">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium text-text-primary">
                {result.caseName}
              </TableCell>
              <TableCell className="font-mono text-text-secondary text-sm">
                {result.citation}
              </TableCell>
              <TableCell className="text-center">
                <span className="font-mono font-medium text-text-primary">
                  {(result.similarityScore * 100).toFixed(0)}%
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  className={cn(
                    "border-0",
                    getMatchColor(result.similarityScore)
                  )}
                >
                  {getMatchLabel(result.similarityScore)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
