import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export interface ExtractedFacts {
  parties: string[];
  coreConflict: string;
  timeline: string[];
  keywords: string[];
}

export async function extractFactsFromText(text: string): Promise<ExtractedFacts> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a legal document analyst. Extract structured facts from legal case text.
Return a JSON object with these exact fields:
- parties: array of strings describing each party (e.g., "Plaintiff: John Doe", "Defendant: TechCorp Inc.")
- coreConflict: a concise string describing the primary legal disagreement
- timeline: array of strings with key dates/events in chronological order
- keywords: array of specific legal terms found (e.g., "Force Majeure", "Estoppel", "Breach of Contract")

Return ONLY valid JSON, no markdown formatting or explanation.`,
      },
      {
        role: "user",
        content: `Extract the facts from this legal document:\n\n${text.slice(0, 8000)}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  return JSON.parse(content) as ExtractedFacts;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    dimensions: 1536,
  });

  return response.data[0]?.embedding ?? [];
}

export async function generateStrategyMemo(
  extractedFacts: ExtractedFacts,
  precedents: Array<{
    caseName: string;
    citation: string;
    factSummary: string;
    winningArgument: string;
    similarityScore: number;
  }>
): Promise<string> {
  const client = getOpenAIClient();
  const precedentsText = precedents
    .map(
      (p, i) => `
CASE ${i + 1}: ${p.caseName} (${p.citation})
Similarity: ${(p.similarityScore * 100).toFixed(0)}%
Facts: ${p.factSummary}
Winning Argument: ${p.winningArgument}
`
    )
    .join("\n---\n");

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are a senior legal research analyst. Given a user's case facts and similar precedents, generate a strategic legal memo.
The memo should include:
1. A side-by-side comparison table showing how the user's facts align with each precedent
2. A "Winning Argument" section that synthesizes insights from the matched cases
3. Key legal principles that support the user's case

Format the output in clean markdown. Use tables where appropriate.`,
      },
      {
        role: "user",
        content: `USER'S EXTRACTED FACTS:
Parties: ${extractedFacts.parties.join(", ")}
Core Conflict: ${extractedFacts.coreConflict}
Timeline: ${extractedFacts.timeline.join(" → ")}
Keywords: ${extractedFacts.keywords.join(", ")}

RELEVANT PRECEDENTS:
${precedentsText}

Generate the strategy memo.`,
      },
    ],
    temperature: 0.5,
  });

  return response.choices[0]?.message?.content ?? "Failed to generate memo.";
}
