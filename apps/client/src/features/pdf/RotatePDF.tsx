import React, { useState } from "react";
import { RotateCw, Play, Download } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const RotatePDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("rotated-document.pdf");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleRotate = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees(currentRotation + angle));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-rotated.pdf`);
    } catch (err: any) {
      setError(err.message || "An error occurred during PDF rotation.");
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
              <RotateCw className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Rotate PDF</CardTitle>
              <CardDescription>Rotate all pages in your PDF document instantly.</CardDescription>
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
                title="Select PDF to Rotate"
                description="Drag and drop your PDF here"
                maxSizeMB={50}
              />
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="font-medium text-sm">Rotation Angle:</div>
                <div className="flex gap-2">
                  <Button variant={angle === -90 ? "default" : "outline"} onClick={() => setAngle(-90)}>-90°</Button>
                  <Button variant={angle === 90 ? "default" : "outline"} onClick={() => setAngle(90)}>90°</Button>
                  <Button variant={angle === 180 ? "default" : "outline"} onClick={() => setAngle(180)}>180°</Button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleRotate} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Rotating..." : <><Play className="w-5 h-5 mr-2" /> Rotate PDF</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Rotation Complete!</h3>
                <p className="text-zinc-500 mt-2">Your rotated PDF is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Rotate Another</Button>
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
