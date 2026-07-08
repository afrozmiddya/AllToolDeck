import React, { useState } from "react";
import { FileText, Play, Download } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

// Setup PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export const PDFToWord: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("document.doc");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleConvertToWord = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      let fullText = "";

      // Extract text from all pages
      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }

      // Create a simulated Word Doc using HTML layout
      const wordHtml = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Export HTML To Doc</title></head>
        <body><div style="white-space: pre-wrap; font-family: Calibri, sans-serif;">${fullText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div></body>
        </html>
      `;

      const blob = new Blob(['\ufeff', wordHtml], {
        type: 'application/msword'
      });

      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}.doc`);
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF text extraction.");
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
              <FileText className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>PDF to Word</CardTitle>
              <CardDescription>Extract text from your PDF into a Microsoft Word compatible document.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!downloadUrl ? (
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

              <Button onClick={handleConvertToWord} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Extracting Text..." : <><Play className="w-5 h-5 mr-2" /> Convert to Word</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Extraction Complete!</h3>
                <p className="text-zinc-500 mt-2">Your document text is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Convert Another</Button>
                <a href={downloadUrl} download={downloadName}>
                  <Button>Download .doc</Button>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
