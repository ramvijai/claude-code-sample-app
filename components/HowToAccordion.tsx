'use client';

import { useState } from 'react';
import { HowTo } from '@/lib/tools';

export default function HowToAccordion({ howtos }: { howtos: HowTo[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {howtos.map((h, i) => (
        <div key={i} className="rounded-xl border border-border bg-surface overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 group"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-sm font-medium text-text group-hover:text-purple transition-colors">
              {h.title}
            </span>
            <svg
              className={`w-4 h-4 text-text-mut flex-shrink-0 transition-transform duration-200 ${
                open === i ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open === i && (
            <div className="px-5 pb-5 border-t border-border">
              <div className="pt-4 text-sm text-text-sec leading-relaxed howto-body">
                {formatContent(h.content)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function formatContent(text: string) {
  const parts = text.split(/`([^`]+)`/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i}>{part}</code>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}
