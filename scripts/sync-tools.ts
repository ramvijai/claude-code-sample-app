/**
 * scripts/sync-tools.ts
 *
 * Weekly AI-powered tool discovery job.
 * Runs via GitHub Actions cron (see .github/workflows/sync-tools.yml).
 *
 * What it does:
 *  1. Fetches all existing tool names from Supabase
 *  2. Asks Claude to suggest up to 5 new AI tools not yet in the DB
 *  3. Upserts the suggestions into Supabase
 *  4. Triggers a Vercel deploy webhook so the live site rebuilds with new data
 *
 * Required env vars (set as GitHub Actions secrets):
 *   ANTHROPIC_API_KEY   — Anthropic API key
 *   SUPABASE_URL        — Supabase project URL
 *   SUPABASE_SERVICE_KEY — Supabase service-role key (write access)
 *   VERCEL_DEPLOY_HOOK  — Vercel deploy hook URL (optional but recommended)
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
  // 1. Get existing tool names to tell Claude what's already tracked
  const { data: existing, error: fetchError } = await supabase
    .from('tools')
    .select('id, name');

  if (fetchError) {
    console.error('Failed to fetch existing tools:', fetchError.message);
    process.exit(1);
  }

  const existingNames = (existing ?? []).map((t) => t.name).join(', ');
  console.log(`Found ${existing?.length ?? 0} existing tools.`);

  // 2. Ask Claude to suggest new tools
  console.log('Asking Claude for new tool suggestions...');
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 8192,
    messages: [
      {
        role: 'user',
        content: `You are the curator of GenAI Hub — a comprehensive directory of generative AI tools.

Currently tracked tools: ${existingNames}

Your task: Identify up to 5 NEW generative AI tools that are NOT in the list above and should be added.
Focus on tools that are:
- Production-ready and publicly available
- Notable, widely used, or recently launched
- Relevant to developers and AI practitioners

For each tool, return a JSON object with these EXACT fields (snake_case for DB):
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
    {"title": "How to do X with ${'{tool name}'}", "content": "Step-by-step instructions..."},
    {"title": "How to do Y with ${'{tool name}'}", "content": "Step-by-step instructions..."}
  ]
}

Return ONLY a valid JSON array. No markdown fences, no explanation — just the raw JSON array.
If no genuinely new notable tools exist right now, return an empty array [].`,
      },
    ],
  });

  const text =
    response.content[0].type === 'text' ? response.content[0].text.trim() : '';

  if (!text || text === '[]') {
    console.log('No new tools suggested. Nothing to update.');
    return;
  }

  // 3. Parse Claude's response
  let newTools: Record<string, unknown>[];
  try {
    newTools = JSON.parse(text);
  } catch {
    // Try extracting JSON array if Claude wrapped it in prose
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      console.error('Could not parse Claude response:\n', text);
      process.exit(1);
    }
    newTools = JSON.parse(match[0]);
  }

  if (!Array.isArray(newTools) || newTools.length === 0) {
    console.log('Claude returned no new tools.');
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
    `Claude suggested ${newTools.length} tool(s). Upserting ${validated.length} valid entries...`,
  );

  // 4. Upsert to Supabase
  const { error: upsertError } = await supabase
    .from('tools')
    .upsert(validated, { onConflict: 'id' });

  if (upsertError) {
    console.error('Supabase upsert failed:', upsertError.message);
    process.exit(1);
  }

  console.log(
    '✓ Added/updated:',
    validated.map((t) => t.name).join(', '),
  );

  // 5. Trigger Vercel redeploy so the live site picks up new tools
  if (process.env.VERCEL_DEPLOY_HOOK) {
    const res = await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' });
    if (res.ok) {
      console.log('✓ Triggered Vercel redeploy.');
    } else {
      console.warn('Vercel deploy hook returned status:', res.status);
    }
  } else {
    console.log(
      'VERCEL_DEPLOY_HOOK not set — skipping redeploy trigger. Set it in GitHub secrets.',
    );
  }

  console.log('Sync complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
