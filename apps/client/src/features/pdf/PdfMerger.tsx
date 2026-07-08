import React, { useState } from "react";
import axios from "axios";
import { Layers, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const PdfMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFilesAccepted = (newFiles: File[]) => {
    // Append new files to the list
    setFiles((prev) => [...prev, ...newFiles]);
    setDownloadUrl(null);
    setError(null);
  };

  const clearAll = () => {
    setFiles([]);
    setDownloadUrl(null);
    setError(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }

    setIsMerging(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axios.post("http://localhost:5000/api/v1/pdf/merge", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob", // Extremely important for handling binary file downloads!
      });

      // Create a blob URL to trigger browser download
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
    } catch (err: any) {
      // Because we used responseType: 'blob', Axios wraps the error differently. 
      // We must read the blob to get the JSON error message.
      if (err.response && err.response.data instanceof Blob) {
        const text = await err.response.data.text();
        try {
          const jsonError = JSON.parse(text);
          setError(jsonError.message || "An error occurred during merging.");
        } catch {
          setError("Failed to process the response.");
        }
      } else {
        setError(err.message || "An unknown error occurred.");
      }
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Layers className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>PDF Merger</CardTitle>
              <CardDescription>Combine multiple PDFs into a single document entirely securely.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!downloadUrl ? (
            <>
              <FileDropZone 
                onFilesAccepted={handleFilesAccepted} 
                multiple={true}
                acceptedTypes={{ 'application/pdf': ['.pdf'] }}
                title="Add PDFs to Merge"
                description="Drag multiple PDF files here"
                maxSizeMB={50}
              />
              
              {error && (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <Button variant="outline" onClick={clearAll} disabled={files.length === 0 || isMerging} className="w-1/3">
                  Clear List
                </Button>
                <Button 
                  onClick={handleMerge} 
                  disabled={files.length < 2 || isMerging} 
                  className="flex-1"
                >
                  {isMerging ? (
                    "Merging Files..."
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" /> Merge {files.length} Files
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Merging Complete!</h3>
                <p className="text-zinc-500 mt-2">Your PDFs have been successfully combined.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={clearAll}>Start Over</Button>
                <a href={downloadUrl} download="merged-document.pdf">
                  <Button>Download Merged PDF</Button>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfMerger;
