import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { toolsRegistry } from "@/data/toolsRegistry";
import { SEO } from "@/components/common/SEO";
import { 
  Search, FileText, Image as ImageIcon, Type, 
  Zap, ShieldCheck, Cpu, HardDrive, Plus,
  ChevronRight, ArrowRight, HelpCircle, Star, Layers
} from "lucide-react";
import { Section, Grid } from "@/components/common/PageLayout";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allTools = useMemo(() => Object.values(toolsRegistry), []);

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allTools.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    ).slice(0, 5);
  }, [allTools, searchQuery]);

  // Mapped landing page FAQs
  const landingFaqs = [
    {
      question: "Are my files uploaded to AllToolDeck's servers?",
      answer: "No. All processing happens entirely client-side using JavaScript, WebAssembly, and WebGL inside your web browser. Your private documents are never sent over the network, ensuring complete confidentiality."
    },
    {
      question: "Is AllToolDeck free to use?",
      answer: "Yes, AllToolDeck is 100% free with no monthly subscription fees, caps on document sizes, or feature gates."
    },
    {
      question: "Can I use AllToolDeck offline?",
      answer: "Yes, our tools are fully offline-capable since all utility scripts run client-side. You can install AllToolDeck as a PWA (Progressive Web App) to launch it offline anytime."
    }
  ];

  // Schema definitions
  const canonicalUrl = "https://alltooldeck.netlify.app/";
  const schemas = [
    {
      "@type": "WebSite",
      "name": "AllToolDeck",
      "url": canonicalUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${canonicalUrl}?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "AllToolDeck",
      "url": canonicalUrl,
      "logo": "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png"
    },
    {
      "@type": "FAQPage",
      "mainEntity": landingFaqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }
  ];

  return (
    <div className="w-full relative">
      <SEO 
        title="AllToolDeck - Free Browser-Based Productivity Tools"
        description="Access free browser-based productivity tools. Secure, lightning fast utilities for PDF merging, image compression, JSON formatting, password generation, and AI background removal."
        canonicalUrl={canonicalUrl}
        schemas={schemas}
      />

      {/* Hero Content */}
      <Section className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center pb-16 md:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs md:text-sm text-muted mb-8"
        >
          <span className="flex w-2 h-2 rounded-full bg-success animate-pulse" />
          Offline PWA support enabled
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          The Ultimate <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Productivity Suite
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-muted max-w-2xl mb-10 leading-relaxed"
        >
          Fast, secure, and privacy-focused utilities for developers and creators. Process PDFs, images, and text entirely in your browser.
        </motion.p>
        
        {/* Dynamic Full Site Tool Search index */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-lg relative group mb-12"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="homepage-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/40 bg-surface/50 py-3.5 pl-12 pr-6 text-base placeholder:text-muted focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all shadow-lg shadow-black/10"
            placeholder="Search all 30+ tools (e.g. merge pdf, format json)..."
          />

          {/* Search Dropdown Panel */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 text-left max-h-[350px] overflow-y-auto">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => (
                  <Link 
                    key={idx} 
                    to={tool.path}
                    className="flex flex-col p-4 hover:bg-background transition-colors border-b border-border/40"
                  >
                    <span className="font-semibold text-text text-sm flex items-center gap-2">
                      {tool.name}
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                        {tool.category}
                      </span>
                    </span>
                    <span className="text-xs text-muted mt-1 truncate">{tool.description}</span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-sm text-muted">No matching tools found.</div>
              )}
            </div>
          )}
        </motion.div>

        {/* Feature quick flags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12 text-muted text-xs md:text-sm font-mono"
        >
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Lightning Fast</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> 100% Client-Side</div>
          <div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-accent" /> GPU AI Processing</div>
        </motion.div>
      </Section>

      {/* Mapped Categories Grid */}
      <Section className="w-full max-w-6xl mx-auto border-t border-border/20 pt-16">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-center text-text flex items-center justify-center gap-2 mb-8">
          <Layers className="w-5 h-5 text-primary" />
          Explore Tool Categories
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid cols={4}>
            <motion.div variants={itemVariants} className="h-full">
              <Link to="/pdf" className="group flex flex-col h-full p-6 border border-border/30 rounded-2xl bg-surface/20 hover:border-primary/50 transition-all hover:scale-[1.02] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-background border border-border text-primary flex items-center justify-center mb-4 group-hover:scale-115 transition-transform"><FileText className="w-5 h-5" /></div>
                <h3 className="font-heading font-bold text-text mb-2 text-lg group-hover:text-primary transition-colors">PDF Tools</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">Merge, split, compress, protect, and convert PDF documents locally.</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Link to="/image" className="group flex flex-col h-full p-6 border border-border/30 rounded-2xl bg-surface/20 hover:border-success/50 transition-all hover:scale-[1.02] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-background border border-border text-success flex items-center justify-center mb-4 group-hover:scale-115 transition-transform"><ImageIcon className="w-5 h-5" /></div>
                <h3 className="font-heading font-bold text-text mb-2 text-lg group-hover:text-success transition-colors">Image Tools</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">Resize, compress, convert formats, and remove image backgrounds.</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Link to="/text" className="group flex flex-col h-full p-6 border border-border/30 rounded-2xl bg-surface/20 hover:border-accent/50 transition-all hover:scale-[1.02] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-background border border-border text-accent flex items-center justify-center mb-4 group-hover:scale-115 transition-transform"><Type className="w-5 h-5" /></div>
                <h3 className="font-heading font-bold text-text mb-2 text-lg group-hover:text-accent transition-colors">Text Tools</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">Count words, check differences, format JSON, and clean lists.</p>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="h-full">
              <Link to="/developer" className="group flex flex-col h-full p-6 border border-border/30 rounded-2xl bg-surface/20 hover:border-warning/50 transition-all hover:scale-[1.02] shadow-md">
                <div className="w-10 h-10 rounded-xl bg-background border border-border text-warning flex items-center justify-center mb-4 group-hover:scale-115 transition-transform"><Cpu className="w-5 h-5" /></div>
                <h3 className="font-heading font-bold text-text mb-2 text-lg group-hover:text-warning transition-colors">Developer Tools</h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">Base64 encoding, JWT parsing, and SHA-256 hash checksums.</p>
              </Link>
            </motion.div>
          </Grid>
        </motion.div>

        {/* Secondary Category tags */}
        <div className="flex flex-wrap justify-center gap-3 pt-8">
          <Link to="/ai" className="px-4 py-1.5 border border-border/30 rounded-full text-xs font-mono text-muted hover:border-primary hover:text-text transition-all bg-surface/10">AI Tools</Link>
          <Link to="/qr-barcode" className="px-4 py-1.5 border border-border/30 rounded-full text-xs font-mono text-muted hover:border-primary hover:text-text transition-all bg-surface/10">QR & Barcode Tools</Link>
          <Link to="/calculators" className="px-4 py-1.5 border border-border/30 rounded-full text-xs font-mono text-muted hover:border-primary hover:text-text transition-all bg-surface/10">Calculators</Link>
        </div>
      </Section>

      {/* Popular and Recently Added Tools */}
      <Section className="w-full max-w-6xl mx-auto border-t border-border/20 pt-16">
        <Grid cols={2} className="gap-12">
          {/* Popular tools */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-heading text-text flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Popular Tools
            </h2>
            <div className="space-y-4">
              <Link to="/pdf/merge" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-primary/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-primary transition-colors">Merge PDF Documents</h3>
                  <p className="text-xs text-muted mt-0.5">Combine multi-page worksheets client-side.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/image/background-remover" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-success/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-success transition-colors">AI Background Remover</h3>
                  <p className="text-xs text-muted mt-0.5">Erase photo backgrounds with local ONNX model.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/text/word-counter" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-accent/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-accent transition-colors">Word & Character Counter</h3>
                  <p className="text-xs text-muted mt-0.5">Compute character lists and reading times.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Recently Added */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-heading text-text flex items-center gap-2">
              <Plus className="w-5 h-5 text-accent" />
              Recently Added Tools
            </h2>
            <div className="space-y-4">
              <Link to="/security/jwt" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-warning/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-warning transition-colors">JWT Claims Decoder</h3>
                  <p className="text-xs text-muted mt-0.5">Deconstruct JSON Web Tokens locally securely.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/pdf/to-word" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-primary/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-primary transition-colors">PDF to Word Converter</h3>
                  <p className="text-xs text-muted mt-0.5">Extract printable text logs into DOCX outlines.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link to="/security/qr-scanner" className="flex items-center justify-between p-4 border border-border/20 rounded-xl bg-surface/10 hover:border-accent/40 hover:bg-surface/20 transition-all group">
                <div>
                  <h3 className="font-bold text-text text-sm group-hover:text-accent transition-colors">QR Code Scanner</h3>
                  <p className="text-xs text-muted mt-0.5">Analyze and scan QR pixel tags locally.</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Grid>
      </Section>

      {/* Why Choose AllToolDeck Section */}
      <Section className="w-full max-w-6xl mx-auto border-t border-border/20 pt-16">
        <div className="border border-border/30 rounded-3xl p-8 md:p-12 bg-surface/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-text leading-tight">
              Why Choose AllToolDeck?
            </h2>
            <p className="text-sm md:text-base text-muted leading-relaxed">
              Most online utilities require you to upload your files to remote cloud servers. This exposes your personal documents to databases, server logs, and security vulnerabilities. AllToolDeck operates completely in your web browser tab.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2 text-text/90"><ShieldCheck className="w-4.5 h-4.5 text-success" /> Zero Uploads</div>
              <div className="flex items-center gap-2 text-text/90"><Zap className="w-4.5 h-4.5 text-primary" /> Instant Builds</div>
              <div className="flex items-center gap-2 text-text/90"><Cpu className="w-4.5 h-4.5 text-accent" /> No Limits</div>
              <div className="flex items-center gap-2 text-text/90"><HardDrive className="w-4.5 h-4.5 text-warning" /> Offline PWA</div>
            </div>
          </div>

          {/* Statistics section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface/20 border border-border/20 text-center space-y-2">
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">30+</p>
              <p className="text-xs font-mono tracking-wider uppercase text-muted">Secure Tools</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface/20 border border-border/20 text-center space-y-2">
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">100%</p>
              <p className="text-xs font-mono tracking-wider uppercase text-muted">Client-Side</p>
            </div>
            <div className="p-6 rounded-2xl bg-surface/20 border border-border/20 text-center space-y-2 col-span-2">
              <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">0 KB</p>
              <p className="text-xs font-mono tracking-wider uppercase text-muted">Files Data Transmitted</p>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Accordion Section */}
      <Section className="w-full max-w-4xl mx-auto border-t border-border/20 pt-16">
        <h2 className="text-xl md:text-2xl font-bold font-heading text-center text-text flex items-center justify-center gap-2 mb-8">
          <HelpCircle className="w-5 h-5 text-accent" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {landingFaqs.map((faq, idx) => (
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
      </Section>
    </div>
  );
};
export default HomePage;
