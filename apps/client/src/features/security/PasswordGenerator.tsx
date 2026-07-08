import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const generatePassword = async (payload: { length: number; includeUppercase: boolean; includeNumbers: boolean; includeSymbols: boolean }) => {
  const { data } = await axios.post("http://localhost:5000/api/v1/security/password-generator", payload);
  return data.data.password as string;
};

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: generatePassword,
    onSuccess: (newPassword) => {
      setPassword(newPassword);
      setCopied(false);
    },
  });

  const handleGenerate = () => {
    mutation.mutate({ length, includeUppercase, includeNumbers, includeSymbols });
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Generate on mount
  React.useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Strong Password Generator</CardTitle>
              <CardDescription>Generate a secure, high-entropy password instantly.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Output Display */}
          <div className="relative">
            <Input 
              readOnly 
              value={password} 
              className="pr-12 text-lg font-mono text-center h-14 bg-zinc-50 dark:bg-zinc-900" 
              placeholder="Generating..."
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute right-1 top-1.5 h-11 w-11 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
              onClick={handleCopy}
            >
              <Copy className={`w-5 h-5 transition-transform ${copied ? "scale-110 text-green-500" : ""}`} />
            </Button>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Password Length</Label>
                <span className="text-sm text-zinc-500">{length} characters</span>
              </div>
              <Slider 
                value={[length]} 
                onValueChange={(val) => setLength(val[0])} 
                min={8} 
                max={64} 
                step={1} 
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="uppercase" className="cursor-pointer">Include Uppercase Letters</Label>
                <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="numbers" className="cursor-pointer">Include Numbers</Label>
                <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="symbols" className="cursor-pointer">Include Symbols</Label>
                <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
              </div>
            </div>

            <Button 
              className="w-full h-12 text-md" 
              onClick={handleGenerate} 
              disabled={mutation.isPending}
            >
              <RefreshCw className={`mr-2 h-5 w-5 ${mutation.isPending ? "animate-spin" : ""}`} />
              Generate New Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordGenerator;
