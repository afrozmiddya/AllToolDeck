import React, { useState } from "react";
import { Unlock, Play, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const UnlockPDF: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("unlocked.pdf");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
    }
  };

  const handleUnlock = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (!password) {
      setError("Please enter the password to unlock the document.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the document with the password
      // If the password is correct, pdf-lib parses it.
      // Saving it will result in an unencrypted file.
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password } as any);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-unlocked.pdf`);
    } catch (err: any) {
      if (err.message?.includes('Invalid password') || err.message?.includes('encrypted')) {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err.message || "An error occurred during PDF unlocking.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setDownloadUrl(null);
    setError(null);
    setPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Unlock className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Unlock PDF</CardTitle>
              <CardDescription>Remove password protection from a PDF document.</CardDescription>
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
                title="Select Protected PDF"
                description="Drag and drop your encrypted PDF here"
                maxSizeMB={50}
              />
              
              <div className="flex flex-col gap-4 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <Label>Current PDF Password:</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Enter document password"
                  className="max-w-xs"
                />
                <p className="text-sm text-zinc-500">You must know the current password to unlock it. The downloaded copy will not require a password.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleUnlock} disabled={!file || isProcessing} className="w-full h-12 text-md">
                {isProcessing ? "Unlocking PDF..." : <><Play className="w-5 h-5 mr-2" /> Unlock PDF</>}
              </Button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Unlocking Complete!</h3>
                <p className="text-zinc-500 mt-2">Your PDF no longer requires a password.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Unlock Another</Button>
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
