# Facts-to-Precedent Matcher — Specification

## 1. Concept & Vision

A sophisticated legal RAG (Retrieval-Augmented Generation) application that transforms uploaded case PDFs into semantic fact patterns, matches them against a precedents database using vector similarity, and generates strategic legal memos. The experience should feel like having a senior partner's research assistant — intelligent, precise, and authoritative. The interface communicates trust through restrained professionalism: deep navy tones, serif typography for legal gravitas, and crisp data tables.

---

## 2. Design Language

### Aesthetic Direction
Legal-tech precision meets modern SaaS clarity. Think: Clio meets Linear. Clean, data-dense interfaces with a dark professional palette. No decorative flourishes — every element serves a purpose.

### Color Palette
```
--background:      #0A0F1C    (Deep navy black)
--surface:         #111827    (Elevated surface)
--surface-raised:  #1F2937    (Cards, dropzone)
--border:          #374151    (Subtle borders)
--border-active:   #3B82F6    (Focus/active states)
--primary:         #3B82F6    (Action blue)
--primary-hover:   #2563EB
--accent:          #10B981    (Success green for high similarity)
--warning:         #F59E0B    (Medium similarity)
--text-primary:    #F9FAFB    (White text)
--text-secondary:  #9CA3AF    (Muted text)
--text-muted:      #6B7280
```

### Typography
- **Headings**: `Crimson Pro` (serif) — legal gravitas
- **Body/UI**: `Inter` — clean, highly legible
- **Monospace** (scores, codes): `JetBrains Mono`

### Spatial System
- Base unit: 4px
- Component padding: 16px / 24px
- Section gaps: 32px / 48px
- Border radius: 8px (cards), 6px (inputs), 4px (badges)

### Motion Philosophy
- **Functional transitions only**: 150ms ease-out for hover states, 200ms for panel reveals
- **Progress indicators**: Smooth indeterminate shimmer during analysis
- **No decorative animations** — this is a professional tool

### Visual Assets
- **Icons**: Lucide React (consistent 1.5px stroke)
- **No images** — data visualization through tables and metrics
- **Decorative**: Subtle gradient overlays on hero areas

---

## 3. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo + App Name          [History] [Settings]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │           MAIN ANALYSIS INTERFACE               │   │
│  │  ┌───────────────────────────────────────────┐  │   │
│  │  │         PDF DROPZONE (hero area)          │  │   │
│  │  │   Drag & drop or click to upload          │  │   │
│  │  │         [Browse Files]                    │  │   │
│  │  └───────────────────────────────────────────┘  │   │
│  │                                                 │   │
│  │  ┌─ ANALYSIS PROGRESS ──────────────────────┐   │   │
│  │  │  ○ Extracting facts...                   │   │   │
│  │  │  ○ Vectorizing...                        │   │   │
│  │  │  ○ Searching precedents...               │   │   │
│  │  │  ○ Generating memo...                    │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ RESULTS PANEL ──────────────────────────────────┐   │
│  │  Extracted Facts Card (collapsible)              │   │
│  │  ┌─────────────────────────────────────────────┐ │   │
│  │  │  Parties: ...  |  Core Conflict: ...       │ │   │
│  │  │  Timeline: ...  |  Keywords: [...]         │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  │                                                   │   │
│  │  Similarity Results Table (Shadcn UI)           │   │
│  │  ┌─────────────────────────────────────────────┐ │   │
│  │  │ Case Name    │ Citation  │ Score │ Match % │ │   │
│  │  │──────────────│───────────│───────│─────────│ │   │
│  │  │ Smith v. Acme │ 2024 NY.. │ 0.94  │  94%    │ │   │
│  │  │ ...           │ ...       │ ...   │  ...    │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  │                                                   │   │
│  │  Strategy Memo (GPT generated)                   │   │
│  │  ┌─────────────────────────────────────────────┐ │   │
│  │  │  Side-by-side comparison table + summary    │ │   │
│  │  └─────────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────────┘   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Footer: Powered by OpenAI + Prisma                     │
└─────────────────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1024px+)**: Full layout with side-by-side comparisons
- **Tablet (768px-1023px)**: Stacked layout, full-width cards
- **Mobile (< 768px)**: Single column, collapsible sections

---

## 4. Features & Interactions

### Core Features

#### A. PDF Upload & Processing
- **Dropzone**: Drag-and-drop zone with visual feedback (border glow on hover)
- **File validation**: Accept only `.pdf`, max 10MB
- **Loading state**: Shimmer effect on dropzone during processing
- **Error handling**: Toast notification for invalid files

