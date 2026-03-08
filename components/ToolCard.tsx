import Link from 'next/link';
import { Tool } from '@/lib/tools';

interface Props {
  tool: Tool;
  style?: React.CSSProperties;
}

export default function ToolCard({ tool, style }: Props) {
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block rounded-xl border border-border bg-surface hover:bg-s2 hover:border-border-h transition-all duration-200 overflow-hidden reveal"
      style={style}
    >
      {/* Colored top accent */}
      <div className="h-0.5 w-full" style={{ background: tool.iconBg }} />

      <div className="p-5">
        {/* Icon + category badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: tool.iconBg }}
          >
            {tool.icon}
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full border border-border text-text-mut bg-s2/50 capitalize">
            {tool.category.replace(/-/g, ' ')}
          </span>
        </div>

        {/* Name + company */}
        <h3 className="font-semibold text-text group-hover:text-purple transition-colors text-sm leading-snug">
          {tool.name}
        </h3>
        <p className="text-xs text-text-mut mb-3 mt-0.5">{tool.company}</p>

        {/* Description */}
        <p className="text-xs text-text-sec leading-relaxed line-clamp-2">{tool.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-s3 text-text-mut">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-s2/30">
        <span className="text-xs text-text-mut group-hover:text-purple transition-colors font-medium">
          View details →
        </span>
        {tool.featured && (
          <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple/15 text-purple font-medium">
            Featured
          </span>
        )}
      </div>
    </Link>
  );
}
