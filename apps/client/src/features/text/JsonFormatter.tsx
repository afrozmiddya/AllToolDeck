import React, { useState } from "react";
import { Braces, Copy, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Braces className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>JSON Formatter & Validator</CardTitle>
              <CardDescription>Format, validate, and beautify your JSON data directly in the browser.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 h-full flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input JSON</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-1 min-h-[400px] p-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300 font-mono text-sm shadow-inner"
                placeholder='{"example": "Paste raw JSON here"}'
                spellCheck={false}
              />
            </div>
            <div className="space-y-2 h-full flex flex-col relative">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Formatted Output</span>
              </div>
              
              <div className="relative flex-1">
                <textarea
                  readOnly
                  value={error ? "" : output}
                  className={`w-full h-full min-h-[400px] p-4 rounded-lg border ${error ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'} resize-none font-mono text-sm whitespace-pre overflow-auto shadow-inner`}
                  placeholder="Formatted JSON will appear here..."
                  spellCheck={false}
                />
                
                {error && (
                  <div className="absolute inset-0 p-4 text-red-600 dark:text-red-400 font-mono text-sm overflow-auto">
                    {error}
                  </div>
                )}
                
                {!error && output && (
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="absolute right-2 top-2 bg-white/80 dark:bg-zinc-950/80 backdrop-blur"
                    onClick={handleCopy}
                  >
                    <Copy className={`w-4 h-4 transition-transform ${copied ? "scale-110 text-green-500" : "text-zinc-500"}`} />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <Button 
            className="w-full h-12 text-md mt-6" 
            onClick={formatJson}
          >
            <Play className="w-5 h-5 mr-2" />
            Format & Validate JSON
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonFormatter;
