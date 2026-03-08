/**
 * scripts/seed-db.ts
 *
 * One-time migration: reads all 51 tools from lib/tools.ts
 * and upserts them into the Supabase `tools` table.
 *
 * Run once after creating the Supabase schema:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_KEY=eyJ... \
 *   npx tsx scripts/seed-db.ts
 */

import { createClient } from '@supabase/supabase-js';
import { TOOLS } from '../lib/tools';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

async function seed() {
  console.log(`Seeding ${TOOLS.length} tools...`);

  // Map camelCase Tool → snake_case DB columns
  const rows = TOOLS.map((t) => ({
    id:              t.id,
    name:            t.name,
    company:         t.company,
    category:        t.category,
    featured:        t.featured,
    description:     t.description,
    tags:            t.tags,
    url:             t.url,
    docs_url:        t.docsUrl,
    quickstart_url:  t.quickstartUrl,
    icon:            t.icon,
    icon_bg:         t.iconBg,
    quickstart:      t.quickstart,
    howtos:          t.howtos,
  }));

  const { error } = await supabase
    .from('tools')
    .upsert(rows, { onConflict: 'id' });

  if (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }

  console.log(`✓ Seeded ${rows.length} tools successfully.`);
}

seed();
