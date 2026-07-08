import React, { useState } from "react";
import { FileText, Copy, RefreshCw } from "lucide-react";
import { loremIpsum } from "lorem-ipsum";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const LoremIpsumGenerator: React.FC = () => {
  const [count, setCount] = useState<number>(3);
  const [unit, setUnit] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [output, setOutput] = useState<string>("");

  const handleGenerate = () => {
    const text = loremIpsum({
      count,
      units: unit,
      format: "plain",
    });
    setOutput(text);
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <FileText className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Lorem Ipsum Generator</CardTitle>
              <CardDescription>Generate placeholder text for your designs instantly.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-2 flex-1">
              <Label>Amount</Label>
              <Input 
                type="number" 
                min={1} 
                max={100} 
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value) || 1)} 
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label>Unit</Label>
              <div className="flex gap-2">
                <Button variant={unit === "paragraphs" ? "default" : "outline"} onClick={() => setUnit("paragraphs")} className="flex-1">Paragraphs</Button>
                <Button variant={unit === "sentences" ? "default" : "outline"} onClick={() => setUnit("sentences")} className="flex-1">Sentences</Button>
                <Button variant={unit === "words" ? "default" : "outline"} onClick={() => setUnit("words")} className="flex-1">Words</Button>
              </div>
            </div>
            <Button onClick={handleGenerate} className="w-full sm:w-auto h-10 px-8">
              <RefreshCw className="w-4 h-4 mr-2" /> Generate
            </Button>
          </div>

          <div className="relative pt-4">
            <div className="flex justify-between items-center mb-2">
              <Label>Generated Text</Label>
              <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!output} className="h-8 px-2 text-zinc-500">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
            </div>
            <textarea
              value={output}
              readOnly
              placeholder="Click Generate..."
              className="w-full h-[400px] p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl resize-none focus:outline-none text-zinc-900 dark:text-zinc-50 leading-relaxed"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
