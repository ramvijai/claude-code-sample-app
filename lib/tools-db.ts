/**
 * tools-db.ts — server-side async data layer backed by Supabase.
 * Returns the same Tool / Category types as lib/tools.ts so all
 * existing components work without changes.
 *
 * Pure utility functions (getCategoryMeta, getRelatedTools, CAT_COLORS,
 * CATEGORIES) are still imported from lib/tools.ts — they are stateless
 * and require no database access.
 */

import { supabase } from './supabase';
import type { Tool, HowTo } from './tools';

export type { Tool, HowTo } from './tools';
export { CATEGORIES, CAT_COLORS, getCategoryMeta, getRelatedTools } from './tools';

// ─── Row mapper (snake_case DB → camelCase Tool) ────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): Tool {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    category: row.category,
    featured: row.featured ?? false,
    description: row.description,
    tags: row.tags ?? [],
    url: row.url ?? '',
    docsUrl: row.docs_url ?? '',
    quickstartUrl: row.quickstart_url ?? '',
    icon: row.icon ?? '',
    iconBg: row.icon_bg ?? '#8b5cf6',
    quickstart: row.quickstart ?? '',
    howtos: (row.howtos ?? []) as HowTo[],
  };
}

// ─── Public async API ────────────────────────────────────────────────────────

export async function getAllTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('name');
  if (error) throw new Error(`getAllTools: ${error.message}`);
  return (data ?? []).map(mapRow);
}

export async function getToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return mapRow(data);
}

export async function getFeaturedTools(): Promise<Tool[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('featured', true)
    .order('name');
  if (error) throw new Error(`getFeaturedTools: ${error.message}`);
  return (data ?? []).map(mapRow);
}

export async function getToolIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from('tools')
    .select('id');
  if (error) throw new Error(`getToolIds: ${error.message}`);
  return (data ?? []).map((r) => r.id as string);
}

/** Build category counts from a pre-fetched tools list (no extra DB query). */
export function buildCategoryCounts(tools: Tool[]): Record<string, number> {
  return tools.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Client-side search / filter (pure, no DB call). */
export function filterTools(
  tools: Tool[],
  query: string,
  category?: string,
): Tool[] {
  return tools.filter((t) => {
    if (category && category !== 'all' && t.category !== category) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.company.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}
