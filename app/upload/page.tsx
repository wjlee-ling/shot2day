"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import exifr from "exifr";
import Image from "next/image";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<object | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setImageFile(file); // Store the uploaded file
    try {
      const newMetadata = await exifr.parse(file);
      setFileMetadata({
        contrast: newMetadata.Contrast,
        createDate: newMetadata.CreateDate,
        exifImageWidth: newMetadata.ExifImageWidth,
        exifImageHeight: newMetadata.ExifImageHeight,
        exposureMode: newMetadata.ExposureMode,
        exposureTime: newMetadata.ExposureTime,
        fNumber: newMetadata.FNumber,
        focalLength: newMetadata.FocalLength,
        focalLengthIn35mmFormat: newMetadata.FocalLengthIn35mmFormat,
        ISO: newMetadata.ISO,
        Model: newMetadata.Model,
        orientation: newMetadata.Orientation,
        saturation: newMetadata.Saturation,
        sharpness: newMetadata.Sharpness,
        whiteBalance: newMetadata.WhiteBalance,
      });
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: any) => {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return value;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">이미지 업로드</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {imageFile && (
          <div className="flex-1 mb-6">
            <Image
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded Image"
              width={400}
              height={300}
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1">
          {fileMetadata ? (
            <Card className="bg-gray-100 mb-6">
              <div className="flex flex-col gap-4 p-4">
                {Object.entries(fileMetadata).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <div className="bg-orange-500 text-white rounded-l-md px-4 py-2">
                      {key}
                    </div>
                    <div className="bg-gray-200 rounded-r-md px-4 py-2 flex-1">
                      {formatValue(value)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {loading ? "업로드 중..." : "이미지 선택"}
              </label>
              <p className="mt-2 text-sm text-muted-foreground">
                또는 이미지를 여기에 드래그하여 놓으세요
              </p>
            </div>
          )}
          <div className="mt-4">
            <input
              type="text"
              placeholder="제목 입력"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
            />
            <textarea
              placeholder="설명 입력"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full mb-4"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
