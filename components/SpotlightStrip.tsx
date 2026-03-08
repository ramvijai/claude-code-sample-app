'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { Tool } from '@/lib/tools';

export default function SpotlightStrip({ tools }: { tools: Tool[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    function onMouseDown(e: MouseEvent) {
      isDragging.current = true;
      startX.current = e.pageX - el!.offsetLeft;
      scrollLeft.current = el!.scrollLeft;
      el!.classList.add('dragging');
    }

    function onMouseUp() {
      isDragging.current = false;
      el!.classList.remove('dragging');
    }

    function onMouseMove(e: MouseEvent) {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - el!.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      el!.scrollLeft = scrollLeft.current - walk;
    }

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      ref={stripRef}
      className="flex gap-4 overflow-x-auto no-scrollbar pb-2 drag-scroll -mx-1 px-1"
    >
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={`/tools/${tool.id}`}
          draggable={false}
          className="group flex-shrink-0 w-60 rounded-xl border border-border bg-surface hover:bg-s2 hover:border-border-h p-5 transition-all duration-200 overflow-hidden relative"
        >
          {/* Colored top strip */}
          <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: tool.iconBg }} />

          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold text-white mb-4 group-hover:scale-105 transition-transform duration-200"
            style={{ background: tool.iconBg }}
          >
            {tool.icon}
          </div>

          {/* Name + company */}
          <h4 className="text-sm font-semibold text-text group-hover:text-purple transition-colors leading-snug">
            {tool.name}
          </h4>
          <p className="text-xs text-text-mut mt-0.5 mb-2">{tool.company}</p>

          {/* Description */}
          <p className="text-xs text-text-sec leading-relaxed line-clamp-2">{tool.description}</p>

          {/* Arrow */}
          <div className="mt-4 flex items-center gap-1 text-xs text-text-mut group-hover:text-purple transition-colors">
            <span>Learn more</span>
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
