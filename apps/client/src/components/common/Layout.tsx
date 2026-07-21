import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "./SEO";
import { toolsRegistry } from "@/data/toolsRegistry";
import { SearchModal } from "./SearchModal";
import { Container } from "./PageLayout";

export const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isToolPage = !!toolsRegistry[location.pathname];
  const isBlogPage = location.pathname.startsWith("/blog");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut listener to Open/Close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-text">
      {!isToolPage && !isBlogPage && (
        <SEO 
          title={
            location.pathname === "/" 
              ? "AllToolDeck - Free Browser-Based Productivity Tools" 
              : location.pathname === "/privacy"
              ? "Privacy Policy - AllToolDeck"
              : location.pathname === "/terms"
              ? "Terms of Service - AllToolDeck"
              : location.pathname === "/sitemap"
              ? "HTML Sitemap - AllToolDeck"
              : "AllToolDeck - Productivity Suite"
          }
          description={
            location.pathname === "/"
              ? "Access free browser-based productivity tools. Secure, lightning fast utilities for PDF merging, image compression, JSON formatting, password generation, and more."
              : "Privacy policy and security compliance parameters for AllToolDeck client-side tools."
          }
          canonicalUrl={`https://alltooldeck.netlify.app${location.pathname}`}
          schemas={[
            {
              "@type": "Organization",
              "name": "AllToolDeck",
              "url": "https://alltooldeck.netlify.app/",
              "logo": "https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png"
            }
          ]}
        />
      )}
      
      {/* Ambient Glowing Background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute -top-[20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/20 opacity-20 blur-[100px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-surface/60 backdrop-blur-xl shadow-md shadow-black/10"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container size="7xl" className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center group cursor-pointer z-10 -ml-2 p-2">
            <img 
              src="https://res.cloudinary.com/dz0xmodpo/image/upload/v1783541482/logo_kprqro.png" 
              alt="AllToolDeck Logo" 
              className="h-24 w-auto object-contain transition-opacity group-hover:opacity-80" 
            />
          </Link>

          {/* Rebuilt Search Trigger Button */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex flex-grow max-w-md items-center cursor-pointer z-10"
          >
            <div className="w-full flex items-center rounded-xl border border-border bg-surface/50 py-2 px-4 text-sm text-muted hover:border-primary/50 hover:bg-surface transition-all select-none">
              <Search className="h-4 w-4 mr-2 text-muted flex-shrink-0" />
              <span className="truncate whitespace-nowrap">Search tools (e.g. merge pdf, resize)...</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border/30 bg-surface-light px-1.5 font-mono text-[10px] font-medium text-muted opacity-100 flex-shrink-0">
                <span>Ctrl</span>K
              </kbd>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium z-10">
            <Link to="/pdf" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">PDF</Link>
            <Link to="/image" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Image</Link>
            <Link to="/text" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Text</Link>
            <Link to="/security" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Security</Link>
            <Link to="/blog" className="transition-colors hover:text-primary text-muted cursor-pointer">Blog</Link>
          </nav>
        </Container>
      </header>

      {/* Global Search Modal overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 py-8 md:py-12">
        <Container size="7xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Container>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-auto">
        <Container size="7xl" className="flex flex-col items-center justify-between gap-4 py-8 md:h-16 md:flex-row md:py-0 text-sm text-muted">
          <p>© {new Date().getFullYear()} AllToolDeck. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/sitemap" className="hover:text-text transition-colors">Sitemap</Link>
            <Link to="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-text transition-colors">Terms of Service</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
};
export default Layout;
