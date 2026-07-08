import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FileDropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  acceptedTypes?: Record<string, string[]>;
  maxSizeMB?: number;
  title?: string;
  description?: string;
  className?: string;
  multiple?: boolean;
}

export const FileDropZone: React.FC<FileDropZoneProps> = ({
  onFilesAccepted,
  acceptedTypes,
  maxSizeMB = 100,
  title = "Upload File",
  description = "Drag and drop your file here, or click to browse.",
  className,
  multiple = false,
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFiles((prev) => multiple ? [...prev, ...acceptedFiles] : [acceptedFiles[0]]);
      onFilesAccepted(multiple ? acceptedFiles : [acceptedFiles[0]]);
    }
  }, [onFilesAccepted, multiple]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    maxSize: maxSizeMB * 1024 * 1024,
    multiple,
  });

  const clearFile = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer overflow-hidden group",
          isDragActive 
            ? "border-primary bg-primary/5 shadow-[0_0_40px_rgba(99,102,241,0.1)]" 
            : "border-border bg-surface/30 hover:bg-surface/60 hover:border-border/80 hover:shadow-lg hover:shadow-black/20",
          isDragReject && "border-danger bg-danger/5"
        )}
      >
        {/* Subtle background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <input {...getInputProps()} />
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "p-4 rounded-xl transition-all duration-300",
            isDragActive ? "bg-primary/20 text-primary scale-110" : "bg-surface border border-border text-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10",
            isDragReject && "bg-danger/20 text-danger"
          )}>
            <UploadCloud className={cn("w-8 h-8 transition-transform duration-300", isDragActive && "animate-bounce")} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-text">
              {isDragReject ? "File type not supported" : (isDragActive ? "Drop file now" : title)}
            </h3>
            <p className="text-sm text-muted max-w-xs mx-auto mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted bg-surface px-2 py-1 rounded-md border border-border">
              Max {maxSizeMB}MB
            </span>
            {multiple && (
              <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-muted bg-surface px-2 py-1 rounded-md border border-border">
                Multiple
              </span>
            )}
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          {selectedFiles.map((file, idx) => (
            <div key={`${file.name}-${idx}`} className="group flex items-center justify-between w-full p-4 bg-surface border border-border rounded-xl shadow-sm">
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 bg-background rounded-lg border border-border text-primary">
                  <FileIcon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-medium text-text truncate max-w-[200px] sm:max-w-[300px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted font-mono">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={(e) => clearFile(e, idx)} className="text-muted hover:text-danger hover:bg-danger/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
