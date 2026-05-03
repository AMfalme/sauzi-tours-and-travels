"use client";

import { useState } from "react";
import Image from "next/image";
import { dashboardTheme } from "@/app/components/dashboard/theme";

export type ImageUploadManagerProps = {
  existingImages: string[];
  selectedFiles: File[];
  isUploading: boolean;
  onFilesSelected: (files: File[]) => void;
  onImageRemoved: (index: number) => void;
  onUpload: () => Promise<void>;
  showUploadButton?: boolean;
  maxColumns?: "2" | "3";
};

async function uploadImagesToCloudinary(files: File[]): Promise<string[]> {
  if (files.length === 0) return [];

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables are not configured.");
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "Image upload failed");
    }

    uploadedUrls.push(data.secure_url);
  }

  return uploadedUrls;
}

export function ImageUploadManager({
  existingImages,
  selectedFiles,
  isUploading,
  onFilesSelected,
  onImageRemoved,
  onUpload,
  showUploadButton = false,
  maxColumns = "3",
}: ImageUploadManagerProps) {
  const [localError, setLocalError] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setLocalError("");
    onFilesSelected(files);
  };

  const handleUpload = async () => {
    try {
      setLocalError("");
      if (selectedFiles.length === 0) {
        setLocalError("No files selected for upload.");
        return;
      }
      await onUpload();
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "Failed to upload images");
    }
  };

  const gridColsClass = maxColumns === "2" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="rounded border bg-white p-3" style={{ borderColor: dashboardTheme.border }}>
      <p className="text-sm font-medium" style={{ color: dashboardTheme.textDark }}>
        Package Images
      </p>

      {/* Existing Images Grid */}
      {existingImages.length > 0 ? (
        <div className={`mt-3 grid gap-3 ${gridColsClass}`}>
          {existingImages.map((imageUrl, index) => (
            <div
              key={`image-${index}`}
              className="overflow-hidden rounded-lg border bg-slate-50"
              style={{ borderColor: dashboardTheme.border }}
            >
              <div className="h-28 w-full bg-slate-100">
                
                <Image
                  src={imageUrl}
                  alt={`Package preview ${index + 1}`}
                  fill
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center justify-end p-2">
                <button
                  type="button"
                  onClick={() => onImageRemoved(index)}
                  className="rounded px-2 py-1 text-xs text-white bg-red-600 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-xs" style={{ color: dashboardTheme.textMuted }}>
          No images currently attached.
        </p>
      )}

      {/* Upload Section */}
      <div className="mt-4 border-t pt-4" style={{ borderColor: dashboardTheme.border }}>
        <label className="block text-sm" style={{ color: dashboardTheme.textMuted }}>
          Upload New Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm disabled:opacity-50"
            style={{ borderColor: dashboardTheme.border, color: dashboardTheme.textDark }}
          />
        </label>

        <p className="mt-2 text-xs" style={{ color: dashboardTheme.textMuted }}>
          Selected: {selectedFiles.length} file(s)
        </p>

        {localError && (
          <p className="mt-2 text-xs text-red-600">{localError}</p>
        )}

        {showUploadButton && (
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || selectedFiles.length === 0}
            className="mt-3 rounded px-3 py-2 text-xs text-white disabled:opacity-70"
            style={{ backgroundColor: dashboardTheme.secondary }}
          >
            {isUploading ? "Uploading..." : "Upload Images"}
          </button>
        )}
      </div>
    </div>
  );
}

export { uploadImagesToCloudinary };
