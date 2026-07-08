import React, { useState, useRef } from "react";
import { QrCode, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const QRCodeGenerator: React.FC = () => {
  const [value, setValue] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white"; // ensure white background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <QrCode className="w-6 h-6 text-zinc-900 dark:text-zinc-50" />
            </div>
            <div>
              <CardTitle>QR Code Generator</CardTitle>
              <CardDescription>Convert URLs, text, or data into a scannable QR Code instantly.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>QR Code Value</Label>
            <Input
              type="text"
              placeholder="Enter a URL or text..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-12 text-lg"
            />
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl min-h-[300px]">
            {value ? (
              <div className="space-y-6 flex flex-col items-center">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-zinc-200">
                  <QRCodeSVG 
                    value={value} 
                    size={200} 
                    level={"Q"} 
                    includeMargin={true}
                    ref={svgRef}
                  />
                </div>
                <Button onClick={downloadQRCode} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" /> Download PNG
                </Button>
              </div>
            ) : (
              <p className="text-zinc-400 text-sm">Enter text to generate your QR code</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
