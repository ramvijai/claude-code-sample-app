// ─── Types ────────────────────────────────────────────────────────────────────

export interface HowTo {
  title: string;
  content: string;
}

export interface Tool {
  id: string;
  name: string;
  company: string;
  category: string;
  featured: boolean;
  description: string;
  tags: string[];
  url: string;
  docsUrl: string;
  quickstartUrl: string;
  icon: string;
  iconBg: string;
  quickstart: string; // HTML string rendered via dangerouslySetInnerHTML
  howtos: HowTo[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;
}

// ─── Category accent colors ────────────────────────────────────────────────────

export const CAT_COLORS: Record<string, string> = {
  llm:             '#8b5cf6',
  'code-ide':      '#3b82f6',
  'code-assistant':'#10b981',
  image:           '#f59e0b',
  video:           '#ef4444',
  audio:           '#ec4899',
  agents:          '#6366f1',
  productivity:    '#06b6d4',
};

// ─── Categories ────────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  { id: 'all',             label: 'All Tools',       icon: '🔮', color: '#8b5cf6' },
  { id: 'llm',             label: 'LLMs & Chatbots',  icon: '🧠', color: '#8b5cf6' },
  { id: 'code-ide',        label: 'Code IDEs',         icon: '💻', color: '#3b82f6' },
  { id: 'code-assistant',  label: 'Code Assistants',   icon: '⚡', color: '#10b981' },
  { id: 'image',           label: 'Image Generation',  icon: '🎨', color: '#f59e0b' },
  { id: 'video',           label: 'Video Generation',  icon: '🎬', color: '#ef4444' },
  { id: 'audio',           label: 'Voice & Audio',     icon: '🎵', color: '#ec4899' },
  { id: 'agents',          label: 'AI Agents & APIs',  icon: '🤖', color: '#6366f1' },
  { id: 'productivity',    label: 'Productivity',       icon: '📊', color: '#06b6d4' },
];

// ─── Tools ─────────────────────────────────────────────────────────────────────

