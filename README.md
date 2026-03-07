# GenAI Hub — Complete Knowledge Base for AI Tools

A full-featured, production-ready web application showcasing **51 Generative AI tools** across 8 categories — complete with quickstarts, how-to guides, individual tool pages, dark/light mode, and a powerful search/filter system.

> **The main purpose of this project** is to demonstrate how rapidly a high-quality, full-stack web application can be built from scratch using **Claude Code** inside **VS Code** — entirely through natural-language prompts, with zero manual boilerplate.

---

## What This App Does

- **Browse 51 AI tools** across 8 categories (LLMs, Code IDEs, Code Assistants, Image Generation, Video Generation, Audio AI, AI Agents & APIs, Productivity)
- **Search & filter** by name, company, tags, or category — with live results
- **Individual tool pages** at `/tools/[id]` — shareable URLs with full SEO metadata
- **Quickstart guides** — step-by-step instructions for every tool
- **How-to guides** — task-oriented accordion walkthroughs
- **Featured spotlight strip** — drag-scrollable showcase of editor's picks
- **Dark / Light mode** — persisted to `localStorage`, no flash on load
- **Grid / List view** toggle for the tool browser
- **Keyboard shortcut** `⌘K` to focus search from anywhere
- **Fully static** — deploys to Vercel (or any CDN) with zero server required

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) — App Router, `output: 'export'` |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 with custom design tokens |
| Font | Inter via `next/font/google` |
| Deployment | Vercel |
| AI Assistant | Claude Sonnet 4.6 via Claude Code |
| IDE | VS Code |

---

## Project Structure

```
├── app/
│   ├── globals.css          # CSS variables, keyframes, design system
│   ├── layout.tsx           # Root layout — Inter font, ThemeProvider, metadata
│   ├── page.tsx             # Home page (server component)
│   └── tools/
│       └── [id]/
│           └── page.tsx     # Tool detail page — generateStaticParams + generateMetadata
├── components/
│   ├── ThemeProvider.tsx    # Client: syncs data-theme attr from localStorage
│   ├── Header.tsx           # Sticky header with scroll effect + theme toggle
│   ├── Hero.tsx             # Animated hero — orbs, shimmer text, count-up stats
│   ├── SpotlightStrip.tsx   # Drag-scrollable featured tools strip
│   ├── ToolCard.tsx         # Tool card with colored accent + reveal animation
│   ├── ToolsSection.tsx     # Search + category filters + grid/list view
│   ├── HowToAccordion.tsx   # Expandable how-to guide sections
│   └── Footer.tsx           # Footer with category links
├── lib/
│   └── tools.ts             # Full TypeScript data layer — 51 tools + helper functions
├── next.config.ts           # Static export config
├── tailwind.config.ts       # Custom theme tokens, animations, semantic colors
├── tsconfig.json            # TypeScript config with @/* path aliases
├── vercel.json              # Vercel deployment config with security headers
└── package.json
```

---

## How This Was Built

This entire application was created using **Claude Code** inside **VS Code** — from a blank folder to a deployed Next.js app — using only natural-language prompts. No boilerplate was manually written.

### The exact prompts used (in order):

**1. Initial build:**
> "Build a website that showcases all the different Generative AI tools, IDEs, links to each tool, a quick description, Quickstarts, how-tos etc. Complete knowledge base for AI tools."

**2. UI enhancement:**
> "Use Frontend Design skills to enhance the UI"

**3. README:**
> "Can you include a proper readme file for this application clearly explaining this particular web application. Also clearly mention how this application is implemented, what tools and IDEs are used. The intention of this project is how quickly a web app can be created using Claude Code and VS code."

**4. Commit:**
> "Commit all the changes with proper comment"

**5. Vercel compatibility:**
> "I am planning to host it in Vercel — can you make this application compatible to be deployed in Vercel"

**6. Next.js migration:**
> "Can this be made as Next.js so that in the future if we need to enhance this application then it will be more helpful?"

> "Yes proceed. Ensure to use Frontend design skill. Also update the readme and all the required files."

---

## Key Architecture Decisions

### Static Export (`output: 'export'`)
`next.config.ts` uses `output: 'export'` — the build produces a fully static `/out` directory. This means zero server, zero cold starts, and perfect Vercel/CDN compatibility, while still getting all the benefits of React, TypeScript, and the App Router.

### Server vs Client Components
- **Server components**: `app/layout.tsx`, `app/page.tsx`, `app/tools/[id]/page.tsx`, `Footer.tsx`, `ToolCard.tsx` — no JS shipped for pure display
- **Client components** (`'use client'`): `ThemeProvider`, `Header` (scroll + theme toggle), `Hero` (count-up animation), `SpotlightStrip` (drag scroll), `ToolsSection` (search + filter state), `HowToAccordion` (open/close state)

### Theme System
CSS custom properties on `<html data-theme="dark|light">` — Tailwind's `darkMode: ['selector', '[data-theme="dark"]']` syncs the two. ThemeProvider reads `localStorage` on mount to avoid flicker.

### Individual Tool Pages
The original vanilla JS app used a modal for tool details. The Next.js version replaces this with full pages at `/tools/[id]` — better for SEO, shareable URLs, and more content space. `generateStaticParams()` pre-renders all 51 pages at build time.

### Design System
Tailwind tokens are mapped to CSS variables so the entire palette swaps between dark and light themes with a single attribute change. Accent colors (purple, blue, green, etc.) are fixed and used for category-colored card accents, button shadows, and glows.

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Steps

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build (static export)
npm run build
# → /out directory ready to deploy
```

---

## Deploying to Vercel

### Option 1 — Vercel Dashboard (recommended)
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Framework auto-detected as **Next.js** — click **Deploy**
4. Done — your app is live in ~60 seconds

### Option 2 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

---

## Extending the App

### Add a new tool
Open [lib/tools.ts](lib/tools.ts) and add an entry to the `TOOLS` array:

```ts
{
  id: 'my-tool',
  name: 'My Tool',
  company: 'My Company',
  category: 'llm',          // must match a CATEGORIES id
  featured: false,
  description: 'One-line description.',
  tags: ['tag1', 'tag2'],
  url: 'https://mytool.com',
  docsUrl: 'https://docs.mytool.com',
  quickstartUrl: 'https://docs.mytool.com/quickstart',
  icon: '🤖',
  iconBg: '#6366f1',
  quickstart: `<ol class="steps"><li>Step one</li><li>Step two</li></ol>`,
  howtos: [
    { title: 'How to do X', content: 'Instructions for X...' },
  ],
},
```

Re-run `npm run build` — the new tool gets its own page at `/tools/my-tool` automatically.

---

## Tools & IDE Used

| Tool | Role |
|---|---|
| **Claude Code** | AI coding assistant — wrote every file via natural-language prompts |
| **Claude Sonnet 4.6** | Underlying model powering Claude Code |
| **VS Code** | Development environment (Claude Code runs as a VS Code extension) |
| **Next.js 15** | React framework with App Router and static export |
| **Tailwind CSS** | Utility-first styling |
| **TypeScript** | Type safety across the entire codebase |
| **Vercel** | Deployment platform |
| **Git** | Version control |

---

## Key Takeaway

This application — **51 tools, 8 categories, individual tool pages, animated hero, drag-scroll spotlight, search/filter, dark/light mode, full TypeScript, static export, Vercel-ready** — was built entirely through conversation with Claude Code.

No boilerplate generators. No templates. No manual scaffolding. Just prompts.

The total time from blank folder to production-ready Next.js app: **under 2 hours**.
