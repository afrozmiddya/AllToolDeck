import React, { useState } from "react";
import axios from "axios";
import { Image as ImageIcon, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("webp");
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("converted-image");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("format", format);

      const response = await axios.post("http://localhost:5000/api/v1/image/convert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // Important for receiving binary data
      });

      const blob = new Blob([response.data], { type: `image/${format}` });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-converted.${format}`);
    } catch (err: any) {
      if (err.response && err.response.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const jsonError = JSON.parse(text);
          setError(jsonError.message || "An error occurred during conversion.");
        } catch {
          setError("Failed to process the response.");
        }
      } else {
        setError(err.message || "An unknown error occurred.");
      }
    } finally {
      setIsConverting(false);
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
              <ImageIcon className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Image Format Converter</CardTitle>
              <CardDescription>Convert images to WebP, PNG, or JPEG blazing fast.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!downloadUrl ? (
            <>
              <FileDropZone 
                onFilesAccepted={handleFilesAccepted} 
                multiple={false}
                acceptedTypes={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] }}
                title="Select Image to Convert"
                description="Drag and drop your image here"
                maxSizeMB={25}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="font-medium text-sm">Target Format:</div>
                <div className="flex gap-2">
                  {(['webp', 'png', 'jpeg'] as const).map((fmt) => (
                    <Button 
                      key={fmt} 
                      variant={format === fmt ? "default" : "outline"} 
                      onClick={() => setFormat(fmt)}
                      className="w-24 uppercase"
                      size="sm"
                    >
                      {fmt}
                    </Button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button 
                onClick={handleConvert} 
                disabled={!file || isConverting} 
                className="w-full h-12 text-md"
              >
                {isConverting ? (
                  "Converting Image..."
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" /> Convert to {format.toUpperCase()}
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Conversion Complete!</h3>
                <p className="text-zinc-500 mt-2">Your image is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Convert Another</Button>
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

export default ImageConverter;
