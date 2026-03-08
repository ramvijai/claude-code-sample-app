'use client';

import { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from '@/lib/tools';
import { filterTools, buildCategoryCounts } from '@/lib/tools-db';
import type { Tool } from '@/lib/tools-db';
import ToolCard from './ToolCard';

interface Props {
  tools: Tool[];
}

export default function ToolsSection({ tools }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [isListView, setIsListView] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const counts = buildCategoryCounts(tools);
  const results = filterTools(tools, query, category);
  const totalTools = tools.length;

  // Scroll-reveal for cards
  useEffect(() => {
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.reveal');
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('visible'), idx * 40);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );
      cards.forEach((card) => obs.observe(card));
      return () => obs.disconnect();
    }, 100);
    return () => clearTimeout(timer);
  }, [results]);

  // ⌘K global shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
        document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
      }
      if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        searchRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="tools" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-text">All AI Tools</h2>
            <p className="text-text-sec mt-1">
              {totalTools} tools across {CATEGORIES.length - 1} categories
            </p>
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-surface">
            <button
              onClick={() => setIsListView(false)}
              className={`p-1.5 rounded-md transition-colors ${
                !isListView ? 'bg-s2 text-text' : 'text-text-mut hover:text-text-sec'
              }`}
              aria-label="Grid view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-1.5 rounded-md transition-colors ${
                isListView ? 'bg-s2 text-text' : 'text-text-mut hover:text-text-sec'
              }`}
              aria-label="List view"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mb-5">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-mut pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, company, or tags…  ⌘K"
            className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-mut focus:outline-none focus:border-purple/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.12)] transition-all text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-mut hover:text-text-sec transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filters */}
        <div id="categories" className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            const count = cat.id === 'all' ? totalTools : (counts[cat.id] ?? 0);
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  active
                    ? 'text-white border-transparent shadow-lg'
                    : 'border-border text-text-sec bg-surface hover:bg-s2 hover:border-border-h'
                }`}
                style={
                  active
                    ? { backgroundColor: cat.color, borderColor: cat.color, boxShadow: `0 4px 14px ${cat.color}40` }
                    : {}
                }
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-xs ${active ? 'opacity-80' : 'opacity-60'}`}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-text-mut">
            {results.length === 0
              ? 'No tools found'
              : `Showing ${results.length} of ${totalTools} tools`}
            {query && (
              <span>
                {' '}for <span className="text-text font-medium">"{query}"</span>
              </span>
            )}
          </p>
          {(query || category !== 'all') && (
            <button
              onClick={() => { setQuery(''); setCategory('all'); }}
              className="text-xs text-purple hover:text-purple/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Tool grid / list */}
        {results.length > 0 ? (
          <div
            className={
              isListView
                ? 'flex flex-col gap-3'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            }
          >
            {results.map((tool, i) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                style={{ transitionDelay: `${(i % 12) * 35}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold text-text-sec">No tools match your search</p>
            <p className="text-sm text-text-mut mt-1 mb-5">Try a different keyword or browse all categories</p>
            <button
              onClick={() => { setQuery(''); setCategory('all'); }}
              className="px-5 py-2.5 rounded-xl bg-purple/15 text-purple font-medium text-sm hover:bg-purple/25 transition-colors"
            >
              Show all tools
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
