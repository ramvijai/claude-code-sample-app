import Link from 'next/link';
import { CATEGORIES } from '@/lib/tools';

export default function Footer() {
  const cats = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <footer className="border-t border-border bg-surface/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple to-blue flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              <span className="font-bold text-text group-hover:text-purple transition-colors">GenAI Hub</span>
            </Link>
            <p className="text-sm text-text-sec leading-relaxed">
              The complete knowledge base for Generative AI tools. Quickstarts, how-tos, and links for every major AI platform.
            </p>
            <p className="text-xs text-text-mut mt-4">
              Built entirely with{' '}
              <span className="text-purple font-medium">Claude Code</span> + VS Code
            </p>
          </div>

          {/* Categories col 1 */}
          <div>
            <h4 className="text-xs font-semibold text-text-mut uppercase tracking-wider mb-4">
              Tool Categories
            </h4>
            <ul className="space-y-2.5">
              {cats.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="/#categories"
                    className="flex items-center gap-2 text-sm text-text-sec hover:text-text transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-text-mut uppercase tracking-wider mb-4">
              More Categories
            </h4>
            <ul className="space-y-2.5">
              {cats.slice(4).map((cat) => (
                <li key={cat.id}>
                  <a
                    href="/#categories"
                    className="flex items-center gap-2 text-sm text-text-sec hover:text-text transition-colors"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-text-mut uppercase tracking-wider mb-4">
              Built With
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Claude Code', href: 'https://claude.ai/code' },
                { label: 'Next.js 15', href: 'https://nextjs.org' },
                { label: 'Tailwind CSS', href: 'https://tailwindcss.com' },
                { label: 'Vercel', href: 'https://vercel.com' },
                { label: 'VS Code', href: 'https://code.visualstudio.com' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-sec hover:text-text transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-mut">
            © 2025 GenAI Hub · Open source · MIT License
          </p>
          <p className="text-xs text-text-mut">
            Powered by{' '}
            <span className="text-purple font-medium">Claude Sonnet 4.6</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
