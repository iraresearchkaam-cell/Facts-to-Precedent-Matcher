# Facts-to-Precedent Matcher 

AI-powered legal research tool that uses RAG (Retrieval-Augmented Generation) to match case fact patterns against a precedents database.

## Features

- **PDF Upload & Processing**: Drag-and-drop interface for legal documents
- **Fact Extraction**: GPT-4o extracts parties, core conflicts, timeline, and legal keywords
- **Vector Search**: Semantic matching using OpenAI embeddings (1536 dimensions)
- **Similarity Matching**: Cosine similarity search against precedent database
- **Strategy Memo**: AI-generated comparison and winning arguments

## Architecture

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Shadcn/UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Prisma
- **AI**: OpenAI gpt-4o + text-embedding-3-small

## Getting Started
##INSTRUCTION TO INSTALL DB
docker run -d  --name postgres-pgvector  -e POSTGRES_PASSWORD=password  -p 5432:5432  ankane/pgvector

CREATE DATABASE mydb;

(in db command)
\c mydb

CREATE EXTENSION vector;

(exit db command - \q)
 npm run db:push

### Prerequisites

- Node.js 18+
- PostgreSQL 15+ with pgvector extension
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your database URL and OpenAI key
# DATABASE_URL=postgresql://user:password@localhost:5432/precedent_matcher
# OPENAI_API_KEY=sk-your-key-here

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample precedents
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

Enable pgvector extension in PostgreSQL:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | Your OpenAI API key |

## The Needle Test

Upload a fact pattern about a "leaking roof during a pandemic" and the system will find cases involving both property damage AND extraordinary circumstances (Force Majeure)—even without those exact keywords.

## License

MIT
