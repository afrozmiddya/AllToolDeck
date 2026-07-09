import React from "react";
import { useLocation, Link } from "react-router-dom";
import { toolsRegistry } from "@/data/toolsRegistry";
import { SEO } from "./SEO";
import { 
  FileText, Image as ImageIcon, Type, Lock, 
  ChevronRight, ArrowRight, BookOpen, HelpCircle, Link2
} from "lucide-react";

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

  // Get 3 related tools (same category, excluding current tool)
  const relatedTools = Object.values(toolsRegistry)
    .filter(t => t.category === tool.category && t.path !== tool.path)
    .slice(0, 3);

  // Fallback related tools from other categories if less than 3
  if (relatedTools.length < 3) {
    const additional = Object.values(toolsRegistry)
      .filter(t => t.category !== tool.category)
      .slice(0, 3 - relatedTools.length);
    relatedTools.push(...additional);
  }

  // Define Schema.org Structured Data
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
    <div className="max-w-5xl mx-auto py-4 space-y-12">
      <SEO 
        title={tool.title} 
        description={tool.description} 
        canonicalUrl={canonical} 
        schemas={schemas}
      />

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/${tool.category.toLowerCase()}`} className="hover:text-primary transition-colors">{tool.category}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium truncate" aria-current="page">{tool.name}</span>
      </nav>

      {/* Hero Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/40">
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

      {/* Main Workspace (The Actual Tool Page) */}
      <main className="relative z-10 w-full bg-surface/20 border border-border/40 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
        {children}
      </main>

      {/* How to Use Section */}
      <section className="bg-surface/10 border border-border/30 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-primary" />
          How to Use {tool.name}
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

      {/* FAQ Section */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {tool.faqs.map((faq, idx) => (
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
            ))}
          </div>
        </section>
      )}

      {/* Related Tools Section */}
      <section className="space-y-6">
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
    </div>
  );
};
export default ToolLayout;
