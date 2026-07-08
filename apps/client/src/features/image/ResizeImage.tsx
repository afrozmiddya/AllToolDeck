import React, { useState } from "react";
import axios from "axios";
import { Maximize, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const ResizeImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>("800");
  const [height, setHeight] = useState<string>("600");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("resized-image");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
      
      // Auto-fill original dimensions
      const img = new Image();
      img.onload = () => {
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = URL.createObjectURL(files[0]);
    }
  };

  const handleResize = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    const w = parseInt(width);
    const h = parseInt(height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError("Please enter valid width and height dimensions.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("width", w.toString());
      formData.append("height", h.toString());

      const response = await axios.post("http://localhost:5000/api/v1/image/resize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const format = file.name.split('.').pop() || 'png';
      const blob = new Blob([response.data], { type: response.headers['content-type'] || `image/${format}` });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-resized.${format}`);
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
              <Maximize className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Resize Image</CardTitle>
              <CardDescription>Scale an image to your exact dimensions in pixels.</CardDescription>
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
                title="Select Image to Resize"
                description="Drag and drop your image here"
                maxSizeMB={25}
              />
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="space-y-2">
                  <Label>Target Width (px)</Label>
                  <Input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="1" />
                </div>
                <div className="space-y-2">
                  <Label>Target Height (px)</Label>
                  <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} min="1" />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleResize} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Resizing..." : <><Play className="w-5 h-5 mr-2" /> Resize Image</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Resize Complete!</h3>
                <p className="text-zinc-500 mt-2">Your resized image is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Resize Another</Button>
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