export const TOOLS: Tool[] = [
  // ── LLMs & Chatbots ──────────────────────────────────────────────────────────
  {
    id: 'claude', name: 'Claude', company: 'Anthropic', category: 'llm', featured: true,
    description: 'A safety-focused AI assistant excelling at analysis, coding, writing, and nuanced reasoning. Available via claude.ai and the Anthropic API.',
    tags: ['chat', 'coding', 'writing', 'analysis', 'API'],
    url: 'https://claude.ai', docsUrl: 'https://docs.anthropic.com', quickstartUrl: 'https://docs.anthropic.com/en/docs/quickstart',
    icon: '✦', iconBg: '#8b5cf6',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Visit <a href="https://claude.ai" target="_blank">claude.ai</a> and sign up with Google or email.</li><li><strong>Start a conversation</strong> — Type a message in the chat box. Try: <em>"Explain quantum computing in simple terms."</em></li><li><strong>Use Projects</strong> — Create a Project to give Claude persistent context about your work.</li><li><strong>Try artifacts</strong> — Ask Claude to write code or a document and it will render it in a side panel.</li><li><strong>Explore the API</strong> — Get an API key at <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> to integrate Claude into your own apps.</li></ol>`,
    howtos: [
      { title: 'Use Claude for coding', content: 'Paste code and say "Review this for bugs and suggest improvements." Use the artifact panel to iterate on code. Ask Claude to write tests, explain logic, or refactor for readability.' },
      { title: 'Use Claude for long documents', content: 'Upload PDFs or paste large texts. Claude has a 200K token context window — ideal for contracts, research papers, or entire codebases.' },
      { title: 'Build with the Anthropic API', content: 'Install the SDK: `npm install @anthropic-ai/sdk`. Set your API key as ANTHROPIC_API_KEY. Use the Messages API with claude-sonnet-4-6 or claude-opus-4-6 models.' },
      { title: 'Use Claude for writing', content: 'Give Claude a topic, tone, and audience. Ask for drafts, outlines, or edits. Use the "Improve this" prompt on existing text.' },
    ],
  },
  {
    id: 'chatgpt', name: 'ChatGPT', company: 'OpenAI', category: 'llm', featured: true,
    description: 'The world\'s most popular AI chatbot. GPT-4o supports text, images, voice, and file analysis. ChatGPT Plus and Team plans unlock advanced features.',
    tags: ['chat', 'coding', 'voice', 'vision', 'plugins'],
    url: 'https://chat.openai.com', docsUrl: 'https://platform.openai.com/docs', quickstartUrl: 'https://platform.openai.com/docs/quickstart',
    icon: '◈', iconBg: '#10a37f',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Go to <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> and create a free account.</li><li><strong>Choose a model</strong> — Free users get GPT-4o mini; Plus subscribers ($20/mo) get GPT-4o, o1, and more.</li><li><strong>Try custom GPTs</strong> — Browse the GPT Store for specialized AI assistants.</li><li><strong>Enable memory</strong> — Turn on Memory in Settings so ChatGPT remembers facts about you.</li><li><strong>Explore the API</strong> — Get a key at <a href="https://platform.openai.com" target="_blank">platform.openai.com</a>.</li></ol>`,
    howtos: [
      { title: 'Create a Custom GPT', content: 'Click "Explore GPTs" → "Create". Give it a name, instructions, and optionally upload knowledge files. Configure actions (API calls) if needed.' },
      { title: 'Use GPT-4o Vision', content: 'Click the paperclip icon to upload an image. Ask ChatGPT to describe it, extract text, debug a screenshot, or analyze a chart.' },
      { title: 'Use the OpenAI API', content: 'Install: `npm install openai`. Set OPENAI_API_KEY. Call `client.chat.completions.create({ model: "gpt-4o", messages: [...] })`. Supports streaming, function calling, JSON mode, and vision.' },
      { title: 'Use ChatGPT for data analysis', content: 'Upload a CSV or Excel file. ChatGPT (Plus) uses Code Interpreter to run Python, generate charts, and answer questions about your data.' },
    ],
  },
  {
    id: 'gemini', name: 'Gemini', company: 'Google', category: 'llm', featured: true,
    description: 'Google\'s multimodal AI model family. Gemini Ultra handles complex tasks; Gemini Flash is fast and efficient. Deep integration with Google Workspace.',
    tags: ['chat', 'multimodal', 'google', 'workspace'],
    url: 'https://gemini.google.com', docsUrl: 'https://ai.google.dev/docs', quickstartUrl: 'https://ai.google.dev/gemini-api/docs/quickstart',
    icon: '✧', iconBg: '#4285f4',
    quickstart: `<ol class="steps"><li><strong>Go to Gemini</strong> — Visit <a href="https://gemini.google.com" target="_blank">gemini.google.com</a> and sign in with your Google account.</li><li><strong>Try Gemini Advanced</strong> — Subscribe to Google One AI Premium ($20/mo) to access the most powerful models.</li><li><strong>Connect to Workspace</strong> — Enable Gemini in Gmail, Docs, Sheets, and Slides for AI-powered writing and summaries.</li><li><strong>Use Google AI Studio</strong> — Visit <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a> to prototype with the API for free.</li></ol>`,
    howtos: [
      { title: 'Use Gemini in Google Docs', content: 'Open a Doc, click "Help me write" in the sidebar. Describe what you want and Gemini drafts it. Select text and ask Gemini to rewrite, summarize, or expand.' },
      { title: 'Use Gemini API with Python', content: 'Install: `pip install google-generativeai`. Set GOOGLE_API_KEY. Use `genai.GenerativeModel("gemini-2.0-flash")` to create a model, then `.generate_content(prompt)` to get responses.' },
      { title: 'Use Gemini for image analysis', content: 'Upload images directly in the Gemini chat or via the API. Gemini 2.0 Flash can analyze multiple images, compare them, and extract data from charts.' },
    ],
  },
  {
    id: 'grok', name: 'Grok', company: 'xAI', category: 'llm', featured: false,
    description: 'xAI\'s conversational AI with real-time internet access and integration with X (Twitter). Known for a witty, direct personality and uncensored responses.',
    tags: ['chat', 'real-time', 'x-twitter', 'search'],
    url: 'https://grok.com', docsUrl: 'https://docs.x.ai', quickstartUrl: 'https://docs.x.ai/docs/quickstart',
    icon: '⊗', iconBg: '#1da1f2',
    quickstart: `<ol class="steps"><li><strong>Access Grok</strong> — Go to <a href="https://grok.com" target="_blank">grok.com</a> or find Grok in the X app sidebar.</li><li><strong>Subscribe to X Premium</strong> — Full Grok access requires an X Premium or Premium+ subscription.</li><li><strong>Ask real-time questions</strong> — Try: <em>"What are people saying about [topic] on X right now?"</em></li><li><strong>Try the API</strong> — Get an API key at <a href="https://console.x.ai" target="_blank">console.x.ai</a> — compatible with the OpenAI SDK format.</li></ol>`,
    howtos: [
      { title: 'Use Grok for real-time research', content: 'Ask Grok to search X for current opinions on a topic, summarize trending discussions, or find recent news. Unlike most LLMs, Grok has live access to X posts.' },
      { title: 'Use Grok API (OpenAI-compatible)', content: 'Use the xAI API with the OpenAI SDK: set base_url="https://api.x.ai/v1" and model="grok-2-latest". It\'s a drop-in replacement supporting chat, vision, and function calling.' },
    ],
  },
  {
    id: 'perplexity', name: 'Perplexity AI', company: 'Perplexity', category: 'llm', featured: true,
    description: 'An AI-powered answer engine that searches the web and provides cited, up-to-date answers. Ideal for research, fact-checking, and learning.',
    tags: ['search', 'research', 'citations', 'real-time'],
    url: 'https://perplexity.ai', docsUrl: 'https://docs.perplexity.ai', quickstartUrl: 'https://docs.perplexity.ai/docs/getting-started',
    icon: '◉', iconBg: '#20b2aa',
    quickstart: `<ol class="steps"><li><strong>Visit Perplexity</strong> — Go to <a href="https://perplexity.ai" target="_blank">perplexity.ai</a> — no account required for basic use.</li><li><strong>Ask a question</strong> — Type any question. Perplexity searches the web and returns an answer with numbered citations.</li><li><strong>Use Focus modes</strong> — Switch between Web, Academic, YouTube, Reddit to narrow your search source.</li><li><strong>Use Spaces</strong> — Create Spaces (Pro) to build persistent research libraries with custom AI instructions.</li></ol>`,
    howtos: [
      { title: 'Use Perplexity for research', content: 'Use Academic focus to search peer-reviewed papers. Ask follow-up questions in the same thread. Perplexity maintains context, so you can drill deeper into specific aspects of a topic.' },
      { title: 'Use the Perplexity API', content: 'Get an API key at perplexity.ai/settings/api. OpenAI-compatible endpoint. Models include sonar (web search), sonar-pro (advanced), and sonar-reasoning (chain of thought with search).' },
    ],
  },
  {
    id: 'mistral', name: 'Mistral AI', company: 'Mistral AI', category: 'llm', featured: false,
    description: 'European AI lab producing high-efficiency open-weight and commercial models. Le Chat is the consumer interface; the API offers Mistral Large, Small, and Codestral.',
    tags: ['open-weight', 'API', 'European', 'coding'],
    url: 'https://chat.mistral.ai', docsUrl: 'https://docs.mistral.ai', quickstartUrl: 'https://docs.mistral.ai/getting-started/quickstart/',
    icon: '⋈', iconBg: '#ff6b35',
    quickstart: `<ol class="steps"><li><strong>Try Le Chat</strong> — Visit <a href="https://chat.mistral.ai" target="_blank">chat.mistral.ai</a> for free access to Mistral models.</li><li><strong>Get API access</strong> — Sign up at <a href="https://console.mistral.ai" target="_blank">console.mistral.ai</a> and generate an API key.</li><li><strong>Install the SDK</strong> — Run <code>pip install mistralai</code> or <code>npm install @mistralai/mistralai</code>.</li><li><strong>Make your first call</strong> — Use <code>mistral-large-latest</code> for best quality or <code>mistral-small-latest</code> for speed.</li></ol>`,
    howtos: [
      { title: 'Use Codestral for coding', content: 'Codestral is Mistral\'s specialized coding model available via the Codestral API endpoint (codestral.mistral.ai). Integrates with VS Code and JetBrains via the Mistral plugin.' },
      { title: 'Run Mistral locally', content: 'Download open-weight Mistral models from Hugging Face. Run with Ollama: `ollama pull mistral` then `ollama run mistral`. Or use LM Studio for a GUI interface.' },
    ],
  },
  {
    id: 'meta-ai', name: 'Meta AI (Llama)', company: 'Meta', category: 'llm', featured: false,
    description: 'Meta\'s AI assistant powered by Llama models, available in WhatsApp, Instagram, and Facebook. The Llama model family is open-source and widely deployed.',
    tags: ['open-source', 'Llama', 'social', 'local'],
    url: 'https://ai.meta.com', docsUrl: 'https://llama.meta.com/docs', quickstartUrl: 'https://llama.meta.com/docs/get-started/',
    icon: '∞', iconBg: '#0866ff',
    quickstart: `<ol class="steps"><li><strong>Use Meta AI in apps</strong> — Tap the Meta AI icon in WhatsApp, Messenger, or Instagram to start chatting.</li><li><strong>Download Llama</strong> — Request access at <a href="https://llama.meta.com" target="_blank">llama.meta.com</a> and download weights from Hugging Face.</li><li><strong>Run with Ollama</strong> — Install Ollama, then run <code>ollama pull llama3.3</code> and <code>ollama run llama3.3</code>.</li><li><strong>Use via API providers</strong> — Access Llama through Together AI, Groq, Fireworks AI, or AWS Bedrock.</li></ol>`,
    howtos: [
      { title: 'Run Llama locally with Ollama', content: 'Install Ollama from ollama.com. Run `ollama pull llama3.3:70b` for the 70B model or `llama3.2:3b` for a lightweight version. Use `ollama serve` to expose a local API compatible with OpenAI SDKs.' },
      { title: 'Fine-tune Llama', content: 'Use TRL library: `from trl import SFTTrainer`. Prepare a dataset in chat template format. Configure LoRA with PEFT for memory-efficient fine-tuning. Train on a single A100 GPU.' },
    ],
  },
  {
    id: 'copilot-chat', name: 'Microsoft Copilot', company: 'Microsoft', category: 'llm', featured: false,
    description: 'Microsoft\'s AI companion powered by GPT-4 and Bing. Available on Windows, Edge, and mobile. Deep integration with Microsoft 365 apps.',
    tags: ['chat', 'Microsoft 365', 'Bing', 'Windows'],
    url: 'https://copilot.microsoft.com', docsUrl: 'https://learn.microsoft.com/en-us/copilot/', quickstartUrl: 'https://learn.microsoft.com/en-us/copilot/microsoft-365/microsoft-365-copilot-setup',
    icon: '◇', iconBg: '#0078d4',
    quickstart: `<ol class="steps"><li><strong>Access Copilot</strong> — Visit <a href="https://copilot.microsoft.com" target="_blank">copilot.microsoft.com</a> or press Win+C on Windows 11.</li><li><strong>Choose a style</strong> — Select between Balanced, Creative, or Precise conversation styles.</li><li><strong>Use Microsoft 365 Copilot</strong> — Requires a Microsoft 365 Copilot license. Available in Word, Excel, PowerPoint, Teams, and Outlook.</li><li><strong>Enable Copilot in Edge</strong> — Open the Copilot sidebar in Microsoft Edge to summarize pages and chat about content.</li></ol>`,
    howtos: [
      { title: 'Use Copilot in Excel', content: 'Open Excel with a Microsoft 365 Copilot license. Click the Copilot icon. Ask it to analyze your data, create formulas, generate charts, or highlight trends. It can write complex formulas in plain English.' },
      { title: 'Use Copilot in Teams meetings', content: 'During a Teams meeting, click the Copilot icon. It can transcribe the meeting, summarize key points, and answer questions like "What decisions were made?" after the call ends.' },
    ],
  },

  // ── Code IDEs ─────────────────────────────────────────────────────────────────
  {
    id: 'cursor', name: 'Cursor', company: 'Anysphere', category: 'code-ide', featured: true,
    description: 'A VS Code fork with deep AI integration. Features inline code generation, multi-file edits (Composer), codebase understanding, and AI chat. The leading AI-first IDE.',
    tags: ['VS Code', 'multi-file', 'chat', 'autocomplete'],
    url: 'https://cursor.sh', docsUrl: 'https://docs.cursor.com', quickstartUrl: 'https://docs.cursor.com/get-started/introduction',
    icon: '⌘', iconBg: '#3b82f6',
    quickstart: `<ol class="steps"><li><strong>Download Cursor</strong> — Get it at <a href="https://cursor.sh" target="_blank">cursor.sh</a>. It imports your VS Code settings and extensions automatically.</li><li><strong>Open a project</strong> — Open your codebase. Cursor indexes it so the AI understands all your files.</li><li><strong>Try Tab completion</strong> — Start typing code; Cursor predicts and completes entire blocks. Press Tab to accept.</li><li><strong>Use Cmd+K (inline edit)</strong> — Select code and press Cmd+K to ask for changes in natural language.</li><li><strong>Use Composer (Cmd+I)</strong> — Open Composer to make multi-file changes with a single instruction.</li><li><strong>Chat with your codebase (Cmd+L)</strong> — Ask questions about your code. Use @codebase to search across all files.</li></ol>`,
    howtos: [
      { title: 'Use Composer for multi-file edits', content: 'Press Cmd+I to open Composer. Describe a feature or change. Cursor will plan and execute changes across multiple files. Review each diff before accepting. Use "Agent" mode for autonomous task execution.' },
      { title: 'Add custom AI rules (.cursorrules)', content: 'Create a .cursorrules file in your project root. Write instructions for the AI like preferred coding style, framework conventions, and things to avoid. Cursor injects this context into every AI call.' },
      { title: 'Chat with your codebase', content: 'Press Cmd+L to open the chat. Type @ to reference specific files, symbols, or the whole codebase. Ask questions like "How does auth work?" or "Where is X function called?"' },
    ],
  },
  {
    id: 'windsurf', name: 'Windsurf', company: 'Codeium', category: 'code-ide', featured: true,
    description: 'An AI IDE with "Cascade" — an agentic AI that can browse the web, run terminal commands, and autonomously complete coding tasks. Built on VS Code.',
    tags: ['VS Code', 'agentic', 'cascade', 'autonomous'],
    url: 'https://codeium.com/windsurf', docsUrl: 'https://docs.codeium.com/windsurf/introduction', quickstartUrl: 'https://docs.codeium.com/windsurf/getting-started',
    icon: '◈', iconBg: '#0ea5e9',
    quickstart: `<ol class="steps"><li><strong>Download Windsurf</strong> — Get it at <a href="https://codeium.com/windsurf" target="_blank">codeium.com/windsurf</a>. Free tier available.</li><li><strong>Sign in with Codeium</strong> — Create or use an existing Codeium account to activate AI features.</li><li><strong>Open Cascade</strong> — Click the Cascade icon or press Ctrl+L. This is Windsurf's AI agent panel.</li><li><strong>Give Cascade a task</strong> — Describe what you want to build or fix. Cascade reads files, writes code, runs commands, and iterates.</li><li><strong>Review and accept changes</strong> — Cascade shows diffs for each file change. Accept individually or all at once.</li></ol>`,
    howtos: [
      { title: 'Use Cascade for full-stack tasks', content: 'Cascade can read your entire repo, make coordinated changes across frontend and backend, install packages via terminal, run tests, and fix errors it encounters. Describe a feature and watch it execute end-to-end.' },
    ],
  },
  {
    id: 'bolt', name: 'Bolt.new', company: 'StackBlitz', category: 'code-ide', featured: true,
    description: 'A browser-based AI full-stack IDE. Describe an app in plain English and Bolt scaffolds, builds, and runs it instantly in the browser. Supports React, Next.js, Astro, and more.',
    tags: ['browser', 'full-stack', 'no-setup', 'React', 'Next.js'],
    url: 'https://bolt.new', docsUrl: 'https://support.bolt.new', quickstartUrl: 'https://support.bolt.new/en/articles/10177096-getting-started',
    icon: '⚡', iconBg: '#7c3aed',
    quickstart: `<ol class="steps"><li><strong>Open Bolt</strong> — Go to <a href="https://bolt.new" target="_blank">bolt.new</a>. No install needed — everything runs in your browser.</li><li><strong>Describe your app</strong> — Type a description like: <em>"Build a todo app with React and Tailwind CSS."</em></li><li><strong>Watch it build</strong> — Bolt creates the project, installs dependencies, and runs the dev server in the browser.</li><li><strong>Iterate with chat</strong> — Ask for changes like "Add dark mode" in the chat panel.</li><li><strong>Export or deploy</strong> — Download the project as a ZIP, push to GitHub, or deploy to Netlify.</li></ol>`,
    howtos: [
      { title: 'Build a full-stack app with Bolt', content: 'Describe your app including the backend. Bolt will scaffold both frontend and backend and wire them together. It can also set up Supabase for auth and a database.' },
    ],
  },
  {
    id: 'v0', name: 'v0', company: 'Vercel', category: 'code-ide', featured: true,
    description: 'Vercel\'s AI UI generation tool. Describe a UI component in text and v0 generates React + Tailwind CSS (shadcn/ui) code you can copy into your Next.js project.',
    tags: ['UI generation', 'React', 'Tailwind', 'shadcn', 'Next.js'],
    url: 'https://v0.dev', docsUrl: 'https://v0.dev/docs', quickstartUrl: 'https://v0.dev/docs',
    icon: '◻', iconBg: '#111111',
    quickstart: `<ol class="steps"><li><strong>Go to v0.dev</strong> — Visit <a href="https://v0.dev" target="_blank">v0.dev</a> and sign in with your Vercel account.</li><li><strong>Describe your UI</strong> — Type a description like: <em>"A pricing page with three tiers and a CTA button."</em></li><li><strong>Iterate</strong> — Click elements to edit them with natural language, or continue chatting to refine the design.</li><li><strong>Copy or export code</strong> — Copy the generated React/Tailwind code, or click "Add to codebase" to integrate with your Next.js project.</li></ol>`,
    howtos: [
      { title: 'Generate complex UI with v0', content: 'Be specific: include layout type, color, components, and interactions. v0 responds well to design system terminology like "card grid", "sidebar nav", or "data table."' },
      { title: 'Import v0 components into Next.js', content: 'Copy the generated code. Make sure you have shadcn/ui initialized in your project (`npx shadcn@latest init`). Paste the component and import any needed shadcn components.' },
    ],
  },
  {
    id: 'lovable', name: 'Lovable', company: 'Lovable', category: 'code-ide', featured: false,
    description: 'An AI-powered full-stack web app builder. Chat to create React apps with Supabase backends, authentication, and real-time features. Formerly known as GPT Engineer.',
    tags: ['full-stack', 'Supabase', 'React', 'no-code'],
    url: 'https://lovable.dev', docsUrl: 'https://docs.lovable.dev', quickstartUrl: 'https://docs.lovable.dev/introduction/getting-started',
    icon: '♥', iconBg: '#f43f5e',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Go to <a href="https://lovable.dev" target="_blank">lovable.dev</a> and create an account.</li><li><strong>Create a new project</strong> — Describe the app you want to build in the prompt field.</li><li><strong>Connect Supabase</strong> — Link a Supabase project for database, auth, and storage. Lovable scaffolds the schema and queries automatically.</li><li><strong>Iterate with chat</strong> — Describe changes and Lovable updates the code. Use "Select element" to directly modify UI elements.</li></ol>`,
    howtos: [
      { title: 'Add authentication to your Lovable app', content: 'Say "Add user authentication with email and password." Lovable will configure Supabase Auth, create login/signup pages, and protect routes.' },
    ],
  },
  {
    id: 'claude-code', name: 'Claude Code', company: 'Anthropic', category: 'code-ide', featured: true,
    description: 'Anthropic\'s agentic CLI coding tool. Runs in your terminal, reads your codebase, and autonomously writes code, runs tests, and makes commits. Deep integration with the filesystem.',
    tags: ['CLI', 'agentic', 'terminal', 'autonomous', 'git'],
    url: 'https://claude.ai/code', docsUrl: 'https://docs.anthropic.com/en/docs/claude-code/overview', quickstartUrl: 'https://docs.anthropic.com/en/docs/claude-code/quickstart',
    icon: '✦', iconBg: '#8b5cf6',
    quickstart: `<ol class="steps"><li><strong>Install Claude Code</strong> — Run: <code>npm install -g @anthropic-ai/claude-code</code></li><li><strong>Authenticate</strong> — Run <code>claude</code> in your terminal and follow the OAuth flow.</li><li><strong>Open a project</strong> — <code>cd your-project</code> then run <code>claude</code> to start an interactive session.</li><li><strong>Give it a task</strong> — Type a task like <em>"Add input validation to the signup form"</em> and Claude Code will read the relevant files and make the changes.</li><li><strong>Review changes</strong> — Claude Code shows diffs and asks for confirmation before writing files. Use <code>/undo</code> to revert.</li></ol>`,
    howtos: [
      { title: 'Use Claude Code for bug fixing', content: 'Paste an error message or describe a bug. Claude Code searches your codebase for the source, understands the context, proposes a fix, and writes it. It can also run your test suite to verify.' },
      { title: 'Create a CLAUDE.md file', content: 'Add a CLAUDE.md file to your project root. Write instructions about your codebase, conventions, and preferences. Claude Code reads this file and follows your rules in every session.' },
    ],
  },

  // ── Code Assistants ───────────────────────────────────────────────────────────
  {
    id: 'github-copilot', name: 'GitHub Copilot', company: 'GitHub / Microsoft', category: 'code-assistant', featured: true,
    description: 'The most widely used AI code assistant. Integrates into VS Code, JetBrains, Neovim, and more. Offers inline suggestions, chat, multi-file edits, and code review.',
    tags: ['VS Code', 'JetBrains', 'inline', 'chat', 'review'],
    url: 'https://github.com/features/copilot', docsUrl: 'https://docs.github.com/en/copilot', quickstartUrl: 'https://docs.github.com/en/copilot/quickstart',
    icon: '◉', iconBg: '#1a1a1a',
    quickstart: `<ol class="steps"><li><strong>Subscribe</strong> — Go to <a href="https://github.com/features/copilot" target="_blank">github.com/features/copilot</a>. Individual plan is $10/mo (free for students).</li><li><strong>Install the extension</strong> — In VS Code, install "GitHub Copilot" and "GitHub Copilot Chat" from the marketplace.</li><li><strong>Sign in</strong> — Click the Copilot icon in the status bar and authenticate with your GitHub account.</li><li><strong>Start coding</strong> — Begin typing code or a comment. Copilot suggests completions in gray text. Press Tab to accept.</li><li><strong>Open Copilot Chat</strong> — Press Ctrl+Shift+I to open chat. Ask questions or request edits with @workspace context.</li></ol>`,
    howtos: [
      { title: 'Use Copilot Chat for code review', content: 'Select code, right-click → "Copilot" → "Review and Comment." Or open Copilot Chat and say "Review this function for bugs and edge cases."' },
      { title: 'Use Copilot to write tests', content: 'Open a source file, then open Copilot Chat and say "Write unit tests for this file using Jest." Copilot generates tests following the patterns in your project.' },
      { title: 'Use @workspace in Copilot Chat', content: 'Add @workspace to any Copilot Chat message to search across your entire codebase. Example: "@workspace How does the authentication middleware work?"' },
    ],
  },
  {
    id: 'codeium', name: 'Codeium', company: 'Codeium', category: 'code-assistant', featured: false,
    description: 'A free AI code assistant supporting 70+ languages and 40+ editors. Offers autocomplete, chat, and search. No usage limits on the free tier.',
    tags: ['free', 'multi-editor', '70+ languages', 'autocomplete'],
    url: 'https://codeium.com', docsUrl: 'https://codeium.com/docs', quickstartUrl: 'https://codeium.com/docs/getting-started',
    icon: '⬢', iconBg: '#09b585',
    quickstart: `<ol class="steps"><li><strong>Sign up for free</strong> — Create an account at <a href="https://codeium.com" target="_blank">codeium.com</a>.</li><li><strong>Install the extension</strong> — Find Codeium in your editor's marketplace (VS Code, JetBrains, Neovim, Emacs, etc.).</li><li><strong>Authenticate</strong> — Click "Sign In" in the extension and log in to your Codeium account.</li><li><strong>Use autocomplete</strong> — Start typing and Codeium suggests completions. Tab to accept. Works in 70+ programming languages.</li></ol>`,
    howtos: [
      { title: 'Use Codeium Command (Cmd+I)', content: 'Press Cmd+I to open an inline prompt. Describe what you want the highlighted code to do and Codeium rewrites it. Works for refactoring, fixing bugs, and generating boilerplate.' },
    ],
  },
  {
    id: 'amazon-q', name: 'Amazon Q Developer', company: 'Amazon Web Services', category: 'code-assistant', featured: false,
    description: 'AWS\'s AI coding assistant with deep integration into AWS services. Helps write, debug, and transform code. Free tier available in VS Code and JetBrains.',
    tags: ['AWS', 'cloud', 'free tier', 'security scanning'],
    url: 'https://aws.amazon.com/q/developer/', docsUrl: 'https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html', quickstartUrl: 'https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/getting-started.html',
    icon: 'Q', iconBg: '#ff9900',
    quickstart: `<ol class="steps"><li><strong>Install the extension</strong> — Install "AWS Toolkit" in VS Code or JetBrains, which includes Amazon Q Developer.</li><li><strong>Sign in</strong> — Use "Sign in with AWS Builder ID" (free) or your AWS SSO for paid tiers.</li><li><strong>Start coding</strong> — Amazon Q suggests completions as you type. Press Tab to accept.</li><li><strong>Open the chat panel</strong> — Ask questions about AWS services, get code explanations, or request code generation.</li></ol>`,
    howtos: [
      { title: 'Use Amazon Q for security scanning', content: 'Run Amazon Q Security Scan to detect hardcoded credentials, vulnerable dependencies, and OWASP Top 10 issues. It provides line-level findings and suggested fixes.' },
    ],
  },
  {
    id: 'continue', name: 'Continue.dev', company: 'Continue', category: 'code-assistant', featured: false,
    description: 'An open-source AI code assistant for VS Code and JetBrains. Connect any LLM (local or cloud) and customize everything. Free, private, and extensible.',
    tags: ['open-source', 'any LLM', 'local', 'VS Code', 'privacy'],
    url: 'https://continue.dev', docsUrl: 'https://docs.continue.dev', quickstartUrl: 'https://docs.continue.dev/quickstart',
    icon: '↻', iconBg: '#1e40af',
    quickstart: `<ol class="steps"><li><strong>Install Continue</strong> — Install from the VS Code or JetBrains marketplace.</li><li><strong>Configure your LLM</strong> — Open config.json (click the gear icon) and add your preferred model provider (Anthropic, OpenAI, Ollama, Gemini, etc.).</li><li><strong>Chat about code</strong> — Press Cmd+L to open chat. Highlight code and ask questions, or use @codebase to search your project.</li></ol>`,
    howtos: [
      { title: 'Connect local models to Continue', content: 'Install Ollama and run a model locally. In Continue\'s config.json, add a provider with type "ollama" and set the model name. Continue routes requests to your local model — zero data leaves your machine.' },
    ],
  },

  // ── Image Generation ──────────────────────────────────────────────────────────
  {
    id: 'midjourney', name: 'Midjourney', company: 'Midjourney', category: 'image', featured: true,
    description: 'The industry standard for photorealistic and artistic AI image generation. Known for stunning aesthetics and an active community. Accessible via Discord and a web interface.',
    tags: ['photorealistic', 'artistic', 'Discord', 'high quality'],
    url: 'https://midjourney.com', docsUrl: 'https://docs.midjourney.com', quickstartUrl: 'https://docs.midjourney.com/docs/quick-start',
    icon: '◭', iconBg: '#111111',
    quickstart: `<ol class="steps"><li><strong>Join Midjourney</strong> — Go to <a href="https://midjourney.com" target="_blank">midjourney.com</a> and subscribe (Basic $10/mo).</li><li><strong>Use the web interface</strong> — Visit midjourney.com/imagine to generate images directly without Discord.</li><li><strong>Or use Discord</strong> — Join the Midjourney Discord server and use a bot channel: <code>/imagine prompt: [your description]</code>.</li><li><strong>Upscale and vary</strong> — Click U1-U4 to upscale an image, or V1-V4 to create variations.</li></ol>`,
    howtos: [
      { title: 'Write effective Midjourney prompts', content: 'Be specific: describe subject, setting, style, lighting, and mood. Add style keywords like "cinematic lighting", "f/1.8 bokeh", "8K". Use --no for negative prompts and --ar 16:9 for widescreen.' },
      { title: 'Use Midjourney parameters', content: '`--ar` sets aspect ratio (e.g., --ar 16:9). `--v 6` uses model version 6. `--style raw` reduces default stylization. `--q 2` increases quality. `--seed [number]` for reproducibility.' },
    ],
  },
  {
    id: 'dalle3', name: 'DALL-E 3', company: 'OpenAI', category: 'image', featured: false,
    description: 'OpenAI\'s image generation model with excellent prompt adherence. Integrated into ChatGPT and available via the Images API. Great for accurate text rendering in images.',
    tags: ['ChatGPT', 'API', 'text rendering', 'accurate'],
    url: 'https://openai.com/dall-e-3', docsUrl: 'https://platform.openai.com/docs/guides/images', quickstartUrl: 'https://platform.openai.com/docs/guides/images/quickstart',
    icon: '◆', iconBg: '#10a37f',
    quickstart: `<ol class="steps"><li><strong>Use via ChatGPT</strong> — Ask ChatGPT (Plus) to "Draw an image of..." DALL-E 3 generates it inline in the chat.</li><li><strong>Use via the API</strong> — Call the Images API: <code>client.images.generate({ model: "dall-e-3", prompt: "...", size: "1024x1024" })</code>.</li><li><strong>Request revisions</strong> — Ask ChatGPT to change specific aspects: "Make the sky more dramatic."</li></ol>`,
    howtos: [
      { title: 'Generate images with text using DALL-E 3', content: 'DALL-E 3 is the best model for including accurate text in images. In your prompt, wrap text in quotes: \'A sign that reads "Grand Opening"\'. Keep text short for best results.' },
    ],
  },
  {
    id: 'stable-diffusion', name: 'Stable Diffusion', company: 'Stability AI', category: 'image', featured: false,
    description: 'The leading open-source image generation model. Runs locally on consumer GPUs. Huge ecosystem of fine-tuned models, LoRAs, and tools (Automatic1111, ComfyUI).',
    tags: ['open-source', 'local', 'free', 'LoRA', 'ComfyUI'],
    url: 'https://stability.ai', docsUrl: 'https://platform.stability.ai/docs/api-reference', quickstartUrl: 'https://stability.ai/learning-hub',
    icon: '☯', iconBg: '#1a1a2e',
    quickstart: `<ol class="steps"><li><strong>Choose a UI</strong> — Popular choices: Automatic1111 WebUI, ComfyUI, or DreamStudio (cloud).</li><li><strong>Install AUTOMATIC1111</strong> — Clone the repo, run webui-user.bat (Windows) or webui.sh (Linux/Mac). Requires 4GB+ VRAM GPU.</li><li><strong>Download a model</strong> — Download SDXL or SD 1.5 checkpoints from civitai.com or Hugging Face.</li><li><strong>Generate</strong> — Enter a positive and negative prompt, set steps (20-30), and click Generate.</li></ol>`,
    howtos: [
      { title: 'Use LoRA models', content: 'LoRAs are small fine-tuned adapters that add specific styles or concepts. Download from CivitAI. Place in models/Lora folder. Reference in prompts with `<lora:filename:weight>`.' },
      { title: 'Use ControlNet for precise control', content: 'Install the ControlNet extension in A1111. Use pose estimation (OpenPose), depth maps, or edge detection (Canny) as control signals. Upload a reference image and SD generates a new image matching its structure.' },
    ],
  },
  {
    id: 'adobe-firefly', name: 'Adobe Firefly', company: 'Adobe', category: 'image', featured: false,
    description: 'Adobe\'s generative AI model trained on licensed content. Integrated into Photoshop, Illustrator, and Express. Safe for commercial use with content credentials.',
    tags: ['commercial-safe', 'Photoshop', 'Illustrator', 'vector'],
    url: 'https://www.adobe.com/products/firefly.html', docsUrl: 'https://developer.adobe.com/firefly-api/docs', quickstartUrl: 'https://helpx.adobe.com/firefly/get-started.html',
    icon: '✦', iconBg: '#f59e0b',
    quickstart: `<ol class="steps"><li><strong>Access Firefly</strong> — Go to <a href="https://firefly.adobe.com" target="_blank">firefly.adobe.com</a> or use it inside Photoshop via Generative Fill.</li><li><strong>Generate with text</strong> — Type a prompt on the Firefly web app to generate images. Free credits available monthly.</li><li><strong>Use Generative Fill in Photoshop</strong> — Select an area, click "Generative Fill" in the toolbar, enter a prompt, and click Generate.</li></ol>`,
    howtos: [
      { title: 'Use Generative Expand in Photoshop', content: 'Use the Crop tool to extend your canvas beyond the image bounds. Select the empty area, then use Generative Fill with an empty prompt to let Firefly extend the image seamlessly.' },
    ],
  },
  {
    id: 'ideogram', name: 'Ideogram', company: 'Ideogram', category: 'image', featured: false,
    description: 'An AI image generator specializing in accurate text rendering within images. Excellent for logos, posters, typography designs, and any image requiring legible text.',
    tags: ['text rendering', 'logos', 'typography', 'posters'],
    url: 'https://ideogram.ai', docsUrl: 'https://api.ideogram.ai/docs', quickstartUrl: 'https://ideogram.ai/t/explore',
    icon: 'I', iconBg: '#3730a3',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Create an account at <a href="https://ideogram.ai" target="_blank">ideogram.ai</a>. 10 free images/day.</li><li><strong>Write your prompt</strong> — Include the text you want in quotes: <em>"A vintage poster with the words 'Adventure Awaits' in bold serif font."</em></li><li><strong>Choose a style</strong> — Select Photorealistic, Illustration, or Design. Choose your aspect ratio.</li></ol>`,
    howtos: [
      { title: 'Create logos with Ideogram', content: 'Use the Design style for logo generation. Describe the company name, industry, preferred colors, and style. Put the company name in quotes to ensure accurate spelling.' },
    ],
  },
  {
    id: 'flux', name: 'Flux', company: 'Black Forest Labs', category: 'image', featured: false,
    description: 'The latest generation of high-quality open-weight image models. Flux.1 Pro and Schnell set new benchmarks for image quality, prompt adherence, and diversity.',
    tags: ['open-weight', 'high quality', 'API', 'prompt adherence'],
    url: 'https://blackforestlabs.ai', docsUrl: 'https://docs.bfl.ml', quickstartUrl: 'https://docs.bfl.ml/quick_start/flux1_dev',
    icon: 'F', iconBg: '#0f172a',
    quickstart: `<ol class="steps"><li><strong>Try Flux on Fal.ai</strong> — Visit <a href="https://fal.ai/models/fal-ai/flux/dev" target="_blank">fal.ai</a> or replicate.com for a no-setup demo.</li><li><strong>Use the BFL API</strong> — Get an API key at api.bfl.ml and call the REST API with your prompt and model choice.</li><li><strong>Run locally</strong> — Download Flux.1 Schnell or Dev from Hugging Face and run with ComfyUI.</li></ol>`,
    howtos: [
      { title: 'Choose the right Flux model', content: 'Flux.1 Pro: best quality, cloud-only. Flux.1 Dev: excellent quality, open weights for non-commercial use. Flux.1 Schnell: fastest (4 steps), open weights for commercial use.' },
    ],
  },

  // ── Video Generation ──────────────────────────────────────────────────────────
  {
    id: 'runway', name: 'Runway', company: 'Runway', category: 'video', featured: true,
    description: 'A professional-grade AI video platform with Gen-3 Alpha. Text-to-video, image-to-video, video-to-video, and a full suite of editing tools. Used in Hollywood productions.',
    tags: ['text-to-video', 'image-to-video', 'professional', 'editing'],
    url: 'https://runwayml.com', docsUrl: 'https://docs.runwayml.com', quickstartUrl: 'https://docs.runwayml.com/docs/introduction',
    icon: 'R', iconBg: '#ef4444',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Create an account at <a href="https://runwayml.com" target="_blank">runwayml.com</a>. Free tier includes 125 one-time credits.</li><li><strong>Try Gen-3 Alpha</strong> — Click "Generate" → "Video." Enter a text prompt or upload an image as a starting frame.</li><li><strong>Configure output</strong> — Set duration (5 or 10 seconds), aspect ratio, and motion settings.</li><li><strong>Generate and download</strong> — Click Generate. View in the gallery when done, then download the MP4.</li></ol>`,
    howtos: [
      { title: 'Use image-to-video for control', content: 'Upload an image as the first frame to get predictable results. Describe what motion should happen. For end-frame control, use "Interpolate" mode — upload start and end frames and Runway animates between them.' },
    ],
  },
  {
    id: 'sora', name: 'Sora', company: 'OpenAI', category: 'video', featured: true,
    description: 'OpenAI\'s text-to-video model capable of generating realistic and imaginative scenes. Produces high-resolution videos up to 20 seconds with cinematic quality.',
    tags: ['text-to-video', 'cinematic', 'high-resolution', 'OpenAI'],
    url: 'https://openai.com/sora', docsUrl: 'https://platform.openai.com/docs/guides/video', quickstartUrl: 'https://openai.com/sora',
    icon: 'S', iconBg: '#10a37f',
    quickstart: `<ol class="steps"><li><strong>Access Sora</strong> — Available at <a href="https://sora.com" target="_blank">sora.com</a> for ChatGPT Plus, Pro, and Team subscribers.</li><li><strong>Write a prompt</strong> — Describe your scene in detail: subject, action, setting, camera angle, and style.</li><li><strong>Choose settings</strong> — Select resolution (720p/1080p), duration, and aspect ratio.</li><li><strong>Try Storyboard</strong> — Use Storyboard mode to add specific actions at certain timestamps for more control.</li></ol>`,
    howtos: [
      { title: 'Write effective Sora prompts', content: 'Describe the scene cinematically: "A cinematic drone shot flying over golden wheat fields at sunset, slow motion, warm color grading." Include camera movements like "slow push in", "tracking shot", "handheld."' },
    ],
  },
  {
    id: 'pika', name: 'Pika Labs', company: 'Pika Labs', category: 'video', featured: false,
    description: 'An accessible AI video generation platform. Generate and edit videos from text or images. Features include lip sync, sound effects, and the Pikaffects motion library.',
    tags: ['text-to-video', 'lip sync', 'accessible', 'effects'],
    url: 'https://pika.art', docsUrl: 'https://pika.art/explore', quickstartUrl: 'https://pika.art',
    icon: 'P', iconBg: '#7c3aed',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Create a free account at <a href="https://pika.art" target="_blank">pika.art</a>. Free tier with limited credits.</li><li><strong>Create a video</strong> — Click "Create" and enter a text prompt or upload an image.</li><li><strong>Apply Pikaffects</strong> — Choose from preset motions like "Explode", "Melt", or "Inflate."</li><li><strong>Add audio</strong> — Use AI sound effects or upload audio for lip sync.</li></ol>`,
    howtos: [
      { title: 'Use Pika for lip sync', content: 'Upload a video or image of a person. Upload an audio file. Pika will animate the lips to match the audio. Works with both realistic and animated characters.' },
    ],
  },
  {
    id: 'luma', name: 'Luma Dream Machine', company: 'Luma AI', category: 'video', featured: false,
    description: 'Luma AI\'s text-to-video and image-to-video generator. Known for smooth camera motion and photorealistic output. Also offers a 3D capture app for iOS.',
    tags: ['text-to-video', 'camera motion', '3D', 'API'],
    url: 'https://lumalabs.ai/dream-machine', docsUrl: 'https://lumalabs.ai/dream-machine/api', quickstartUrl: 'https://lumalabs.ai/dream-machine',
    icon: 'L', iconBg: '#6366f1',
    quickstart: `<ol class="steps"><li><strong>Sign up</strong> — Create an account at <a href="https://lumalabs.ai/dream-machine" target="_blank">lumalabs.ai/dream-machine</a>.</li><li><strong>Generate a video</strong> — Enter a text prompt or upload an image. Describe camera movements and subject motion.</li><li><strong>Use camera controls</strong> — Specify camera motions like "dolly in", "arc left", "static" for cinematic control.</li></ol>`,
    howtos: [
      { title: 'Use the Luma API', content: 'Get an API key from lumalabs.ai/dream-machine/api. POST to the generations endpoint with prompt, keyframes (start/end images), and loop setting. Poll for completion and download the video URL.' },
    ],
  },

  // ── Voice & Audio ─────────────────────────────────────────────────────────────
  {
    id: 'elevenlabs', name: 'ElevenLabs', company: 'ElevenLabs', category: 'audio', featured: true,
    description: 'The leading AI voice platform. Clone voices from a short audio sample, generate hyper-realistic speech, and produce multilingual audio. Widely used in content creation and apps.',
    tags: ['voice cloning', 'TTS', 'multilingual', 'API'],
    url: 'https://elevenlabs.io', docsUrl: 'https://elevenlabs.io/docs', quickstartUrl: 'https://elevenlabs.io/docs/introduction',
    icon: '♪', iconBg: '#ec4899',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Sign up at <a href="https://elevenlabs.io" target="_blank">elevenlabs.io</a>. Free tier includes 10,000 characters/month.</li><li><strong>Use Speech Synthesis</strong> — Go to Text to Speech, paste text, choose a voice, and click Generate.</li><li><strong>Clone a voice</strong> — Go to Voice Lab → "Add a new voice" → "Instant Voice Cloning." Upload 1+ minutes of clean audio.</li><li><strong>Use the API</strong> — Get your API key from your profile. Use the ElevenLabs SDK for Python or JavaScript.</li></ol>`,
    howtos: [
      { title: 'Build a TTS app with the ElevenLabs API', content: 'Install: `npm install elevenlabs`. Initialize with your API key. Call `elevenlabs.generate({ voice: "Rachel", text: "Hello world", model_id: "eleven_multilingual_v2" })`. Stream the audio or save as MP3.' },
      { title: 'Use Dubbing for translation', content: 'Upload a video or audio file. Select the target language. ElevenLabs transcribes, translates, matches timing, and lip-syncs automatically. Supports 30+ languages.' },
    ],
  },
  {
    id: 'suno', name: 'Suno AI', company: 'Suno', category: 'audio', featured: true,
    description: 'Create full songs with lyrics, vocals, and instrumentation from a text prompt. Produces studio-quality music in any genre in seconds. No musical knowledge required.',
    tags: ['music generation', 'lyrics', 'vocals', 'full songs'],
    url: 'https://suno.com', docsUrl: 'https://suno.com/blog', quickstartUrl: 'https://suno.com',
    icon: '♫', iconBg: '#7c3aed',
    quickstart: `<ol class="steps"><li><strong>Go to Suno</strong> — Visit <a href="https://suno.com" target="_blank">suno.com</a> and sign in. 50 free credits/day.</li><li><strong>Describe your song</strong> — Enter a style and topic prompt like: <em>"Upbeat indie pop song about a road trip at sunrise."</em></li><li><strong>Or use Custom Mode</strong> — Toggle Custom Mode to write your own lyrics and separately specify the style and genre.</li><li><strong>Generate 2 variations</strong> — Suno always creates two versions. Pick the one you prefer and extend it or remix.</li></ol>`,
    howtos: [
      { title: 'Write effective Suno prompts', content: 'Include: genre, tempo, mood, instruments, vocal style, and era. Example: "Melancholic 80s synth-pop, female vocals, driving bass, ABBA-inspired melodies." Add [verse], [chorus], [bridge] markers in Custom Mode.' },
    ],
  },
  {
    id: 'whisper', name: 'OpenAI Whisper', company: 'OpenAI', category: 'audio', featured: false,
    description: 'OpenAI\'s open-source speech recognition model. Highly accurate transcription in 99 languages. Runs locally, available via the OpenAI API, and powering many apps.',
    tags: ['transcription', 'open-source', 'multilingual', 'local'],
    url: 'https://openai.com/research/whisper', docsUrl: 'https://platform.openai.com/docs/guides/speech-to-text', quickstartUrl: 'https://platform.openai.com/docs/guides/speech-to-text/quickstart',
    icon: 'W', iconBg: '#1a1a2e',
    quickstart: `<ol class="steps"><li><strong>Use via the OpenAI API</strong> — POST to /v1/audio/transcriptions with your audio file and model="whisper-1". Supports MP3, MP4, WAV, WEBM up to 25MB.</li><li><strong>Run locally</strong> — Install: <code>pip install openai-whisper</code>. Run: <code>whisper audio.mp3 --model medium</code>.</li><li><strong>Use Faster-Whisper</strong> — For faster local inference, install <code>faster-whisper</code> (runs 4x faster with same accuracy).</li></ol>`,
    howtos: [
      { title: 'Transcribe and timestamp audio with Whisper', content: 'Use `whisper audio.mp3 --output_format srt` to generate SRT subtitle files with timestamps. Useful for YouTube captions, meeting notes, and podcast transcripts.' },
    ],
  },
  {
    id: 'playht', name: 'PlayHT', company: 'PlayHT', category: 'audio', featured: false,
    description: 'AI voice generation platform with 900+ voices in 142 languages. Offers voice cloning, ultra-realistic TTS, and an API for building voice-enabled applications.',
    tags: ['TTS', 'voice cloning', '900+ voices', 'API'],
    url: 'https://play.ht', docsUrl: 'https://docs.play.ht', quickstartUrl: 'https://docs.play.ht/reference/api-getting-started',
    icon: '▶', iconBg: '#f97316',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Sign up at <a href="https://play.ht" target="_blank">play.ht</a>. Free plan includes 12,500 characters/month.</li><li><strong>Generate speech</strong> — Paste text, select a voice (browse 900+ options), and click Generate.</li><li><strong>Use the API</strong> — Get User ID and API Key from My Account. Use the PlayHT SDK for Node.js or Python.</li></ol>`,
    howtos: [
      { title: 'Stream TTS with PlayHT API', content: 'Use the PlayHT Node.js SDK: `const PlayHT = require("playht"); PlayHT.init({apiKey, userId}); const stream = await PlayHT.stream(text, {voiceEngine: "Play3.0-mini"})`. Pipe stream directly to audio output for low-latency playback.' },
    ],
  },

  // ── AI Agents & APIs ──────────────────────────────────────────────────────────
  {
    id: 'langchain', name: 'LangChain', company: 'LangChain', category: 'agents', featured: true,
    description: 'The most popular framework for building LLM-powered applications. Provides chains, agents, RAG, memory, and integrations with hundreds of tools and data sources.',
    tags: ['framework', 'RAG', 'agents', 'Python', 'JavaScript'],
    url: 'https://langchain.com', docsUrl: 'https://python.langchain.com/docs', quickstartUrl: 'https://python.langchain.com/docs/tutorials/llm_chain/',
    icon: '⛓', iconBg: '#1c3a5e',
    quickstart: `<ol class="steps"><li><strong>Install LangChain</strong> — <code>pip install langchain langchain-anthropic</code></li><li><strong>Set up a model</strong> — <code>from langchain_anthropic import ChatAnthropic; llm = ChatAnthropic(model="claude-sonnet-4-6")</code></li><li><strong>Create a simple chain</strong> — <code>chain = prompt | llm | output_parser; chain.invoke({"topic": "AI"})</code></li><li><strong>Build a RAG pipeline</strong> — Load documents → Split → Embed → Store in vector DB → Retrieve → Generate.</li></ol>`,
    howtos: [
      { title: 'Build a RAG application', content: 'Load documents with DocumentLoaders. Split with RecursiveCharacterTextSplitter. Embed with OpenAIEmbeddings. Store in Chroma, Pinecone, or FAISS. Retrieve and pass to an LLM with create_retrieval_chain.' },
      { title: 'Build a ReAct agent', content: 'Define tools as Python functions with @tool decorator. Create an agent with create_react_agent(llm, tools, prompt). Wrap in AgentExecutor. The agent reasons step-by-step and calls tools to complete tasks.' },
    ],
  },
  {
    id: 'huggingface', name: 'Hugging Face', company: 'Hugging Face', category: 'agents', featured: true,
    description: 'The GitHub of machine learning. Hub for 500,000+ models, datasets, and Spaces demos. The Transformers library is the standard for working with open-source AI models.',
    tags: ['model hub', 'Transformers', 'datasets', 'Spaces', 'open-source'],
    url: 'https://huggingface.co', docsUrl: 'https://huggingface.co/docs', quickstartUrl: 'https://huggingface.co/docs/transformers/quicktour',
    icon: '🤗', iconBg: '#ff9d00',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Sign up at <a href="https://huggingface.co" target="_blank">huggingface.co</a>.</li><li><strong>Install Transformers</strong> — <code>pip install transformers datasets accelerate</code></li><li><strong>Run inference with pipeline</strong> — <code>from transformers import pipeline; generator = pipeline("text-generation", model="meta-llama/Llama-3.2-3B")</code></li><li><strong>Use the Inference API</strong> — Call any model via REST without downloading it.</li></ol>`,
    howtos: [
      { title: 'Fine-tune a model with SFT', content: 'Use TRL library: `from trl import SFTTrainer`. Prepare a dataset in chat template format. Configure LoRA with PEFT for memory-efficient fine-tuning. Train on a single A100 GPU.' },
      { title: 'Deploy with Inference Endpoints', content: 'Go to your model page → Deploy → Inference Endpoints. Choose instance type, auto-scaling settings, and security. Get a dedicated endpoint URL with guaranteed latency.' },
    ],
  },
  {
    id: 'openai-api', name: 'OpenAI API', company: 'OpenAI', category: 'agents', featured: true,
    description: 'Access GPT-4o, o1, DALL-E, Whisper, TTS, and Embeddings via API. The most widely integrated AI API with SDKs for every major language and framework.',
    tags: ['GPT-4o', 'embeddings', 'function calling', 'assistants'],
    url: 'https://platform.openai.com', docsUrl: 'https://platform.openai.com/docs', quickstartUrl: 'https://platform.openai.com/docs/quickstart',
    icon: '⊕', iconBg: '#10a37f',
    quickstart: `<ol class="steps"><li><strong>Get API access</strong> — Create an account at <a href="https://platform.openai.com" target="_blank">platform.openai.com</a> and generate an API key.</li><li><strong>Install the SDK</strong> — <code>npm install openai</code> or <code>pip install openai</code></li><li><strong>Make your first call</strong> — <code>const response = await openai.chat.completions.create({ model: "gpt-4o", messages: [{role:"user", content:"Hello!"}] })</code></li><li><strong>Set up billing</strong> — Add a payment method and set usage limits in your account.</li></ol>`,
    howtos: [
      { title: 'Use function calling (tool use)', content: 'Define tools as JSON schemas. Pass them in the `tools` array. When GPT decides to call a function, it returns `tool_calls`. Execute the function and send the result back as a tool message.' },
      { title: 'Use the Assistants API', content: 'Create a persistent Assistant with instructions, model, and tools (code interpreter, file search, function calling). Create a Thread, add Messages, and Run the thread. The Assistant manages context automatically.' },
    ],
  },
  {
    id: 'anthropic-api', name: 'Anthropic API', company: 'Anthropic', category: 'agents', featured: true,
    description: 'Production access to Claude models via the Anthropic API. Supports the Messages API, streaming, vision, tool use, and a 200K token context window.',
    tags: ['Claude', 'tool use', '200K context', 'streaming', 'vision'],
    url: 'https://console.anthropic.com', docsUrl: 'https://docs.anthropic.com', quickstartUrl: 'https://docs.anthropic.com/en/docs/quickstart',
    icon: '✦', iconBg: '#8b5cf6',
    quickstart: `<ol class="steps"><li><strong>Get API access</strong> — Sign up at <a href="https://console.anthropic.com" target="_blank">console.anthropic.com</a> and create an API key.</li><li><strong>Install the SDK</strong> — <code>npm install @anthropic-ai/sdk</code> or <code>pip install anthropic</code></li><li><strong>Make a call</strong> — <code>const msg = await anthropic.messages.create({ model: "claude-sonnet-4-6", max_tokens: 1024, messages: [{role:"user", content:"Hello!"}] })</code></li><li><strong>Try tool use</strong> — Define tools with name, description, and input_schema. Claude decides when to call them.</li></ol>`,
    howtos: [
      { title: 'Use Claude with tool use', content: 'Define tools as JSON schema objects. Pass in `tools` array. When Claude uses a tool, it returns `tool_use` content blocks. Process the tool call, then send a `tool_result` user message back.' },
      { title: 'Process large documents with 200K context', content: 'Claude supports up to 200K tokens (~150K words) in a single call. Load entire codebases, books, or legal contracts. Use the `system` parameter for persistent instructions.' },
    ],
  },
  {
    id: 'crewai', name: 'CrewAI', company: 'CrewAI', category: 'agents', featured: false,
    description: 'A framework for orchestrating role-playing, autonomous AI agents. Define a crew of agents with specific roles, goals, and tools that collaborate to complete complex tasks.',
    tags: ['multi-agent', 'Python', 'autonomous', 'role-playing'],
    url: 'https://crewai.com', docsUrl: 'https://docs.crewai.com', quickstartUrl: 'https://docs.crewai.com/introduction',
    icon: '⚙', iconBg: '#dc2626',
    quickstart: `<ol class="steps"><li><strong>Install</strong> — <code>pip install crewai crewai-tools</code></li><li><strong>Define agents</strong> — Create Agent objects with role, goal, backstory, tools, and llm.</li><li><strong>Define tasks</strong> — Create Task objects with description, expected_output, and agent assignment.</li><li><strong>Create a crew</strong> — <code>crew = Crew(agents=[researcher, writer], tasks=[task1, task2], process=Process.sequential)</code></li><li><strong>Run it</strong> — <code>result = crew.kickoff(inputs={"topic": "AI trends 2025"})</code></li></ol>`,
    howtos: [
      { title: 'Build a research-to-report crew', content: 'Create a Researcher agent with web search tools, a Data Analyst agent, and a Writer agent. Chain their tasks sequentially where each agent\'s output feeds the next.' },
    ],
  },

  // ── Productivity ──────────────────────────────────────────────────────────────
  {
    id: 'notion-ai', name: 'Notion AI', company: 'Notion', category: 'productivity', featured: true,
    description: 'AI built into Notion for writing, summarizing, and searching your workspace. Ask questions about your docs, generate content, and use AI to manage tasks.',
    tags: ['writing', 'summarization', 'Q&A', 'workspace'],
    url: 'https://notion.so', docsUrl: 'https://www.notion.so/help/guides/notion-ai-faqs', quickstartUrl: 'https://www.notion.so/help/guides/notion-ai-for-beginners',
    icon: 'N', iconBg: '#111111',
    quickstart: `<ol class="steps"><li><strong>Enable Notion AI</strong> — Notion AI is $8/member/month as an add-on. Enable it in Settings.</li><li><strong>Ask AI a question</strong> — Press Space on any blank line to open the AI menu. Or click "Ask AI" at the top of any page.</li><li><strong>Search across your workspace</strong> — Ask "What did we decide about the product roadmap?" and Notion AI searches all connected pages.</li><li><strong>Use AI blocks</strong> — Create auto-summarizing blocks that update when source pages change.</li></ol>`,
    howtos: [
      { title: 'Use Notion AI for meeting notes', content: 'After adding raw meeting notes, select all text and ask AI to "Create a structured summary with key decisions, action items, and open questions."' },
      { title: 'Auto-fill database properties with AI', content: 'In a Notion database, create an AI property that auto-generates content. Example: "Summarize this page in 2 sentences" runs on every page in the database.' },
    ],
  },
  {
    id: 'grammarly', name: 'Grammarly AI', company: 'Grammarly', category: 'productivity', featured: false,
    description: 'AI writing assistant that checks grammar, tone, clarity, and style. Available as a browser extension and in apps. GrammarlyGO provides generative writing suggestions.',
    tags: ['writing', 'grammar', 'tone', 'browser extension'],
    url: 'https://grammarly.com', docsUrl: 'https://support.grammarly.com', quickstartUrl: 'https://www.grammarly.com/blog/get-started-with-grammarly/',
    icon: 'G', iconBg: '#15c39a',
    quickstart: `<ol class="steps"><li><strong>Install Grammarly</strong> — Install the browser extension from <a href="https://grammarly.com" target="_blank">grammarly.com</a>. Works across all websites.</li><li><strong>Write anywhere</strong> — Grammarly appears as an underline on errors and as a sidebar panel. Click suggestions to apply fixes.</li><li><strong>Use GrammarlyGO</strong> — Click the Grammarly icon in any text field to generate, rewrite, or improve text with AI.</li></ol>`,
    howtos: [
      { title: 'Use Grammarly for professional emails', content: 'Grammarly detects the tone of your email and suggests adjustments. Use the Rewrite with AI feature to rephrase sentences that sound unclear or aggressive.' },
    ],
  },
  {
    id: 'otter', name: 'Otter.ai', company: 'Otter.ai', category: 'productivity', featured: false,
    description: 'AI meeting assistant that transcribes, summarizes, and generates action items from meetings. Integrates with Zoom, Google Meet, and Teams.',
    tags: ['transcription', 'meetings', 'Zoom', 'action items'],
    url: 'https://otter.ai', docsUrl: 'https://help.otter.ai', quickstartUrl: 'https://help.otter.ai/hc/en-us/articles/360047400973-How-to-get-started-with-Otter',
    icon: 'O', iconBg: '#07b6d5',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Sign up at <a href="https://otter.ai" target="_blank">otter.ai</a>. Free plan includes 300 min/month of transcription.</li><li><strong>Integrate with calendar</strong> — Connect Google or Outlook calendar. OtterPilot will auto-join and transcribe your meetings.</li><li><strong>Record live</strong> — Open the Otter app and tap Record to transcribe in real time with speaker identification.</li><li><strong>Review the summary</strong> — After the meeting, Otter generates a summary with key topics and action items.</li></ol>`,
    howtos: [
      { title: 'Extract action items from meetings', content: 'After a meeting, click "Action Items" in the transcript view. Otter identifies commitments and assigns them to speakers. Export to Slack, Notion, or Asana via integrations.' },
    ],
  },
  {
    id: 'jasper', name: 'Jasper AI', company: 'Jasper', category: 'productivity', featured: false,
    description: 'An AI content platform built for marketing teams. Create blog posts, ad copy, social media, and email campaigns at scale. Includes brand voice training and team workflows.',
    tags: ['marketing', 'copywriting', 'brand voice', 'team'],
    url: 'https://jasper.ai', docsUrl: 'https://www.jasper.ai/resources', quickstartUrl: 'https://www.jasper.ai/academy',
    icon: 'J', iconBg: '#6366f1',
    quickstart: `<ol class="steps"><li><strong>Create an account</strong> — Sign up at <a href="https://jasper.ai" target="_blank">jasper.ai</a>. 7-day free trial.</li><li><strong>Set up Brand Voice</strong> — Upload sample content so Jasper learns your brand's tone and style.</li><li><strong>Use a template</strong> — Browse 50+ templates: Blog Post, Facebook Ad, Product Description, and more.</li><li><strong>Use Jasper Chat</strong> — Chat directly with Jasper to brainstorm, research topics, and generate long-form content.</li></ol>`,
    howtos: [
      { title: 'Create a blog post with Jasper', content: 'Use the SEO Blog Post template. Enter your target keyword, headline, and tone. Jasper generates an SEO-optimized outline. Expand each section with AI, then add your own insights.' },
    ],
  },
];

// ─── Helper functions ──────────────────────────────────────────────────────────

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find(t => t.id === id);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  if (categoryId === 'all') return TOOLS;
  return TOOLS.filter(t => t.category === categoryId);
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter(t => t.featured);
}

export function getCategoryMeta(id: string): Category {
  return CATEGORIES.find(c => c.id === id) ?? CATEGORIES[0];
}

export function getRelatedTools(tool: Tool, count = 3): Tool[] {
  return TOOLS
    .filter(t => t.id !== tool.id && t.category === tool.category)
    .slice(0, count);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: TOOLS.length };
  CATEGORIES.slice(1).forEach(cat => {
    counts[cat.id] = TOOLS.filter(t => t.category === cat.id).length;
  });
  return counts;
}

export function searchTools(query: string, category: string = 'all'): Tool[] {
  let results = category === 'all' ? TOOLS : TOOLS.filter(t => t.category === category);
  if (!query.trim()) return results;
  const q = query.toLowerCase();
  return results.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.company.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.tags.some(tag => tag.toLowerCase().includes(q)) ||
    getCategoryMeta(t.category).label.toLowerCase().includes(q)
  );
}
