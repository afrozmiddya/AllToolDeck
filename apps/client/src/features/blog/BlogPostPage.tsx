import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "@/data/blogData";
import { SEO } from "@/components/common/SEO";
import { 
  Calendar, User, Clock, ChevronRight, HelpCircle, 
  ArrowLeft, List
} from "lucide-react";

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="py-20 text-center text-xl text-zinc-500">
        <p className="mb-4">Article not found.</p>
        <Link to="/blog" className="inline-flex items-center text-primary gap-2 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const canonicalUrl = `https://alltooldeck.netlify.app/blog/${post.slug}`;

  // Structured schemas
  const blogPostingSchema = {
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "AllToolDeck"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AllToolDeck",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png"
      }
    },
    "datePublished": "2026-07-09",
    "mainEntityOfPage": canonicalUrl
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
        "name": "Blog",
        "item": "https://alltooldeck.netlify.app/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": canonicalUrl
      }
    ]
  };

  const schemas: any[] = [blogPostingSchema, breadcrumbSchema];

  if (post.faqs && post.faqs.length > 0) {
    schemas.push({
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(f => ({
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
    <div className="max-w-4xl mx-auto py-4 space-y-10">
      <SEO 
        title={`${post.title} | AllToolDeck Blog`} 
        description={post.metaDescription} 
        canonicalUrl={canonicalUrl} 
        type="article"
        schemas={schemas}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-mono text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text font-medium truncate" aria-current="page">{post.title}</span>
      </nav>

      {/* Back Button */}
      <Link to="/blog" className="inline-flex items-center gap-2 text-muted hover:text-primary text-xs font-mono transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Blog listing
      </Link>

      <article className="space-y-8">
        {/* Article Header */}
        <header className="space-y-4">
          <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs uppercase font-bold tracking-wider font-mono">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight text-text leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted pt-2 border-b border-border/20 pb-6 font-mono">
            <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</div>
          </div>
        </header>

        {/* Intro */}
        <p className="text-lg text-text/95 leading-relaxed font-medium italic p-4 border-l-4 border-primary bg-surface/10 rounded-r-xl">
          {post.intro}
        </p>

        {/* Dynamic Table of Contents */}
        <nav aria-label="Table of contents" className="p-6 border border-border/30 rounded-2xl bg-surface/20 max-w-md">
          <div className="flex items-center gap-2 mb-4 font-bold text-sm text-text font-heading">
            <List className="w-4 h-4 text-primary" />
            Table of Contents
          </div>
          <ul className="space-y-2 text-sm text-muted font-mono">
            {post.sections.map((sec) => (
              <li key={sec.id}>
                <a href={`#${sec.id}`} className="hover:text-primary transition-colors flex items-center gap-1">
                  <span className="text-primary font-bold">#</span> {sec.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Article Body */}
        <main className="space-y-10 leading-relaxed text-text/80 text-base md:text-lg">
          {post.sections.map((sec) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold font-heading text-text border-b border-border/10 pb-2">
                {sec.heading}
              </h2>
              <p className="text-sm md:text-base leading-relaxed">{sec.content}</p>
            </section>
          ))}
        </main>
      </article>

      {/* FAQ Section */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="space-y-6 pt-10 border-t border-border/20">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-text flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-accent" />
            Article Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {post.faqs.map((faq, idx) => (
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

      {/* Footer CTA */}
      <footer className="pt-8 border-t border-border/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-text text-lg">Need browser-based utility tools?</h3>
          <p className="text-sm text-muted mt-1">Explore our complete collection of fast, private tools.</p>
        </div>
        <Link to="/" className="inline-flex items-center justify-center h-10 px-6 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/95 transition-all">
          Explore All Tools
        </Link>
      </footer>
    </div>
  );
};
export default BlogPostPage;
