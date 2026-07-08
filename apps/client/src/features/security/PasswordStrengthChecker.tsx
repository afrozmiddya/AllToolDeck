import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Key } from "lucide-react";
import zxcvbn from "zxcvbn";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState("");
  const result = password ? zxcvbn(password) : null;

  const scoreColors = [
    "bg-red-500", // 0
    "bg-orange-500", // 1
    "bg-yellow-500", // 2
    "bg-blue-500", // 3
    "bg-green-500", // 4
  ];

  const scoreLabels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Strong",
    "Very Strong"
  ];

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Password Strength Checker</CardTitle>
              <CardDescription>Test the strength of your passwords against advanced cracking dictionaries.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Enter Password to Test</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input
                type="text"
                placeholder="Type a password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 text-lg font-mono"
              />
            </div>
          </div>

          {result && (
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Strength: <span className="font-bold">{scoreLabels[result.score]}</span></span>
                <span className="text-sm text-zinc-500">Estimated crack time: {result.crack_times_display.offline_fast_hashing_1e10_per_second}</span>
              </div>
              <div className="flex gap-1 h-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${
                      i <= result.score ? scoreColors[result.score] : "bg-zinc-200 dark:bg-zinc-800"
                    } transition-colors duration-300`}
                  />
                ))}
              </div>

              {result.feedback.warning && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 rounded-lg text-sm">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>{result.feedback.warning}</span>
                </div>
              )}
              
              {result.feedback.suggestions.length > 0 && (
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc list-inside mt-2">
                  {result.feedback.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
