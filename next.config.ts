import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Removed output: 'export' — now using SSR + ISR so pages fetch live
  // data from Supabase and revalidate on schedule without a full redeploy.
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
