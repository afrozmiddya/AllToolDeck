import React, { useState, useRef } from "react";
import { Image, Play, Download } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export const PDFToJPG: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrls, setDownloadUrls] = useState<{ url: string; name: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrls([]);
      setError(null);
    }
  };

  const handleConvertToJPG = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!canvasRef.current) return;

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const urls: { url: string; name: string }[] = [];
      const originalName = file.name.split('.')[0];

      // Convert only the first 3 pages to prevent browser crashing for MVP
      const pagesToConvert = Math.min(pdf.numPages, 3);
      
      for (let i = 1; i <= pagesToConvert; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // High resolution

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not get 2d context");

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        } as any).promise;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        urls.push({
          url: dataUrl,
          name: `${originalName}-page-${i}.jpg`
        });
      }

      if (pdf.numPages > 3) {
        // Just note it
        console.log("Only converted the first 3 pages.");
      }

      setDownloadUrls(urls);
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF rendering.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setDownloadUrls([]);
    setError(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Hidden canvas for PDF rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Image className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>PDF to JPG</CardTitle>
              <CardDescription>Convert PDF pages into high-quality JPG images.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {downloadUrls.length === 0 ? (
            <>
              <FileDropZone 
                onFilesAccepted={handleFilesAccepted} 
                multiple={false}
                acceptedTypes={{ 'application/pdf': ['.pdf'] }}
                title="Select PDF to Convert"
                description="Drag and drop your PDF here"
                maxSizeMB={50}
              />
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleConvertToJPG} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Rendering Pages..." : <><Play className="w-5 h-5 mr-2" /> Convert to JPG</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Image className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Conversion Complete!</h3>
                <p className="text-zinc-500 mt-2">Your PDF pages have been converted to JPG.</p>
                {downloadUrls.length === 3 && <p className="text-sm text-amber-600 mt-1">Note: Only the first 3 pages were converted.</p>}
              </div>
              <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                {downloadUrls.map((urlObj, idx) => (
                  <a key={idx} href={urlObj.url} download={urlObj.name} className="w-full">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" /> Download {urlObj.name}
                    </Button>
                  </a>
                ))}
                <Button className="mt-4" onClick={startOver}>Convert Another PDF</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
