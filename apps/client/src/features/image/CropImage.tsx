import React, { useState, useRef } from "react";
import axios from "axios";
import { Crop, Play, Download } from "lucide-react";
import ReactCrop, { type Crop as CropType, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileDropZone } from "@/components/common/FileDropZone";

export const CropImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<CropType>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("cropped-image");

  const handleFilesAccepted = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setDownloadUrl(null);
      setError(null);
      setCrop(undefined);
      
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(files[0]);
    }
  };

  const onImageLoad = () => {
    setCrop({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
  };

  const handleCrop = async () => {
    if (!file || !completedCrop) {
      setError("Please select an image and draw a crop area.");
      return;
    }

    if (!imgRef.current) return;

    // Calculate actual pixel dimensions based on the natural image size
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const actualLeft = Math.floor(completedCrop.x * scaleX);
    const actualTop = Math.floor(completedCrop.y * scaleY);
    const actualWidth = Math.floor(completedCrop.width * scaleX);
    const actualHeight = Math.floor(completedCrop.height * scaleY);

    if (actualWidth === 0 || actualHeight === 0) {
      setError("Invalid crop area.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("left", actualLeft.toString());
      formData.append("top", actualTop.toString());
      formData.append("width", actualWidth.toString());
      formData.append("height", actualHeight.toString());

      const response = await axios.post("http://localhost:5000/api/v1/image/crop", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      const format = file.name.split('.').pop() || 'png';
      const blob = new Blob([response.data], { type: (response.headers['content-type'] as string) || `image/${format}` });
      const url = window.URL.createObjectURL(blob);
      setDownloadUrl(url);
      
      const originalName = file.name.split('.')[0];
      setDownloadName(`${originalName}-cropped.${format}`);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startOver = () => {
    setFile(null);
    setImgSrc('');
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <Crop className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>Crop Image</CardTitle>
              <CardDescription>Select an area of your image to crop out.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!downloadUrl ? (
            <>
              {!file ? (
                <FileDropZone 
                  onFilesAccepted={handleFilesAccepted} 
                  multiple={false}
                  acceptedTypes={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
                  title="Select Image to Crop"
                  description="Drag and drop your image here"
                  maxSizeMB={25}
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                     <span className="text-sm font-medium">{file.name}</span>
                     <Button variant="outline" size="sm" onClick={() => setFile(null)}>Change Image</Button>
                  </div>
                  
                  <div className="flex justify-center bg-zinc-900/5 dark:bg-black p-4 rounded-xl overflow-hidden max-h-[60vh]">
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                    >
                      <img
                        ref={imgRef}
                        alt="Crop preview"
                        src={imgSrc}
                        onLoad={onImageLoad}
                        className="max-h-[50vh] object-contain"
                      />
                    </ReactCrop>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  <Button onClick={handleCrop} disabled={isProcessing} className="w-full h-12 text-md">
                    {isProcessing ? "Cropping..." : <><Play className="w-5 h-5 mr-2" /> Crop Selection</>}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <Download className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">Crop Complete!</h3>
                <p className="text-zinc-500 mt-2">Your cropped image is ready for download.</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={startOver}>Crop Another</Button>
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
