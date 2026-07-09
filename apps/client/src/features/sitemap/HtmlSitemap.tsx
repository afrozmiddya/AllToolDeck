import React from "react";
import { Link } from "react-router-dom";
import { toolsRegistry } from "@/data/toolsRegistry";
import { categoriesRegistry } from "@/data/categoriesRegistry";
import { blogPosts } from "@/data/blogData";
import { SEO } from "@/components/common/SEO";
import { Network, FolderClosed, Wrench, FileText, ChevronRight } from "lucide-react";

export const HtmlSitemap: React.FC = () => {
  const categories = Object.values(categoriesRegistry);
  const tools = Object.values(toolsRegistry);
  const blogs = Object.values(blogPosts);

  const title = "HTML Sitemap - AllToolDeck | Directory of Free Online Tools";
  const description = "Browse our comprehensive directory of free online productivity tools. Easily navigate to PDF, Image, Text, and Security utility pages.";
  const canonicalUrl = "https://alltooldeck.netlify.app/sitemap";

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-12">
      <SEO 
        title={title} 
        description={description} 
        canonicalUrl={canonicalUrl}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium" aria-current="page">Sitemap</span>
      </nav>

      {/* Header */}
      <header className="pb-6 border-b border-border/40">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-text flex items-center gap-3">
          <Network className="w-8 h-8 text-primary animate-pulse" />
          AllToolDeck Sitemap
        </h1>
        <p className="mt-3 text-base text-muted max-w-2xl">
          Visual index directory of AllToolDeck pages, landing categories, browser utility tools, and articles.
        </p>
      </header>

      {/* Categories & Mapped Tools directory */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((cat) => {
          // Find tools that belong to this category or match its tag keywords
          const catTools = tools.filter(tool => {
            const matchesCategory = tool.category.toLowerCase() === cat.slug.toLowerCase();
            const matchesTag = cat.toolTags.some(tag => 
              tool.name.toLowerCase().includes(tag.toLowerCase()) || 
              tool.path.toLowerCase().includes(tag.toLowerCase())
            );
            return matchesCategory || matchesTag;
          });

          return (
            <section key={cat.slug} className="p-6 border border-border/30 rounded-3xl bg-surface/20 space-y-4">
              <h2 className="text-lg font-bold font-heading text-text flex items-center gap-2 pb-2 border-b border-border/10">
                <FolderClosed className="w-5 h-5 text-primary" />
                <Link to={`/${cat.slug}`} className="hover:text-primary transition-colors">{cat.name}</Link>
              </h2>
              <ul className="space-y-2 text-sm font-mono text-muted pl-1">
                {catTools.map((tool) => (
                  <li key={tool.path}>
                    <Link to={tool.path} className="hover:text-text transition-colors flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-success" />
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* Blogs & Static routes directory */}
        <section className="p-6 border border-border/30 rounded-3xl bg-surface/20 space-y-4 md:col-span-2">
          <h2 className="text-lg font-bold font-heading text-text flex items-center gap-2 pb-2 border-b border-border/10">
            <FileText className="w-5 h-5 text-accent" />
            Articles & Core Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase text-muted tracking-wider">Utility Blogs</h3>
              <ul className="space-y-2 text-sm font-mono text-muted">
                {blogs.map((post) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="hover:text-text transition-colors flex items-center gap-1.5">
                      <ChevronRight className="w-3.5 h-3.5 text-muted" />
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase text-muted tracking-wider">Legal & Core</h3>
              <ul className="space-y-2 text-sm font-mono text-muted">
                <li>
                  <Link to="/" className="hover:text-text transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-muted" />
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-text transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-muted" />
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-text transition-colors flex items-center gap-1.5">
                    <ChevronRight className="w-3.5 h-3.5 text-muted" />
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default HtmlSitemap;
