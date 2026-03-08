# GenAI Hub — Complete Knowledge Base for AI Tools

A full-featured, production-ready web application showcasing **51 Generative AI tools** across 8 categories — complete with quickstarts, how-to guides, individual tool pages, dark/light mode, and a powerful search/filter system.

**Live demo:** [https://claude-code-sample-app.vercel.app](https://claude-code-sample-app.vercel.app)

> **The main purpose of this project** is to demonstrate how rapidly a high-quality, full-stack web application can be built from scratch using **Claude Code** inside **VS Code** — entirely through natural-language prompts, with zero manual boilerplate.

---

## Demo Video

https://github.com/user-attachments/assets/cf7f6c53-4914-4ba6-a6ec-a421dcbc1d16

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
- **Keyboard shortcut** `⌘K` / `Ctrl+K` to focus search from anywhere
- **Fully static** — deploys to Vercel (or any CDN) with zero server required

---

## Try It Now (No Setup Required)

The easiest way to explore the app is via the live deployment:

**[https://claude-code-sample-app.vercel.app](https://claude-code-sample-app.vercel.app)**

No account, no login, no API key needed.

---

## Running Locally — End-to-End Guide

### Prerequisites

Before you begin, make sure you have the following installed:

| Requirement | Version | How to check | Download |
|---|---|---|---|
| **Node.js** | 18 or higher | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | Comes with Node.js | `npm --version` | (included with Node.js) |
| **Git** | Any recent version | `git --version` | [git-scm.com](https://git-scm.com) |

> **Windows users:** Use Git Bash, PowerShell, or Windows Terminal. Command Prompt also works.
> **Mac/Linux users:** Your system terminal is fine.

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/ramvijai/claude-code-sample-app.git
cd claude-code-sample-app
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

This installs all required packages (Next.js, React, Tailwind CSS, TypeScript, etc.) into a local `node_modules` folder. It takes about 30–60 seconds on the first run.

Expected output:
```
added 353 packages, and audited 354 packages in Xs
found 0 vulnerabilities
```

---

### Step 3 — Start the Development Server

```bash
npm run dev
```

Expected output:
```
▲ Next.js 15.x.x
- Local:   http://localhost:3000
✓ Ready in ~3s
```

Open your browser and go to **[http://localhost:3000](http://localhost:3000)**.

The dev server supports **hot reload** — any file changes you save will instantly update in the browser without a full refresh.

---

### Step 4 — Explore the App

Once running, here's what you can try:

| Feature | How to use |
|---|---|
| **Browse tools** | Scroll down the home page to see all 51 tools |
| **Search** | Click the search bar (or press `Ctrl+K` / `⌘K`) and type any tool name, tag, or company |
| **Filter by category** | Click any category chip (LLMs, Code IDEs, Image, etc.) |
| **View a tool** | Click any tool card to open its dedicated page with quickstart & how-to guides |
| **Toggle theme** | Click the sun/moon icon in the top-right header |
| **Switch layout** | Use the grid/list toggle buttons in the tools section |
| **Spotlight strip** | Drag the featured tools strip horizontally |

---

### Step 5 (Optional) — Production Build

To build the static site exactly as it gets deployed to Vercel:

```bash
npm run build
```

This generates an `out/` folder containing fully static HTML, CSS, and JS — no server required. You can serve it with any static file host:

```bash
# Serve the static build locally (requires npx)
npx serve out
# → http://localhost:3000
```

---

## Deploying Your Own Copy to Vercel

Follow these steps to deploy your own instance in under 5 minutes.

### Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier is sufficient)

### Option 1 — Vercel Dashboard (Recommended)

1. **Fork or push** this repo to your GitHub account
2. Go to **[vercel.com/new](https://vercel.com/new)**
3. Click **"Add New Project"** → **"Import Git Repository"**
4. Select your repo from the list
5. Vercel auto-detects **Next.js** — no configuration needed
6. Click **"Deploy"**
7. Your app is live in ~60 seconds at a `*.vercel.app` URL

> No environment variables required — this app is fully static with no backend or API keys.

### Option 2 — Vercel CLI

```bash
# Install the Vercel CLI globally
npm i -g vercel

# Deploy from the project folder
vercel --prod
```

Follow the prompts to link to your Vercel account and project. Your live URL is printed at the end.

---

## Setting Up Claude Code to Build Your Own Version

This project was built using **Claude Code** — Anthropic's AI coding assistant for VS Code. Here's how to set it up yourself:

### Prerequisites
- [VS Code](https://code.visualstudio.com) installed
- An [Anthropic account](https://console.anthropic.com) (or Claude Pro/Team subscription)

### Steps

1. **Install the Claude Code extension**
   - Open VS Code
   - Go to Extensions (`Ctrl+Shift+X` / `⌘+Shift+X`)
   - Search for **"Claude Code"** and install it

2. **Sign in**
   - Click the Claude Code icon in the sidebar
   - Sign in with your Anthropic account

3. **Open this project (or start fresh)**
   ```bash
   # Clone and open
   git clone https://github.com/ramvijai/claude-code-sample-app.git
   code claude-code-sample-app

   # OR start fresh
   mkdir my-ai-app && cd my-ai-app
   code .
   ```

4. **Start prompting**
   - Open the Claude Code chat panel in VS Code
   - Type natural-language instructions — Claude Code reads, writes, and runs your code

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

**7. Local run + deployment:**
> "Can you review the application and ensure everything is available. Help me to run locally"

> "Can you commit with proper message and push the code so that I can use Vercel to perform the deployment"

**8. Live URL + docs:**
> "I have deployed this to Vercel, can you include the URL so that users can access it and view it"

> "Can you also provide clear instructions and prerequisites in the README for users to try this end to end"

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
