import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowDownUp, Copy, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const convertBase64 = async ({ text, mode }: { text: string; mode: "encode" | "decode" }) => {
  const endpoint = mode === "encode" ? "base64-encode" : "base64-decode";
  const { data } = await axios.post(`http://localhost:5000/api/v1/security/${endpoint}`, { text });
  return data.data.result as string;
};

export const Base64Converter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: convertBase64,
    onSuccess: (result) => {
      setOutput(result);
      setCopied(false);
    },
  });

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput("");
      return;
    }
    mutation.mutate({ text: input, mode });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    setInput(output);
    setOutput(input);
    setCopied(false);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                <LockKeyhole className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
              </div>
              <div>
                <CardTitle>Base64 Encoder & Decoder</CardTitle>
                <CardDescription>Convert plain text to Base64 and vice-versa securely.</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={toggleMode} className="gap-2">
              <ArrowDownUp className="w-4 h-4" />
              Switch to {mode === "encode" ? "Decode" : "Encode"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>{mode === "encode" ? "Plain Text Input" : "Base64 Input"}</Label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-48 p-4 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-300"
                placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
              />
            </div>
            <div className="space-y-2 relative">
              <Label>{mode === "encode" ? "Base64 Output" : "Plain Text Output"}</Label>
              <textarea
                readOnly
                value={output}
                className="w-full h-48 p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 resize-none font-mono"
                placeholder="Result will appear here..."
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-2 top-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm"
                onClick={handleCopy}
              >
                <Copy className={`w-4 h-4 transition-transform ${copied ? "scale-110 text-green-500" : ""}`} />
              </Button>
            </div>
          </div>
          <Button 
            className="w-full h-12 text-md" 
            onClick={handleConvert} 
            disabled={mutation.isPending || !input.trim()}
          >
            {mutation.isPending ? "Converting..." : mode === "encode" ? "Encode to Base64" : "Decode from Base64"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Base64Converter;
