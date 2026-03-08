import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser / server component client (read-only via anon key + RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service-role client for scripts (seed, sync) — never expose to the browser
export function createServiceClient() {
  return createClient(
    process.env.SUPABASE_URL ?? supabaseUrl,
    process.env.SUPABASE_SERVICE_KEY!,
  );
}
