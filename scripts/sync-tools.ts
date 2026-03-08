/**
 * scripts/sync-tools.ts
 *
 * Weekly AI-powered tool discovery job with real-time web search.
 * Runs via GitHub Actions cron (see .github/workflows/sync-tools.yml).
 *
 * What it does:
 *  1. Fetches all existing tool names from Supabase
 *  2. Asks Claude to SEARCH THE WEB for new AI tools launched recently
 *     (uses claude-sonnet-4-5 with built-in web_search tool — no knowledge cutoff)
 *  3. Upserts confirmed tools into Supabase
 *  4. Triggers a Vercel deploy webhook so the live site rebuilds with new data
 *
 * Required env vars (set as GitHub Actions secrets):
 *   ANTHROPIC_API_KEY    — Anthropic API key
 *   SUPABASE_URL         — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Supabase service-role key (write access)
 *   VERCEL_DEPLOY_HOOK   — Vercel deploy hook URL (optional but recommended)
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const VALID_CATEGORIES = [
  'llm',
  'code-ide',
  'code-assistant',
  'image',
  'video',
  'audio',
  'agents',
  'productivity',
];

async function main() {
  // 1. Get existing tool names so Claude skips what we already have
  const { data: existing, error: fetchError } = await supabase
    .from('tools')
    .select('id, name');

  if (fetchError) {
    console.error('Failed to fetch existing tools:', fetchError.message);
    process.exit(1);
  }

  const existingNames = (existing ?? []).map((t) => t.name).join(', ');
  console.log(`Found ${existing?.length ?? 0} existing tools in DB.`);

  // 2. Ask Claude to search the web for newly launched AI tools
  // claude-sonnet-4-5 supports the web_search tool — giving real-time discovery
  // with no training knowledge cutoff limitation.
  console.log('Asking Claude to search the web for new AI tools...');

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 8192,
    tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    messages: [
      {
        role: 'user',
        content: `You are the curator of GenAI Hub — a live directory of generative AI tools.

Already tracked (skip these): ${existingNames}

Your task:
1. Search the web for AI tools, IDEs, coding assistants, image generators, video AI, audio AI, AI agents, and productivity tools that have launched or had major updates recently.
2. Search queries to use: "new AI tools ${new Date().getFullYear()}", "best generative AI tools", "new AI coding assistant", "new AI image generator", "AI agent frameworks", etc.
3. From your search results, identify up to 10 tools NOT already in the list above.

For each tool found, return a JSON object with these EXACT fields:
{
  "id": "unique-slug",
  "name": "Tool Name",
  "company": "Company Name",
  "category": "one of: ${VALID_CATEGORIES.join(' | ')}",
  "featured": false,
  "description": "One clear sentence describing what it does and who it's for.",
  "tags": ["tag1", "tag2", "tag3"],
  "url": "https://official-url.com",
  "docs_url": "https://docs-url.com",
  "quickstart_url": "https://quickstart-url.com",
  "icon": "single emoji",
  "icon_bg": "#hexcolor",
  "quickstart": "<ol><li><strong>Step 1</strong> — Description.</li><li><strong>Step 2</strong> — Description.</li><li><strong>Step 3</strong> — Description.</li></ol>",
  "howtos": [
    {"title": "How to do X with <tool name>", "content": "Step-by-step instructions..."},
    {"title": "How to do Y with <tool name>", "content": "Step-by-step instructions..."}
  ]
}

Return ONLY a valid JSON array at the end of your response. No markdown fences around the final JSON.`,
      },
    ],
  });

  // Extract the final text response (after any tool use rounds)
  const textBlock = response.content.findLast((b) => b.type === 'text');
  const text = textBlock?.type === 'text' ? textBlock.text.trim() : '';

  if (!text || text === '[]') {
    console.log('No new tools found. Nothing to update.');
    return;
  }

  // 3. Parse Claude's JSON response
  let newTools: Record<string, unknown>[];
  try {
    // Try direct parse first
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error('Could not find JSON array in response:\n', text);
      process.exit(1);
    }
    newTools = JSON.parse(match[0]);
  } catch (e) {
    console.error('Failed to parse Claude response:', e);
    console.error('Raw response:\n', text);
    process.exit(1);
  }

  if (!Array.isArray(newTools) || newTools.length === 0) {
    console.log('No new tools in parsed response.');
    return;
  }

  // Validate categories
  const validated = newTools.filter((t) => {
    if (!VALID_CATEGORIES.includes(t.category as string)) {
      console.warn(`Skipping "${t.name}" — unknown category "${t.category}"`);
      return false;
    }
    return true;
  });

  console.log(
    `Found ${newTools.length} tool(s) via web search. Upserting ${validated.length} valid entries...`,
  );

  // 4. Upsert to Supabase
  const { error: upsertError } = await supabase
    .from('tools')
    .upsert(validated, { onConflict: 'id' });

  if (upsertError) {
    console.error('Supabase upsert failed:', upsertError.message);
    process.exit(1);
  }

  console.log('✓ Added/updated:', validated.map((t) => t.name).join(', '));

  // 5. Trigger Vercel redeploy so the live site picks up new tools
  if (process.env.VERCEL_DEPLOY_HOOK) {
    const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' });
    if (res.ok) {
      console.log('✓ Triggered Vercel redeploy.');
    } else {
      console.warn('Vercel deploy hook returned status:', res.status);
    }
  }

  console.log('Sync complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
