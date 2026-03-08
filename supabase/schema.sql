-- ============================================================
-- GenAI Hub — Supabase Schema
-- Run this once in the Supabase SQL Editor to set up the DB.
-- ============================================================

-- 1. Tools table
CREATE TABLE IF NOT EXISTS tools (
  id               TEXT PRIMARY KEY,
  name             TEXT        NOT NULL,
  company          TEXT        NOT NULL,
  category         TEXT        NOT NULL,
  featured         BOOLEAN     NOT NULL DEFAULT false,
  description      TEXT        NOT NULL,
  tags             TEXT[]      NOT NULL DEFAULT '{}',
  url              TEXT        NOT NULL DEFAULT '',
  docs_url         TEXT        NOT NULL DEFAULT '',
  quickstart_url   TEXT        NOT NULL DEFAULT '',
  icon             TEXT        NOT NULL DEFAULT '',
  icon_bg          TEXT        NOT NULL DEFAULT '#8b5cf6',
  quickstart       TEXT        NOT NULL DEFAULT '',
  howtos           JSONB       NOT NULL DEFAULT '[]',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tools_updated_at ON tools;
CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 3. Row-Level Security — public read, service role write
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON tools;
CREATE POLICY "Public read" ON tools
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role write" ON tools;
CREATE POLICY "Service role write" ON tools
  FOR ALL USING (auth.role() = 'service_role');

-- 4. Index for fast category filtering
CREATE INDEX IF NOT EXISTS tools_category_idx ON tools (category);
CREATE INDEX IF NOT EXISTS tools_featured_idx  ON tools (featured);
