"use client";

import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface PhotoUploaderProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export default function PhotoUploader({
  photos,
  onPhotosChange,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);

  useEffect(() => {
    // new URL create
    const newPreviews = photos.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(newPreviews);
    // cleanup
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photos]);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const validFiles: File[] = [];
      let errorMsg = "";
      Array.from(files).forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          errorMsg = `File "${file.name}" is larger than 2MB.`;
        } else {
          validFiles.push(file);
        }
      });
      if (errorMsg) {
        setPhotoError(errorMsg);
      } else {
        setPhotoError(null);
      }
      onPhotosChange([...photos, ...validFiles]);
      e.target.value = "";
    }
  };

  const handleRemovePhoto = (idx: number) => {
    URL.revokeObjectURL(photoPreviews[idx]);
    onPhotosChange(photos.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">Photos (optional)</label>
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handlePhotoChange}
      />
      <PlusCircleIcon
        className="w-9 h-9 text-blue-400 hover:text-blue-300 cursor-pointer mx-auto"
        onClick={handleAddPhoto}
      />
      {photoError && (
        <span className="text-red-500 font-medium">{photoError}</span>
      )}
      {/* preview */}
      <div className="flex flex-col gap-2 mt-2">
        {photoPreviews.map((url, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Image
              width={60}
              height={60}
              className="object-cover rounded"
              alt={`photo-${idx}`}
              src={url}
            />
            <span className="text-neutral-600 text-sm">{photos[idx].name}</span>
            <TrashIcon
              className="w-6 h-6 text-red-500 cursor-pointer"
              onClick={() => handleRemovePhoto(idx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
