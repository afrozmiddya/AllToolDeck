import React, { useState } from "react";
import { SplitSquareHorizontal, Eraser } from "lucide-react";
import { diffWordsWithSpace, Change } from "diff";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const TextDifferenceChecker: React.FC = () => {
  const [originalText, setOriginalText] = useState("");
  const [modifiedText, setModifiedText] = useState("");
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  const handleCompare = () => {
    const diff = diffWordsWithSpace(originalText, modifiedText);
    setDiffResult(diff);
  };

  const handleClear = () => {
    setOriginalText("");
    setModifiedText("");
    setDiffResult([]);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <SplitSquareHorizontal className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Text Difference Checker</CardTitle>
              <CardDescription>Compare two pieces of text and instantly see the differences.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Original Text</Label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste the original text here..."
                className="w-full h-[300px] p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Modified Text</Label>
              <textarea
                value={modifiedText}
                onChange={(e) => setModifiedText(e.target.value)}
                placeholder="Paste the modified text here..."
                className="w-full h-[300px] p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button variant="outline" onClick={handleClear}>
              <Eraser className="w-4 h-4 mr-2" /> Clear
            </Button>
            <Button onClick={handleCompare} disabled={!originalText && !modifiedText}>
              Compare Text
            </Button>
          </div>

          {diffResult.length > 0 && (
            <div className="mt-8 space-y-2">
              <Label>Difference Result</Label>
              <div className="w-full p-4 min-h-[200px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {diffResult.map((part, index) => {
                  const color = part.added
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : part.removed
                    ? "bg-red-100 text-red-800 line-through dark:bg-red-900/30 dark:text-red-400"
                    : "text-zinc-600 dark:text-zinc-400";
                  return (
                    <span key={index} className={color}>
                      {part.value}
                    </span>
                  );
                })}
              </div>
              <div className="flex gap-4 text-xs pt-2">
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div> Added</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div> Removed</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
