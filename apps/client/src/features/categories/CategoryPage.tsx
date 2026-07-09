import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { categoriesRegistry } from "@/data/categoriesRegistry";
import { toolsRegistry } from "@/data/toolsRegistry";
import { SEO } from "@/components/common/SEO";
import { 
  Search, ChevronRight, ArrowRight, HelpCircle, 
  FolderClosed, Layers, ShieldCheck
} from "lucide-react";

interface CategoryPageProps {
  categoryKey: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categoryKey }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const category = categoriesRegistry[categoryKey];

  if (!category) {
    return (
      <div className="py-20 text-center text-xl text-zinc-500">
        Category not found.
      </div>
    );
  }

  // Query and filter tools that belong to this category (via category or tag keywords)
  const categoryTools = useMemo(() => {
    return Object.values(toolsRegistry).filter(tool => {
      const categoryMatch = tool.category.toLowerCase() === category.slug.toLowerCase();
      const tagMatch = category.toolTags.some(tag => 
        tool.name.toLowerCase().includes(tag.toLowerCase()) ||
        tool.path.toLowerCase().includes(tag.toLowerCase())
      );
      return categoryMatch || tagMatch;
    });
  }, [category]);

  // Filter tools by search input
  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categoryTools;
    return categoryTools.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query)
    );
  }, [categoryTools, searchQuery]);

  // Get other categories for internal cross-linking
  const otherCategories = useMemo(() => {
    return Object.values(categoriesRegistry).filter(cat => cat.slug !== categoryKey);
  }, [categoryKey]);

  // Dynamic schema definitions
  const canonicalUrl = `https://alltooldeck.netlify.app/${category.slug}`;
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
        "name": category.name,
        "item": canonicalUrl
      }
    ]
  };

  const itemListSchema = {
    "@type": "ItemList",
    "name": `${category.name} Mapped List`,
    "description": category.description,
    "itemListElement": categoryTools.map((t, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "WebApplication",
        "name": t.name,
        "url": `https://alltooldeck.netlify.app${t.path}`,
        "description": t.description,
        "applicationCategory": `${t.category}Application`,
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5."
      }
    }))
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": category.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  const schemas = [breadcrumbSchema, itemListSchema, faqSchema];

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-12">
      <SEO 
        title={category.title} 
        description={category.description} 
        canonicalUrl={canonicalUrl} 
        schemas={schemas}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium" aria-current="page">{category.name}</span>
      </nav>

      {/* Header */}
      <header className="pb-6 border-b border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-text flex items-center gap-3">
            <FolderClosed className="w-8 h-8 text-primary animate-pulse" />
            {category.name}
          </h1>
          <p className="mt-3 text-base text-muted leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Live Searchable Tool Index */}
        <div className="w-full md:max-w-xs relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted group-focus-within:text-primary transition-colors">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/40 bg-surface/30 py-2.5 pl-10 pr-4 text-sm placeholder:text-muted focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
            placeholder={`Search ${category.name}...`}
          />
        </div>
      </header>

      {/* Tools Grid */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold font-heading text-text flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Available Tools ({filteredTools.length})
        </h2>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <Link 
                key={idx} 
                to={tool.path}
                className="group flex flex-col p-6 border border-border/30 rounded-2xl bg-surface/20 hover:border-primary/50 hover:bg-surface/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="font-heading font-bold text-text group-hover:text-primary transition-colors text-lg mb-2">{tool.name}</h3>
                <p className="text-sm text-muted leading-relaxed line-clamp-2">{tool.description}</p>
                <div className="mt-6 flex items-center text-primary text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Open Tool <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-muted border border-border/20 rounded-2xl bg-surface/10">
            No tools matching your search query. Try typing another name.
          </div>
        )}
      </section>

      {/* 600 - 1000 Words SEO Rich-Text Section */}
      <section className="bg-surface/10 border border-border/30 rounded-3xl p-6 md:p-10 space-y-8">
        {category.content.map((sec, idx) => (
          <article key={idx} className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-success" />
              {sec.heading}
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed font-sans">
              {sec.text}
            </p>
          </article>
        ))}
      </section>

      {/* Category FAQs Accordion */}
      {category.faqs && category.faqs.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" />
            Category Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {category.faqs.map((faq, idx) => (
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

      {/* Internal Category Linking */}
      <footer className="pt-8 border-t border-border/20 space-y-4">
        <h2 className="text-sm font-bold tracking-wider uppercase text-muted font-mono">Explore Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {otherCategories.map((cat, idx) => (
            <Link 
              key={idx} 
              to={`/${cat.slug}`}
              className="px-4 py-2 border border-border/30 rounded-full text-xs font-mono text-muted bg-surface/10 hover:border-primary hover:text-text transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
};
export default CategoryPage;
