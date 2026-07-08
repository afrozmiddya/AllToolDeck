import React, { useState } from "react";
import { Eraser, Play, Download } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const BackgroundRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("removed-bg");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
      setProgress(0);
    }
  };

  const handleRemoveBackground = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const url = URL.createObjectURL(file);
      
      const blob = await removeBackground(url, {
        progress: (_key, current, total) => {
          // Progress can be jumpy, just show we are working
          const pct = Math.round((current / total) * 100);
          setProgress(isNaN(pct) ? 0 : pct);
        }
      });
      
      const outputUrl = URL.createObjectURL(blob);
      setDownloadUrl(outputUrl);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-no-bg.png`);
    } catch (err: any) {
      setError(err.message || "An error occurred while removing the background. This feature requires WebGL.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Eraser className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Background Remover</CardTitle>
              <CardDescription>Automatically remove backgrounds from images natively in your browser using AI.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!downloadUrl ? (
            <>
              <FileDropZone 
                onFilesAccepted={handleFilesAccepted} 
                multiple={false}
                acceptedTypes={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                title="Select Image to Remove Background"
                description="Drag and drop your image here"
                maxSizeMB={25}
              />
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              {isProcessing && progress > 0 && progress < 100 && (
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2.5">
                  <div className="bg-zinc-900 dark:bg-zinc-100 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              )}

              <Button onClick={handleRemoveBackground} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Analyzing Image..." : <><Play className="w-5 h-5 mr-2" /> Remove Background</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Background Removed!</h3>
                <p className="text-zinc-500 mt-2">Your image with a transparent background is ready.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Process Another</Button>
                <a href={downloadUrl} download={downloadName}>
                  <Button>Download Image</Button>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