#### B. Fact Extraction (gpt-4o)
- **System prompt**: Structured extraction of Parties, CoreConflict, Timeline, Keywords
- **Output**: JSON with the four required fields
- **Error handling**: Graceful degradation if extraction fails

#### C. Vectorization (text-embedding-3-small)
- **Dimension**: 1536-dimensional vectors
- **Storage**: PostgreSQL with pgvector extension

#### D. Similarity Search
- **Algorithm**: Cosine similarity (`<=>` operator in pgvector)
- **Top results**: 5 most similar precedents
- **Score display**: Percentage match (e.g., "94%")

#### E. Strategy Memo Generation
- **Input**: User's extracted facts + Top 5 precedent cases
- **Output**: Side-by-side comparison table + winning argument summary
- **Format**: Markdown rendered as styled HTML

### Interaction Details

| Action | Response |
|--------|----------|
| Drag file over dropzone | Border turns blue, background lightens |
| Drop valid PDF | Progress steps appear sequentially |
| Drop invalid file | Red border flash + error toast |
| Click case row | Expand to show full case details |
| Hover similarity score | Tooltip with breakdown |
| Copy memo | Click-to-copy button with confirmation |

### Edge Cases
- **Empty PDF**: "No text extracted. Please upload a readable PDF."
- **No similar cases found**: "No precedents found above 50% similarity. Try a more detailed case description."
- **API timeout**: Retry with exponential backoff, max 3 attempts
- **Database connection failure**: Error state with retry button

---

## 5. Component Inventory

### DropZone
- **Default**: Dashed border, muted icon, "Drag & drop PDF" text
- **Hover**: Solid border, primary color, elevated background
- **Dragging**: Pulsing border animation
- **Processing**: Shimmer overlay with "Analyzing..." text
- **Error**: Red border, error icon, error message

### ProgressSteps
- **States per step**: pending (gray circle), active (blue spinning), complete (green check), error (red X)
- **Animation**: Steps reveal sequentially with 200ms stagger

### FactCard
- **Collapsed**: Single line summary with chevron
- **Expanded**: Full JSON structure in styled blocks
- **Keywords**: Pill badges with subtle background

### ResultsTable (Shadcn Table)
- **Headers**: Sticky, sortable columns
- **Rows**: Hover highlight, click to expand
- **Score column**: Color-coded (green >80%, yellow 60-80%, red <60%)
- **Empty state**: Illustrated empty state with guidance text

### MemoView
- **Container**: Elevated card with subtle border
- **Header**: "Strategy Memo" with copy button
- **Content**: Rendered markdown with styled tables
- **Loading**: Skeleton placeholder

### Toast Notifications
- **Success**: Green accent, checkmark icon
- **Error**: Red accent, X icon
- **Info**: Blue accent, info icon
- **Duration**: 4 seconds, dismissible

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with pgvector
- **ORM**: Prisma
- **AI**: OpenAI gpt-4o + text-embedding-3-small
- **UI**: Tailwind CSS + Shadcn/UI
- **PDF Parsing**: pdf-parse

### API Design

#### `POST /api/analyze`
**Request**: `multipart/form-data` with PDF file
**Response**:
```json
{
  "extractedFacts": {
    "parties": ["Plaintiff: John Doe", "Defendant: TechCorp"],
    "coreConflict": "Breach of lease agreement due to failure to maintain premises",
    "timeline": ["2021-03: Lease signed", "2023-01: Roof leak reported", "..."],
    "keywords": ["Force Majeure", "Breach", "Lease", "Property Damage"]
  },
  "precedents": [
    {
      "caseName": "Johnson v. Metropolitan",
      "citation": "2023 NY 456",
      "similarityScore": 0.94,
      "matchPercentage": 94,
      "factSummary": "Similar property damage case during pandemic..."
    }
  ],
  "comparisonMemo": "# Strategy Memo\n\n## Side-by-Side Comparison\n\n..."
}
```

#### `GET /api/history`
Returns user's previous searches (paginated)

#### `GET /api/precedents/[id]`
Returns full precedent case details

### Data Model

See schema.prisma in specification document.

### Environment Variables
```
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
```

### Key Implementation Notes
- PDF text extraction via `pdf-parse` library
- Raw SQL query for vector similarity: `ORDER BY "factEmbedding" <=> $1 LIMIT 5`
- Streaming responses for long生成 operations
- Server-side processing only (no client-side API key exposure)
