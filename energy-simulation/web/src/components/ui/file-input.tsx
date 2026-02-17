"use client";

import { cn } from "@/src/utils/cn";
import { useRef, useState, useEffect } from "react";

export interface FileInputProps {
  label?: string;
  hint?: string;
  name?: string;
  error?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
}

interface PreviewFile {
  file: File;
  url: string;
  id: string;
}

export function FileInput({
  label,
  hint,
  error,
  name,
  value,
  onChange,
  accept = "image/*",
  maxFiles = 10,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [previews, setPreviews] = useState<PreviewFile[]>([]);

  const hasError = !!error;

  useEffect(() => {
    if (!value) return;

    const mapped = value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setPreviews(mapped);

    return () => {
      mapped.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [value]);

  function handleFiles(files: FileList | null) {
    if (!files) return;

    const newFiles = Array.from(files);

    const allowed = newFiles.slice(0, maxFiles - previews.length);

    const newPreviews = allowed.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    const updated = [...previews, ...newPreviews];

    setPreviews(updated);

    onChange?.(updated.map((p) => p.file));
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const updatedFiles = [...previews.map((p) => p.file), ...newFiles].slice(
      0,
      maxFiles,
    );

    const newPreviews = updatedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: crypto.randomUUID(),
    }));

    setPreviews(newPreviews);
    onChange?.(updatedFiles);

    const dt = new DataTransfer();
    updatedFiles.forEach((f) => dt.items.add(f));
    event.target.files = dt.files;
  }

  function handleRemove(id: string) {
    const updated = previews.filter((p) => p.id !== id);

    setPreviews(updated);

    onChange?.(updated.map((p) => p.file));
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    handleFiles(event.dataTransfer.files);
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div className="w-full">
      {label && (
        <label
          className="
          block
          text-sm
          font-medium
          text-foreground
          mb-2
        "
        >
          {label}
        </label>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openFilePicker}
        className={cn(
          `
          border-2
          border-dashed
          rounded-lg
          p-6
          text-center
          cursor-pointer
          transition-all
          `,
          hasError ? "border-error" : "border-border hover:border-primary",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          name={name}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        <p className="text-sm text-muted-foreground">
          Clique ou arraste arquivos aqui
        </p>

        <p className="text-xs text-muted-foreground mt-1">
          Máximo {maxFiles} arquivos
        </p>
      </div>

      {/* Preview grid */}
      {previews.length > 0 && (
        <div
          className="
          mt-4
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-3
        "
        >
          {previews.map((preview) => (
            <div
              key={preview.id}
              className="
                relative
                border
                border-border
                rounded-lg
                overflow-hidden
                bg-surface
              "
            >
              <img
                src={preview.url}
                alt={preview.file.name}
                className="
                  w-full
                  h-24
                  object-cover
                "
              />

              <button
                type="button"
                onClick={() => handleRemove(preview.id)}
                className="
                  absolute
                  top-1
                  right-1
                  bg-error
                  text-white
                  rounded
                  px-1.5
                  py-0.5
                  text-xs
                "
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hint */}
      {!error && hint && (
        <p
          className="
          text-xs
          text-muted-foreground
          mt-2
        "
        >
          {hint}
        </p>
      )}

      {/* Error */}
      {error && (
        <p
          className="
          text-xs
          text-error
          mt-2
        "
        >
          {error}
        </p>
      )}
    </div>
  );
}
