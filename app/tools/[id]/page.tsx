import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getAllTools,
  getToolById,
  getToolIds,
  getCategoryMeta,
  getRelatedTools,
} from '@/lib/tools-db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HowToAccordion from '@/components/HowToAccordion';
import ToolCard from '@/components/ToolCard';

type Props = { params: Promise<{ id: string }> };

// Revalidate every hour — new tools added by the cron job become available
export const revalidate = 3600;

// Pre-render all known tool pages; new tools added by cron get rendered on first visit
export const dynamicParams = true;

export async function generateStaticParams() {
  const ids = await getToolIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tool = await getToolById(id);
  if (!tool) return {};
  return {
    title: `${tool.name} — GenAI Hub`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | GenAI Hub`,
      description: tool.description,
      type: 'article',
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { id } = await params;
  const [tool, allTools] = await Promise.all([getToolById(id), getAllTools()]);
  if (!tool) notFound();

  const category = getCategoryMeta(tool.category);
  const related = getRelatedTools(tool, 4, allTools);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero banner */}
        <div
          className="relative overflow-hidden border-b border-border"
          style={{
            background: `linear-gradient(135deg, ${tool.iconBg}22 0%, transparent 60%)`,
          }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ background: tool.iconBg }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-text-mut mb-8">
              <Link href="/" className="hover:text-text transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/#tools" className="hover:text-text transition-colors">
                Tools
              </Link>
              <span>/</span>
              <span
                className="font-medium"
                style={{ color: tool.iconBg }}
              >
                {tool.name}
              </span>
            </nav>

            {/* Tool header */}
            <div className="flex items-start gap-6 flex-wrap">
              {/* Icon */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold text-white flex-shrink-0 shadow-2xl"
                style={{
                  background: tool.iconBg,
                  boxShadow: `0 20px 60px ${tool.iconBg}50`,
                }}
              >
                {tool.icon}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium text-white"
                    style={{ background: category.color }}
                  >
                    {category.icon} {category.label}
                  </span>
                  {tool.featured && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple/20 text-purple border border-purple/30 font-medium">
                      ★ Featured
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-text">{tool.name}</h1>
                <p className="text-text-sec mt-1 text-lg">by {tool.company}</p>
                <p className="text-text-sec mt-3 max-w-2xl leading-relaxed">{tool.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border border-border bg-s2 text-text-sec"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: tool.iconBg,
                    boxShadow: `0 8px 24px ${tool.iconBg}40`,
                  }}
                >
                  Open Tool
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                {tool.docsUrl && (
                  <a
                    href={tool.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border bg-surface hover:bg-s2 hover:border-border-h text-text font-semibold text-sm transition-all"
                  >
                    Documentation
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Quickstart */}
              {tool.quickstart && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-green/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-text">Quick Start</h2>
                  </div>
                  <div className="rounded-xl border border-border bg-surface p-6">
                    <div
                      className="quickstart-content"
                      dangerouslySetInnerHTML={{ __html: tool.quickstart }}
                    />
                    {tool.quickstartUrl && (
                      <a
                        href={tool.quickstartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-5 text-sm text-purple hover:text-purple/80 transition-colors font-medium"
                      >
                        Full quickstart guide
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* How-tos */}
              {tool.howtos.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue/15 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-text">How-To Guides</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-s2 text-text-mut border border-border">
                      {tool.howtos.length}
                    </span>
                  </div>
                  <HowToAccordion howtos={tool.howtos} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick info card */}
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-text mb-4">Tool Info</h3>
                <dl className="space-y-3">
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs text-text-mut">Company</dt>
                    <dd className="text-xs text-text font-medium">{tool.company}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs text-text-mut">Category</dt>
                    <dd className="text-xs font-medium" style={{ color: category.color }}>
                      {category.icon} {category.label}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-xs text-text-mut">How-to Guides</dt>
                    <dd className="text-xs text-text font-medium">{tool.howtos.length}</dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs text-text-sec hover:text-text transition-colors py-1.5"
                  >
                    <span>Official website</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {tool.docsUrl && (
                    <a
                      href={tool.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs text-text-sec hover:text-text transition-colors py-1.5"
                    >
                      <span>Documentation</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {tool.quickstartUrl && (
                    <a
                      href={tool.quickstartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-xs text-text-sec hover:text-text transition-colors py-1.5"
                    >
                      <span>Quickstart guide</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Tags card */}
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold text-text mb-3">Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-lg bg-s2 text-text-sec border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related tools */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-text mb-6">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {related.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-sec hover:text-text transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all tools
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
