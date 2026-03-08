import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GenAI Hub — Complete Knowledge Base for AI Tools',
  description:
    'Discover, compare, and master 51 Generative AI tools across 8 categories. Quickstarts, how-to guides, and direct links to every major AI tool.',
  keywords: [
    'generative AI',
    'AI tools',
    'LLM',
    'Claude',
    'ChatGPT',
    'Midjourney',
    'AI knowledge base',
    'quickstart',
  ],
  openGraph: {
    title: 'GenAI Hub — AI Tools Knowledge Base',
    description:
      'The complete reference for Generative AI tools — 51 tools, 8 categories, quickstarts & how-tos.',
    type: 'website',
    url: 'https://claude-code-sample-app.vercel.app',
  },
  metadataBase: new URL('https://claude-code-sample-app.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-bg text-text min-h-screen`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
