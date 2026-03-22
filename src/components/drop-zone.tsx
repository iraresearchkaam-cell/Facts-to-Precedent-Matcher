"use client";

import * as React from "react";
import { Upload, File, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  disabled?: boolean;
}

export function DropZone({ onFileSelect, isProcessing, disabled }: DropZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "Please upload a PDF file";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled || isProcessing) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        const error = validateFile(file);
        if (error) {
          return;
        }
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [disabled, isProcessing, onFileSelect]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const error = validateFile(file);
        if (error) {
          return;
        }
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleClick = () => {
    if (!disabled && !isProcessing) {
      inputRef.current?.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed transition-all duration-200 cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50 hover:bg-surface-raised/50",
        (disabled || isProcessing) && "opacity-50 cursor-not-allowed",
        selectedFile && !isProcessing && "border-accent/50"
      )}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="hidden"
        disabled={disabled || isProcessing}
      />

      {isProcessing ? (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative">
            <File className="h-12 w-12 text-primary mb-4" />
            <Loader2 className="absolute -bottom-1 -right-1 h-5 w-5 text-primary animate-spin" />
          </div>
          <p className="text-text-primary font-medium">Analyzing document...</p>
          <p className="text-text-muted text-sm mt-1">Extracting facts and searching precedents</p>
        </div>
      ) : selectedFile ? (
        <div className="flex items-center justify-between py-8 px-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-surface-raised">
              <File className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-text-primary font-medium">{selectedFile.name}</p>
              <p className="text-text-muted text-sm">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 rounded-lg hover:bg-surface-raised transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className={cn(
            "p-4 rounded-full mb-4 transition-colors",
            isDragging ? "bg-primary/20" : "bg-surface-raised"
          )}>
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              isDragging ? "text-primary" : "text-text-secondary"
            )} />
          </div>
          <p className="text-text-primary font-medium mb-1">
            Drag & drop your PDF here
          </p>
          <p className="text-text-muted text-sm mb-4">
            or click to browse files
          </p>
          <p className="text-text-muted text-xs">
            PDF only, max 10MB
          </p>
        </div>
      )}

      {isDragging && (
        <div className="absolute inset-0 rounded-lg bg-primary/10 pointer-events-none" />
      )}
    </div>
  );
}
