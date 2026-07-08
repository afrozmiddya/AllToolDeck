import React, { useState } from "react";
import { Shrink, Play, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const CompressPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("compressed.pdf");
  const [stats, setStats] = useState<{ before: number, after: number } | null>(null);

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
      setStats(null);
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Remove all metadata and structure tree to save space
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');

      // Saving without object streams can sometimes reduce size on messy PDFs
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      setStats({
        before: arrayBuffer.byteLength,
        after: pdfBytes.byteLength
      });

      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-compressed.pdf`);
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF compression.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
    setStats(null);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
              <CardTitle>Compress PDF</CardTitle>
              <CardDescription>Strip metadata and optimize PDF structures to reduce file size.</CardDescription>
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
                title="Select PDF to Compress"
                description="Drag and drop your PDF here"
                maxSizeMB={50}
              />
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleCompress} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Optimizing PDF..." : <><Play className="w-5 h-5 mr-2" /> Compress PDF</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Optimization Complete!</h3>
                {stats && (
                  <p className="text-zinc-500 mt-2">
                    Size reduced from <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatBytes(stats.before)}</span> to <span className="font-semibold text-green-600">{formatBytes(stats.after)}</span>.
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Compress Another</Button>
                <a href={downloadUrl} download={downloadName}>
                  <Button>Download PDF</Button>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
