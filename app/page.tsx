import { getFeaturedTools } from '@/lib/tools';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SpotlightStrip from '@/components/SpotlightStrip';
import ToolsSection from '@/components/ToolsSection';
import Footer from '@/components/Footer';

export default function Home() {
  const featured = getFeaturedTools();

  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Featured spotlight */}
        <section
          id="spotlight"
          className="py-14 border-t border-border/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-text">Featured Tools</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-purple/15 text-purple font-medium border border-purple/20">
                Editor's picks
              </span>
              <span className="text-xs text-text-mut ml-auto hidden sm:block">
                ← drag to explore →
              </span>
            </div>
            <SpotlightStrip tools={featured} />
          </div>
        </section>

        <ToolsSection />
      </main>
      <Footer />
    </>
  );
}
