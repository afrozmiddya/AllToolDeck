import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toolsRegistry } from "@/data/toolsRegistry";
import { trackSearch } from "@/utils/analytics";
import { Search, CornerDownLeft, Sparkles, Clock, X } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load Search History from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("alltooldeck-search-history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Keyboard shortcut listener to Open/Close modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const allTools = useMemo(() => Object.values(toolsRegistry), []);

  // Popular searches data
  const popularKeywords = ["merge pdf", "convert image", "format json", "sha256 hash"];

  // Filter tools by Query & Active Category Tab
  const filteredTools = useMemo(() => {
    const term = query.toLowerCase().trim();
    let tools = allTools;

    if (activeCategory !== "All") {
      tools = tools.filter(t => t.category.toLowerCase() === activeCategory.toLowerCase());
    }

    if (term) {
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(term) || 
        t.description.toLowerCase().includes(term)
      );
    }

    return tools;
  }, [allTools, query, activeCategory]);

  // Track search queries for analytics
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim()) {
        trackSearch(query, filteredTools.length);
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [query, filteredTools.length]);

  // Keyboard controls within the open modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          handleSelectTool(filteredTools[selectedIndex].path);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex]);

  const handleSelectTool = (path: string) => {
    // Add to history
    const matchedTool = allTools.find(t => t.path === path);
    if (matchedTool) {
      const updatedHistory = [matchedTool.name, ...history.filter(h => h !== matchedTool.name)].slice(0, 3);
      setHistory(updatedHistory);
      localStorage.setItem("alltooldeck-search-history", JSON.stringify(updatedHistory));
    }
    onClose();
    setQuery("");
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg bg-surface border border-border/40 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Input Header */}
        <div className="flex items-center border-b border-border/40 px-4 py-3.5 gap-3">
          <Search className="w-5 h-5 text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type to search tools..."
            className="flex-1 bg-transparent border-0 outline-none text-text placeholder:text-muted text-base"
          />
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-light text-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 px-4 py-2 border-b border-border/20 overflow-x-auto text-xs font-mono">
          {["All", "PDF", "Image", "Text", "Security"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full border transition-all ${
                activeCategory === cat 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border/30 text-muted hover:border-border hover:text-text"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results list */}
        <div className="max-h-[300px] overflow-y-auto p-2 space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={tool.path}
                  onClick={() => handleSelectTool(tool.path)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-primary/20 border-l-4 border-primary pl-2.5" : "bg-transparent hover:bg-surface-light"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-text flex items-center gap-2">
                      {tool.name}
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-muted bg-surface-light px-1.5 py-0.5 rounded border border-border/30">
                        {tool.category}
                      </span>
                    </span>
                    <span className="text-xs text-muted mt-1 max-w-[350px] truncate">{tool.description}</span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] text-primary font-mono flex items-center gap-1">
                      ENTER <CornerDownLeft className="w-3 h-3" />
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-sm text-muted">No matching tools found.</div>
          )}
        </div>

        {/* History and Popular Keywords footer info */}
        <div className="bg-surface-light px-4 py-3 border-t border-border/40 flex flex-col gap-2.5 text-xs text-muted">
          {history.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Recent:</span>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(h)}
                  className="px-2 py-0.5 rounded border border-border/30 hover:border-border hover:text-text transition-all bg-surface"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-primary" /> Popular:</span>
            {popularKeywords.map((kw, i) => (
              <button
                key={i}
                onClick={() => setQuery(kw)}
                className="px-2 py-0.5 rounded border border-border/30 hover:border-border hover:text-text transition-all bg-surface"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchModal;
