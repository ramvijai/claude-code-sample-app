/**
 * scripts/bulk-import.ts
 *
 * One-time comprehensive population of the GenAI Hub directory.
 * Uses Claude with web_search to find ALL notable tools per category —
 * no knowledge cutoff, no artificial limits.
 *
 * Run once to seed the DB with 200+ real tools:
 *   SUPABASE_URL=... SUPABASE_SERVICE_KEY=... ANTHROPIC_API_KEY=... \
 *   npx tsx scripts/bulk-import.ts
 *
 * The weekly sync (sync-tools.ts) then keeps it current going forward.
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

// All categories with search context to guide Claude's web search
const CATEGORIES = [
  {
    id: 'llm',
    label: 'LLMs & Chatbots',
    searchHint: 'large language models, AI chatbots, foundation models, GPT, Claude, Gemini, Llama, Mistral, AI assistants',
  },
  {
    id: 'code-ide',
    label: 'Code IDEs',
    searchHint: 'AI-powered code editors, AI IDEs, coding environments, Cursor, Windsurf, VS Code AI, Zed editor',
  },
  {
    id: 'code-assistant',
    label: 'Code Assistants',
    searchHint: 'AI code completion, AI pair programming, GitHub Copilot, code generation tools, AI coding assistant plugins',
  },
  {
    id: 'image',
    label: 'Image Generation',
    searchHint: 'AI image generators, text to image, Stable Diffusion, Midjourney, DALL-E, AI art tools, image editing AI',
  },
  {
    id: 'video',
    label: 'Video Generation',
    searchHint: 'AI video generation, text to video, Sora, Runway, Pika, AI video editing, video synthesis tools',
  },
  {
    id: 'audio',
    label: 'Voice & Audio',
    searchHint: 'AI voice generation, text to speech, speech to text, ElevenLabs, voice cloning, AI music generation, audio AI tools',
  },
  {
    id: 'agents',
    label: 'AI Agents & Frameworks',
    searchHint: 'AI agents, autonomous AI, LangChain, AutoGPT, CrewAI, agent frameworks, LLM orchestration, workflow automation AI',
  },
  {
    id: 'productivity',
    label: 'Productivity',
    searchHint: 'AI productivity tools, AI writing assistants, AI note-taking, Notion AI, meeting summarizers, AI email tools',
  },
  {
    id: 'vector-db',
    label: 'Vector Databases & RAG',
    searchHint: 'vector databases, RAG frameworks, Pinecone, Weaviate, ChromaDB, Qdrant, embedding stores, LlamaIndex, retrieval augmented generation',
  },
  {
    id: 'api-sdk',
    label: 'APIs & SDKs',
    searchHint: 'AI APIs, LLM APIs, OpenAI API, Anthropic API, Cohere, Mistral API, Together AI, Groq, Replicate, AI model hosting APIs',
  },
  {
    id: 'search',
    label: 'AI Search',
    searchHint: 'AI-powered search engines, conversational search, Perplexity AI, You.com, Phind, AI web search, semantic search tools',
  },
];

const TOOL_SCHEMA = `{
  "id": "unique-slug-no-spaces",
  "name": "Tool Name",
  "company": "Company Name",
  "category": "<category_id>",
  "featured": false,
  "description": "One clear sentence: what it does and who it is for.",
  "tags": ["tag1", "tag2", "tag3"],
  "url": "https://official-website.com",
  "docs_url": "https://docs.example.com",
  "quickstart_url": "https://docs.example.com/quickstart",
  "icon": "single emoji",
  "icon_bg": "#hexcolor",
  "quickstart": "<ol><li><strong>Step 1</strong> — Action.</li><li><strong>Step 2</strong> — Action.</li><li><strong>Step 3</strong> — Action.</li></ol>",
  "howtos": [
    {"title": "How to do X", "content": "Detailed step-by-step..."},
    {"title": "How to do Y", "content": "Detailed step-by-step..."}
  ]
}`;

async function importCategory(
  category: (typeof CATEGORIES)[0],
  existingNames: string[],
): Promise<number> {
  console.log(`\n── ${category.label} ──────────────────────`);
  console.log(`Searching web for: ${category.searchHint}`);

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 16000,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    messages: [
      {
        role: 'user',
        content: `You are building a comprehensive directory of generative AI tools for the category: "${category.label}".

Already in the database (skip these): ${existingNames.length > 0 ? existingNames.join(', ') : 'none yet'}

Your task:
1. Search the web comprehensively using queries like: "${category.searchHint}"
2. Also search: "best ${category.label.toLowerCase()} tools 2024 2025", "top ${category.label.toLowerCase()} list"
3. Compile every notable, production-ready tool in this category that is NOT already in the database above.
4. Include well-known tools, popular open-source projects, and recently launched tools.
5. Aim for at least 20 tools. Include as many as you find that are genuinely relevant.

For each tool return this exact JSON structure:
${TOOL_SCHEMA.replace('<category_id>', category.id)}

Rules:
- category must be exactly: "${category.id}"
- id must be a unique lowercase slug (e.g. "pinecone", "langchain", "stable-diffusion")
- icon_bg should be the brand's primary color as a hex code
- quickstart must be a real, working quickstart (not placeholder text)
- howtos must have 2-3 practical guides with real instructions

Return ONLY a valid JSON array at the very end. No markdown fences around the final array.`,
      },
    ],
  });

  const textBlock = response.content.findLast((b) => b.type === 'text');
  const text = textBlock?.type === 'text' ? textBlock.text.trim() : '';

  if (!text) {
    console.log(`  No response for ${category.label}`);
    return 0;
  }

  let tools: Record<string, unknown>[];
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error(`  Could not find JSON array in response for ${category.label}`);
      return 0;
    }
    tools = JSON.parse(match[0]);
  } catch (e) {
    console.error(`  JSON parse error for ${category.label}:`, e);
    return 0;
  }

  if (!Array.isArray(tools) || tools.length === 0) {
    console.log(`  No tools parsed for ${category.label}`);
    return 0;
  }

  // Filter to only this category
  const filtered = tools.filter((t) => t.category === category.id);
  console.log(`  Found ${tools.length} tools (${filtered.length} valid category match)`);

  if (filtered.length === 0) return 0;

  const { error } = await supabase
    .from('tools')
    .upsert(filtered, { onConflict: 'id' });

  if (error) {
    console.error(`  Upsert error for ${category.label}:`, error.message);
    return 0;
  }

  console.log(`  ✓ Saved: ${filtered.map((t) => t.name).join(', ')}`);
  return filtered.length;
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  GenAI Hub — Bulk Import');
  console.log('  Searching the web for ALL generative AI tools');
  console.log('═══════════════════════════════════════════');

  // Get existing names to avoid duplicates
  const { data: existing } = await supabase.from('tools').select('name');
  const existingNames = (existing ?? []).map((t) => t.name as string);
  console.log(`\nStarting with ${existingNames.length} existing tools in DB.`);

  let totalAdded = 0;

  for (const category of CATEGORIES) {
    try {
      const added = await importCategory(category, existingNames);
      totalAdded += added;

      // Re-fetch existing names after each category to pass updated list
      const { data: updated } = await supabase.from('tools').select('name');
      existingNames.length = 0;
      existingNames.push(...(updated ?? []).map((t) => t.name as string));

      // Wait between categories to respect the 30,000 input tokens/minute rate limit.
      // Web search responses can be very large (~20k tokens each), so we wait 7 minutes.
      if (category !== CATEGORIES[CATEGORIES.length - 1]) {
        console.log('  Waiting 7 minutes before next category (rate limit)...');
        await new Promise((r) => setTimeout(r, 420000));
      }
    } catch (err) {
      console.error(`  Error processing ${category.label}:`, err);
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`  Bulk import complete. Total added: ${totalAdded} tools`);

  const { count } = await supabase
    .from('tools')
    .select('*', { count: 'exact', head: true });
  console.log(`  Total tools now in DB: ${count}`);
  console.log('═══════════════════════════════════════════');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
