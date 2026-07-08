import React, { useState } from "react";
import { Copy, RefreshCw, Eraser, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface TextToolLayoutProps {
  title: string;
  description: string;
  icon: React.ElementType;
  processText: (input: string) => string | Promise<string>;
  actionButtonText: string;
  placeholder?: string;
  extraControls?: React.ReactNode;
}

export const TextToolLayout: React.FC<TextToolLayoutProps> = ({
  title,
  description,
  icon: Icon,
  processText,
  actionButtonText,
  placeholder = "Type or paste your text here...",
  extraControls,
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const result = await Promise.resolve(processText(input));
      setOutput(result);
    } catch (error) {
      setOutput("Error processing text.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-result.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Icon className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-2 relative">
              <div className="flex justify-between items-center">
                <Label>Input</Label>
                <Button variant="ghost" size="sm" onClick={handleClear} className="h-8 px-2 text-zinc-500">
                  <Eraser className="w-4 h-4 mr-2" /> Clear
                </Button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full h-[400px] p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 font-mono text-sm"
              />
            </div>

            {/* Output Section */}
            <div className="space-y-2 relative">
              <div className="flex justify-between items-center">
                <Label>Output</Label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output} className="h-8 px-2 text-zinc-500">
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleDownload} disabled={!output} className="h-8 px-2 text-zinc-500">
                    <Download className="w-4 h-4 mr-2" /> Save
                  </Button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-[400px] p-4 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none font-mono text-sm text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          {extraControls && <div className="pt-4">{extraControls}</div>}

          <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <Button onClick={handleProcess} disabled={!input || isProcessing} className="w-full sm:w-auto">
              <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? "animate-spin" : ""}`} /> 
              {isProcessing ? "Processing..." : actionButtonText}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
