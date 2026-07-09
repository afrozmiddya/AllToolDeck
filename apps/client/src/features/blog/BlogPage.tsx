import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogData";
import { SEO } from "@/components/common/SEO";
import { BookOpen, Calendar, User, Clock, ChevronRight, ArrowRight } from "lucide-react";

export const BlogPage: React.FC = () => {
  const posts = Object.values(blogPosts);
  const title = "AllToolDeck Blog - Browser Privacy, Security, & Tools Guides";
  const description = "Read expert articles and guides explaining data privacy, local WebAssembly performance, secure document handling, and browser-based utility tools.";
  const canonicalUrl = "https://alltooldeck.netlify.app/blog";

  const schemas = [
    {
      "@type": "WebSite",
      "name": "AllToolDeck",
      "url": "https://alltooldeck.netlify.app/"
    },
    {
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
          "name": "Blog",
          "item": canonicalUrl
        }
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 space-y-10">
      <SEO 
        title={title} 
        description={description} 
        canonicalUrl={canonicalUrl} 
        schemas={schemas} 
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium" aria-current="page">Blog</span>
      </nav>

      {/* Hero Header */}
      <header className="pb-6 border-b border-border/40">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-text flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary" />
          The Privacy & Utilities Blog
        </h1>
        <p className="mt-3 text-base text-muted max-w-2xl">
          Guides, explainers, and technical reviews on keeping your private documents safe using client-side WebAssembly tools.
        </p>
      </header>

      {/* Blog Cards Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col group bg-surface/20 border border-border/30 rounded-3xl p-6 hover:border-primary/40 transition-all duration-300 hover:scale-[1.01] shadow-lg">
            <div className="flex gap-4 items-center text-xs text-muted mb-4 font-mono">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary uppercase font-bold tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
            </div>
            
            <h2 className="text-xl font-bold font-heading text-text group-hover:text-primary transition-colors mb-3 leading-snug">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            
            <p className="text-sm text-muted line-clamp-3 leading-relaxed mb-6">
              {post.metaDescription}
            </p>

            <div className="mt-auto pt-4 border-t border-border/10 flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-muted">
                <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</div>
                <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
              </div>
              <Link to={`/blog/${post.slug}`} className="flex items-center gap-1 text-primary text-xs font-semibold">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};
export default BlogPage;
