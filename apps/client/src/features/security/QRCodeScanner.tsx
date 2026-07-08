import React, { useState, useRef } from "react";
import { ScanLine, Upload } from "lucide-react";
import jsQR from "jsqr";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const QRCodeScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          setError("Failed to create canvas context");
          return;
        }
        
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          setResult(code.data);
        } else {
          setError("No QR code found in this image.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const copyResult = () => {
    if (result) navigator.clipboard.writeText(result);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <ScanLine className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>QR Code Scanner</CardTitle>
              <CardDescription>Upload an image containing a QR code to extract its data.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 text-center space-y-4">
            <div className="p-4 bg-white dark:bg-zinc-950 rounded-full border border-zinc-200 dark:border-zinc-800">
              <Upload className="w-8 h-8 text-zinc-500" />
            </div>
            <div>
              <Label className="cursor-pointer font-semibold text-lg hover:underline text-blue-600" onClick={() => fileInputRef.current?.click()}>
                Click to browse image
              </Label>
              <p className="text-sm text-zinc-500 mt-1">Upload a PNG, JPG, or JPEG file.</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Label>Extracted Data</Label>
              <div className="flex gap-2">
                <Input value={result} readOnly className="font-mono bg-zinc-50 dark:bg-zinc-900" />
                <Button onClick={copyResult} variant="outline">Copy</Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};
