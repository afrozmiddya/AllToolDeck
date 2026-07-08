import React, { useState } from "react";
import axios from "axios";
import { Shrink, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const CompressImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(60);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("compressed-image");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("quality", quality.toString());

      const response = await axios.post("http://localhost:5000/api/v1/image/compress", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const format = file.name.split('.').pop() || 'png';
      const blob = new Blob([response.data], { type: (response.headers['content-type'] as string) || `image/${format}` });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-compressed.${format}`);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Shrink className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Compress Image</CardTitle>
              <CardDescription>Reduce image file size while maintaining quality.</CardDescription>
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
                title="Select Image to Compress"
                description="Drag and drop your image here"
                maxSizeMB={25}
              />
              
              <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center">
                  <label className="font-medium text-sm">Quality Level ({quality}%)</label>
                  <span className="text-xs text-zinc-500">Lower = Smaller File Size</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full accent-zinc-900 dark:accent-zinc-100"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleCompress} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Compressing..." : <><Play className="w-5 h-5 mr-2" /> Compress Image</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Compression Complete!</h3>
                <p className="text-zinc-500 mt-2">Your smaller image is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Compress Another</Button>
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
