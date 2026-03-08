'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { label: 'AI Tools', value: 51 },
  { label: 'Categories', value: 8 },
  { label: 'How-To Guides', value: 200 },
];

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const startTime = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target, active]);

  return count;
}

function StatItem({ label, value, active }: { label: string; value: number; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="text-center px-6 first:pl-0 last:pr-0">
      <div className="text-3xl sm:text-4xl font-bold text-text tabular-nums">{count}+</div>
      <div className="text-sm text-text-sec mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function scrollToTools() {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-[10%] -left-[10%] w-[700px] h-[700px] rounded-full bg-purple/20 blur-[140px] animate-orb-1" />
        <div className="absolute -bottom-[15%] -right-[5%] w-[600px] h-[600px] rounded-full bg-blue/15 blur-[120px] animate-orb-2" />
        <div className="absolute top-[35%] left-[35%] w-[450px] h-[450px] rounded-full bg-indigo/10 blur-[100px] animate-orb-3" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-sm text-text-sec mb-8 shadow-[0_0_0_1px_var(--border)]">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse-dot flex-shrink-0" />
          51 AI tools — always up to date
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
          The complete guide to
          <br />
          <span className="gradient-text">Generative AI</span> tools
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-text-sec max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover, compare, and master every major AI tool — quickstarts, how-to guides, and direct
          links across 8 categories.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={scrollToTools}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-purple hover:bg-purple/90 text-white font-semibold text-sm transition-all shadow-xl shadow-purple/30 hover:shadow-purple/50 hover:-translate-y-0.5 active:translate-y-0"
          >
            Browse All Tools
          </button>
          <a
            href="#spotlight"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-border bg-surface hover:bg-s2 hover:border-border-h text-text font-semibold text-sm transition-all text-center"
          >
            View Featured →
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex justify-center divide-x divide-border"
        >
          {STATS.map((s) => (
            <StatItem key={s.label} label={s.label} value={s.value} active={statsVisible} />
          ))}
        </div>

        {/* Keyboard hint */}
        <p className="mt-8 text-xs text-text-mut">
          Press{' '}
          <kbd className="px-1.5 py-0.5 rounded border border-border bg-s2 text-text-sec font-mono text-xs">
            ⌘K
          </kbd>{' '}
          to search anywhere
        </p>
      </div>
    </section>
  );
}
