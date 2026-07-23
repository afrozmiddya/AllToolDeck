import React from "react";
import { useLocation, Link } from "react-router-dom";
import { toolsRegistry } from "@/data/toolsRegistry";
import { SEO } from "./SEO";
import { 
  FileText, Image as ImageIcon, Type, Lock, 
  ChevronRight, ArrowRight, BookOpen, HelpCircle, Link2,
  Settings, ShieldAlert, Award
} from "lucide-react";

import { Container } from "./PageLayout";

interface ToolLayoutProps {
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const tool = toolsRegistry[currentPath];

  if (!tool) {
    return <>{children}</>;
  }

  // Get Lucide Icon for Category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PDF":
        return <FileText className="w-8 h-8 text-primary" />;
      case "Image":
        return <ImageIcon className="w-8 h-8 text-success" />;
      case "Text":
        return <Type className="w-8 h-8 text-accent" />;
      case "Security":
        return <Lock className="w-8 h-8 text-warning" />;
      default:
        return <HelpCircle className="w-8 h-8 text-muted" />;
    }
  };

  // Mapped related tools navigation
  const relatedTools = Object.values(toolsRegistry)
    .filter(t => t.category === tool.category && t.path !== tool.path)
    .slice(0, 3);

  if (relatedTools.length < 3) {
    const additional = Object.values(toolsRegistry)
      .filter(t => t.category !== tool.category)
      .slice(0, 3 - relatedTools.length);
    relatedTools.push(...additional);
  }

  const canonical = `https://alltooldeck.netlify.app${tool.path}`;
  const websiteSchema = {
    "@type": "WebSite",
    "name": "AllToolDeck",
    "url": "https://alltooldeck.netlify.app/"
  };

  const webAppSchema = {
    "@type": "WebApplication",
    "name": tool.name,
    "url": canonical,
    "applicationCategory": `${tool.category}Application`,
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://alltooldeck.netlify.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tool.category,
        "item": `https://alltooldeck.netlify.app/${tool.category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": canonical
      }
    ]
  };

  const schemas: any[] = [websiteSchema, webAppSchema, breadcrumbSchema];

  if (tool.faqs && tool.faqs.length > 0) {
    schemas.push({
      "@type": "FAQPage",
      "mainEntity": tool.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  return (
    <Container size="5xl" className="py-4 space-y-10">
      <SEO 
        title={tool.title} 
        description={tool.description} 
        canonicalUrl={canonical} 
        schemas={schemas}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/${tool.category.toLowerCase()}`} className="hover:text-primary transition-colors">{tool.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium truncate" aria-current="page">{tool.name}</span>
      </nav>

      {/* Title Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/40">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold tracking-tight text-text flex items-center gap-3">
            {getCategoryIcon(tool.category)}
            {tool.name}
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted max-w-2xl">
            {tool.description}
          </p>
        </div>
      </header>

      {/* Dynamic Content Body (All stacked for SEO) */}
      <main className="w-full mt-6 space-y-12">
        
        {/* Tool Workspace */}
        <div className="w-full [&>div]:max-w-none [&>div]:py-0 [&>div]:mx-0">
          {children}
        </div>

        {/* How-To Guide */}
        <section className="bg-surface/10 border border-border/30 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Step-by-Step Guide: How to Use {tool.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tool.howToUse.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-surface/30 border border-border/20">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-text/80 self-center leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

        {/* Features */}
        <section className="bg-surface/10 border border-border/30 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
              <Settings className="w-5 h-5 text-success" />
              Key Features of {tool.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 border border-border/20 rounded-xl bg-surface/20 space-y-2">
                <h3 className="font-bold text-sm text-text">100% Client-Side Processing</h3>
                <p className="text-xs text-muted leading-relaxed">Unlike traditional websites, your documents and inputs never travel to remote servers. All calculations and compiles execute in browser tab memory.</p>
              </div>
              <div className="p-5 border border-border/20 rounded-xl bg-surface/20 space-y-2">
                <h3 className="font-bold text-sm text-text">Vibrant Speeds (WebAssembly)</h3>
                <p className="text-xs text-muted leading-relaxed">By running optimized compilation layers directly in the browser, file loads, rotations, and compression happen almost instantly.</p>
              </div>
              <div className="p-5 border border-border/20 rounded-xl bg-surface/20 space-y-2">
                <h3 className="font-bold text-sm text-text">Infinite Size Limitations</h3>
                <p className="text-xs text-muted leading-relaxed">Since there are no network upload buffers, file sizes are only capped by your local device memory capacity.</p>
              </div>
              <div className="p-5 border border-border/20 rounded-xl bg-surface/20 space-y-2">
                <h3 className="font-bold text-sm text-text">Completely Free & Watermark-Free</h3>
                <p className="text-xs text-muted leading-relaxed">Generate outputs without paywalls, email subscription forms, or branding markers embedded in your documents.</p>
              </div>
            </div>
          </section>

        {/* Comparison */}
        <section className="bg-surface/10 border border-border/30 rounded-2xl p-6 md:p-8 space-y-6 overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-warning" />
              Comparison: Client-Side vs. Cloud Upload Platforms
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-muted">
                <thead className="text-xs uppercase bg-surface/30 text-text border-b border-border/20">
                  <tr>
                    <th scope="col" className="px-6 py-3">Feature Parameter</th>
                    <th scope="col" className="px-6 py-3 text-primary">AllToolDeck (Browser)</th>
                    <th scope="col" className="px-6 py-3">Standard Competitors (Cloud)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  <tr className="hover:bg-surface/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text">Data Privacy</td>
                    <td className="px-6 py-4 text-primary font-medium">Files remain locally on your machine.</td>
                    <td className="px-6 py-4">Files sent to external remote servers.</td>
                  </tr>
                  <tr className="hover:bg-surface/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text">Processing Delay</td>
                    <td className="px-6 py-4 text-primary font-medium">Instant native speeds. No network wait.</td>
                    <td className="px-6 py-4">Requires upload/download queue latency.</td>
                  </tr>
                  <tr className="hover:bg-surface/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text">Limits</td>
                    <td className="px-6 py-4 text-primary font-medium">No conversion caps or page limits.</td>
                    <td className="px-6 py-4">Requires payment tiers for files &gt; 10MB.</td>
                  </tr>
                  <tr className="hover:bg-surface/10 transition-colors">
                    <td className="px-6 py-4 font-semibold text-text">Offline Capability</td>
                    <td className="px-6 py-4 text-primary font-medium">Yes, runs locally in offline PWA Mode.</td>
                    <td className="px-6 py-4">No. Requires stable connection to run.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        {/* Alternatives */}
        <section className="bg-surface/10 border border-border/30 rounded-2xl p-6 md:p-8 space-y-6">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Secure Alternatives Map
            </h2>
            <div className="space-y-4 text-sm text-muted">
              <p>Looking for alternatives to desktop software and cloud services? {tool.name} acts as a secure, fast replacement for: </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Acrobat / WinZip / Photoshop Alternatives:</strong> Replaces native installer systems, reducing local memory footprints and license costs.</li>
                <li><strong>Cloud Converter Alternatives (e.g. TinyWow, Smallpdf):</strong> Provides identical output results without exposing files to third-party databases.</li>
                <li><strong>Command Line Tools:</strong> Provides a clean graphical layout representation for command utilities without terminal syntax requirements.</li>
              </ul>
            </div>
          </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-primary" />
            Frequently Asked Questions
          </h2>
            {tool.faqs && tool.faqs.length > 0 ? (
              tool.faqs.map((faq, idx) => (
                <details key={idx} className="group border border-border/30 rounded-xl bg-surface/15 overflow-hidden transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-5 text-sm font-semibold text-text cursor-pointer select-none focus:outline-none focus:text-primary">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180">
                      <ChevronRight className="w-4 h-4 text-muted" />
                    </span>
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-border/10">
                    {faq.answer}
                  </div>
                </details>
              ))
            ) : (
              <div className="p-6 text-center text-muted">No FAQs defined for this tool yet.</div>
            )}
          </section>
      </main>

      {/* Related Tools */}
      <section className="space-y-6 pt-6 border-t border-border/20">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
          <Link2 className="w-5 h-5 text-success" />
          Related Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTools.map((t, idx) => (
            <Link 
              key={idx} 
              to={t.path} 
              className="group p-5 border border-border/30 rounded-2xl bg-surface/20 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <h3 className="font-semibold text-text group-hover:text-primary transition-colors text-base mb-2">{t.name}</h3>
              <p className="text-xs text-muted line-clamp-2 leading-relaxed">{t.description}</p>
              <div className="mt-4 flex items-center text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Open Tool <ArrowRight className="ml-1 w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
};
export default ToolLayout;
