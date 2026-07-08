import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Search, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SEARCH_TOOLS = [
  { path: "/pdf/to-word", name: "PDF to Word", category: "PDF" },
  { path: "/pdf/from-word", name: "Word to PDF", category: "PDF" },
  { path: "/pdf/merge", name: "Merge PDF", category: "PDF" },
  { path: "/pdf/split", name: "Split PDF", category: "PDF" },
  { path: "/pdf/compress", name: "Compress PDF", category: "PDF" },
  { path: "/pdf/rotate", name: "Rotate PDF", category: "PDF" },
  { path: "/pdf/from-jpg", name: "JPG to PDF", category: "PDF" },
  { path: "/pdf/to-jpg", name: "PDF to JPG", category: "PDF" },
  { path: "/pdf/unlock", name: "Unlock PDF", category: "PDF" },
  { path: "/pdf/protect", name: "Protect PDF", category: "PDF" },
  { path: "/image/resize", name: "Resize Image", category: "Image" },
  { path: "/image/compress", name: "Compress Image", category: "Image" },
  { path: "/image/crop", name: "Crop Image", category: "Image" },
  { path: "/image/rotate", name: "Rotate Image", category: "Image" },
  { path: "/image/convert?from=jpg&to=png", name: "JPG to PNG", category: "Image" },
  { path: "/image/convert?from=png&to=jpg", name: "PNG to JPG", category: "Image" },
  { path: "/image/convert?from=webp&to=png", name: "WEBP to PNG", category: "Image" },
  { path: "/image/convert?from=png&to=webp", name: "PNG to WEBP", category: "Image" },
  { path: "/pdf/from-jpg", name: "Image to PDF", category: "Image" },
  { path: "/image/background-remover", name: "Background Remover", category: "Image" },
  { path: "/text", name: "Word Counter", category: "Text" },
  { path: "/text", name: "Character Counter", category: "Text" },
  { path: "/text/case", name: "Case Converter", category: "Text" },
  { path: "/text/spaces", name: "Remove Extra Spaces", category: "Text" },
  { path: "/text/duplicates", name: "Remove Duplicate Lines", category: "Text" },
  { path: "/text/reverse", name: "Reverse Text", category: "Text" },
  { path: "/text/sort", name: "Sort Lines", category: "Text" },
  { path: "/text/slug", name: "Slug Generator", category: "Text" },
  { path: "/text/lorem", name: "Lorem Ipsum Generator", category: "Text" },
  { path: "/text/diff", name: "Text Difference Checker", category: "Text" },
  { path: "/security", name: "Password Generator", category: "Security" },
  { path: "/security/password-strength", name: "Password Strength Checker", category: "Security" },
  { path: "/security/qrcode", name: "QR Code Generator", category: "Security" },
  { path: "/security/qrcode-scan", name: "QR Code Scanner", category: "Security" },
  { path: "/security/base64", name: "Base64 Encode/Decode", category: "Security" },
  { path: "/security/sha256", name: "SHA-256 Generator", category: "Security" },
  { path: "/security/md5", name: "MD5 Generator", category: "Security" },
  { path: "/security/jwt", name: "JWT Decoder", category: "Security" },
  { path: "/security/url", name: "URL Encoder/Decoder", category: "Security" }
];

export const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden text-text">
      {/* Ambient Glowing Background */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute -top-[20%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 opacity-30 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[10%] left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/20 opacity-20 blur-[100px] mix-blend-screen" />
      </div>

      {/* Header */}
      <header
        className={`sticky top-5 z-50 w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-border bg-surface/60 backdrop-blur-xl shadow-md shadow-black/10"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center group cursor-pointer z-10 -ml-2 p-2">
            <img src="/logo.png" alt="AllToolDeck Logo" className="h-10 md:h-30 w-auto object-contain drop-shadow-sm transition-opacity group-hover:opacity-80" />
          </Link>

          {/* Functional Search Bar */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md items-center">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted group-focus-within:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </div>
              <input
                id="global-search"
                type="text"
                autoComplete="new-password"
                aria-autocomplete="none"
                name="toolSearch"
                spellCheck="false"
                className="w-full rounded-full border border-border bg-surface/50 py-2 pl-10 pr-16 text-sm placeholder:text-muted focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all backdrop-blur-sm"
                placeholder="Search tools (e.g. merge pdf, resize image)..."
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  if (!val) {
                    document.getElementById('search-dropdown')?.classList.add('hidden');
                    return;
                  }
                  document.getElementById('search-dropdown')?.classList.remove('hidden');
                  
                  // Very basic client-side filtering logic for the dropdown
                  const links = document.querySelectorAll('.search-result-item');
                  let found = false;
                  links.forEach((link) => {
                    const text = (link.textContent || '').toLowerCase();
                    if (text.includes(val)) {
                      (link as HTMLElement).style.display = 'flex';
                      found = true;
                    } else {
                      (link as HTMLElement).style.display = 'none';
                    }
                  });
                  
                  const noRes = document.getElementById('search-no-results');
                  if (noRes) noRes.style.display = found ? 'none' : 'block';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.currentTarget.blur();
                    document.getElementById('search-dropdown')?.classList.add('hidden');
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button 
                  className="hidden sm:inline-flex h-7 px-4 items-center justify-center rounded-full bg-primary text-white text-xs font-medium transition-colors hover:bg-primary/90 shadow-sm"
                  onClick={() => document.getElementById('global-search')?.focus()}
                >
                  Search
                </button>
              </div>

              {/* Search Dropdown */}
              <div id="search-dropdown" className="absolute top-full left-0 right-0 mt-2 w-full bg-surface border border-border rounded-xl shadow-xl overflow-hidden hidden flex-col z-50 max-h-[400px] overflow-y-auto">
                <div id="search-no-results" className="p-4 text-sm text-muted text-center hidden">
                  No tools found.
                </div>
                {/* Search Results */}
                {SEARCH_TOOLS.map((tool, i) => (
                  <Link 
                    key={`${tool.path}-${i}`}
                    to={tool.path} 
                    className="search-result-item flex items-center gap-2 p-3 hover:bg-background transition-colors border-b border-border/50 text-sm"
                    onClick={() => {
                      const input = document.getElementById('global-search') as HTMLInputElement;
                      if (input) input.value = '';
                      document.getElementById('search-dropdown')?.classList.add('hidden');
                    }}
                  >
                    <span className="font-medium text-text">{tool.name}</span>
                    <span className="text-muted text-xs">{tool.category}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium z-10">
            <Link to="/pdf" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">PDF</Link>
            <Link to="/image" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Image</Link>
            <Link to="/text" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Text</Link>
            <Link to="/security" className="transition-colors hover:text-primary text-muted cursor-pointer hidden sm:block">Security</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto max-w-7xl px-4 lg:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-auto">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 md:h-16 md:flex-row md:py-0 px-4 lg:px-8 text-sm text-muted">
          <p>© {new Date().getFullYear()} AllToolDeck. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-text transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-text transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
