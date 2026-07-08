import React, { useState } from "react";
import { Scissors, Play, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SplitPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [splitAfterPage, setSplitAfterPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrls, setDownloadUrls] = useState<{ url: string; name: string }[]>([]);

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrls([]);
      setError(null);
    }
  };

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (splitAfterPage < 1) {
      setError("Page number must be at least 1.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const totalPages = originalPdf.getPageCount();

      if (splitAfterPage >= totalPages) {
        setError(`Cannot split after page ${splitAfterPage}. The PDF only has ${totalPages} pages.`);
        setIsProcessing(false);
        return;
      }

      // Create first part (pages 1 to splitAfterPage)
      const part1 = await PDFDocument.create();
      const copiedPages1 = await part1.copyPages(
        originalPdf, 
        Array.from({ length: splitAfterPage }, (_, i) => i)
      );
      copiedPages1.forEach((page) => part1.addPage(page));
      const pdfBytes1 = await part1.save();

      // Create second part (pages splitAfterPage+1 to end)
      const part2 = await PDFDocument.create();
      const copiedPages2 = await part2.copyPages(
        originalPdf, 
        Array.from({ length: totalPages - splitAfterPage }, (_, i) => i + splitAfterPage)
      );
      copiedPages2.forEach((page) => part2.addPage(page));
      const pdfBytes2 = await part2.save();

      const blob1 = new Blob([pdfBytes1], { type: 'application/pdf' });
      const blob2 = new Blob([pdfBytes2], { type: 'application/pdf' });

      const originalName = file.name.split('.')[0];
      
      setDownloadUrls([
        { url: URL.createObjectURL(blob1), name: `${originalName}-part1.pdf` },
        { url: URL.createObjectURL(blob2), name: `${originalName}-part2.pdf` }
      ]);

    } catch (err: any) {
      setError(err.message || "An error occurred during PDF splitting.");
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Scissors className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Split PDF</CardTitle>
              <CardDescription>Split a single PDF file into two separate documents.</CardDescription>
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
                title="Select PDF to Split"
                description="Drag and drop your PDF here"
                maxSizeMB={50}
              />
              
              <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <Label>Split After Page Number:</Label>
                <Input 
                  type="number" 
                  min="1" 
                  value={splitAfterPage} 
                  onChange={(e) => setSplitAfterPage(parseInt(e.target.value))} 
                  className="max-w-xs"
                />
                <p className="text-sm text-zinc-500">The PDF will be split into Part 1 (Pages 1 to {splitAfterPage}) and Part 2 (Pages {splitAfterPage + 1} to end).</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleSplit} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Splitting PDF..." : <><Play className="w-5 h-5 mr-2" /> Split PDF</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Scissors className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Split Complete!</h3>
                <p className="text-zinc-500 mt-2">Your PDF has been split into two files.</p>
              </div>
              <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
                {downloadUrls.map((file, idx) => (
                  <a key={idx} href={file.url} download={file.name} className="w-full">
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" /> Download {file.name}
                    </Button>
                  </a>
                ))}
                <Button className="mt-4" onClick={startOver}>Split Another PDF</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
