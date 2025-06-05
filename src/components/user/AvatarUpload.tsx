"use client";

import React, { useRef } from "react";
import { Input } from "../ui/input";

interface AvatarUploadProps {
  onFileSelected: (fileUrl: string) => void;
}

const AvatarUpload = ({ onFileSelected }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    onFileSelected(objectUrl);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="cursor-pointer text-xs font-medium hover:text-blue-500"
      >
        Upload ảnh
      </button>
      <Input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default AvatarUpload;
