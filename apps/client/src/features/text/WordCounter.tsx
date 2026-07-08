import React, { useState, useMemo } from "react";
import { Type, AlignLeft, BarChart2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const WordCounter: React.FC = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
    
    // Average reading speed ~200 words per minute
    const readingTimeMins = Math.max(1, Math.ceil(words / 200));

    return { chars, charsNoSpaces, words, sentences, paragraphs, readingTimeMins };
  }, [text]);

  const StatBox = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
    <div className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
      <div className="p-3 bg-white dark:bg-zinc-950 rounded-md border border-zinc-200 dark:border-zinc-800 mr-4">
        <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
      </div>
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-none">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Type className="w-8 h-8" />
          Word & Character Counter
        </h1>
        <p className="text-zinc-500">Real-time text metrics analysis running securely in your browser.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-[500px] p-6 rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 text-lg shadow-sm"
            placeholder="Type or paste your text here to begin counting..."
          />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Text Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <StatBox label="Words" value={stats.words} icon={AlignLeft} />
              <StatBox label="Characters" value={stats.chars} icon={Type} />
              <StatBox label="Sentences" value={stats.sentences} icon={BarChart2} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Extended Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Characters (No Spaces)</span>
                <span className="font-semibold">{stats.charsNoSpaces}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Paragraphs</span>
                <span className="font-semibold">{stats.paragraphs}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="flex items-center gap-2 text-zinc-500"><Clock className="w-4 h-4"/> Est. Reading Time</span>
                <span className="font-semibold">~{stats.readingTimeMins} min</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WordCounter;
