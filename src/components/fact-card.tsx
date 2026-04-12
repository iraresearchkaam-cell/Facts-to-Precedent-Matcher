"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { ExtractedFacts } from "@/lib/openai";

interface FactCardProps {
  readonly facts: ExtractedFacts;
}

export function FactCard({ facts }: FactCardProps) {
  const partyKeys = new Map<string, number>();
  const timelineKeys = new Map<string, number>();
  const keywordKeys = new Map<string, number>();

  const getItemKey = (value: string, keyMap: Map<string, number>) => {
    const normalizedValue = value.trim();
    const count = (keyMap.get(normalizedValue) ?? 0) + 1;
    keyMap.set(normalizedValue, count);
    return `${normalizedValue}-${count}`;
  };

  return (
    <Accordion type="single" collapsible defaultValue="summary">
      <AccordionItem value="summary" className="border-0">
        <AccordionTrigger className="hover:no-underline px-4 bg-surface-raised rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-text-primary font-medium">Extracted Facts</span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
              {facts.keywords.length} keywords
            </Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4">
            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Parties</h4>
              <ul className="space-y-1">
                {facts.parties.map((party) => (
                  <li key={getItemKey(party, partyKeys)} className="text-text-primary text-sm">
                    {party}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Core Conflict</h4>
              <p className="text-text-primary text-sm">{facts.coreConflict}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Timeline</h4>
              <ol className="space-y-1">
                {facts.timeline.map((event, eventIndex) => (
                  <li key={getItemKey(event, timelineKeys)} className="text-text-primary text-sm flex gap-2">
                    <span className="text-text-muted shrink-0">{eventIndex + 1}.</span>
                    <span>{event}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-secondary mb-2">Legal Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {facts.keywords.map((keyword) => (
                  <Badge
                    key={getItemKey(keyword, keywordKeys)}
                    variant="outline"
                    className="border-primary/30 text-primary"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
