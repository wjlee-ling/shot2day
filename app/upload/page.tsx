"use client";

import { useState } from "react";
import exifr from "exifr";
import Image from "next/image";
import { BookImage } from "lucide-react";

export default function UploadPage() {
  const [fileMetadata, setFileMetadata] = useState<object | null>(null);
  const [fileMetadataVisible, setFileMetadataVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    }
  };

  const formatValue = (value: any) => {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return value;
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    setFileMetadataVisible(true);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setFileMetadataVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">이미지 업로드</h1>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
        <div className="md:col-span-4 col-span-full ">
          {imageFile ? (
            <div
              className="relative"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded Image"
                width={768}
                height={768}
                className="object-contain rounded-lg "
              />
              {fileMetadata && fileMetadataVisible && (
                <div className="absolute inset-0 p-4 rounded-lg  max-w-[768px] max-h-[768px]">
                  <div className="flex flex-col gap-4 text-lg bg-black/30 text-white ">
                    {Object.entries(fileMetadata).map(([key, value]) =>
                      value ? (
                        <div className="flex items-center px-4 py-2">
                          <div className="w-1/2 ">{key}</div>
                          <div>{formatValue(value)}</div>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer">
              <BookImage className="w-10 h-10 mb-4" />
              <div className="flex">
                <span className="inline-block rounded-md bg-white font-semibold text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500">
                  이미지 선택
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
                <p className="pl-1">또는 드래그하여 파일 업로드</p>
              </div>
            </label>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col">
          <label className="block text-lg/6 font-bold text-gray-900 bg-slack-500">
            title
          </label>
          <div className="mt-2 bg-white rounded-md outline outline-1 -outline-offset-1 focus-within:outline focus-within:outline-slate-400">
            <input
              id="post-title"
              name="post-title"
              type="text"
              className="block min-w-0 w-full grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline sm:text-sm/6"
            />
          </div>
          <label className="block text-lg/6 font-bold text-gray-900 bg-slack-500 mt-4">
            description
          </label>
          <div className="mt-2 bg-white rounded-md outline outline-1 -outline-offset-1 focus-within:outline focus-within:outline-slate-400">
            <input
              id="post-body"
              name="post-body"
              type="text"
              className="block w-full min-w-0 min-h-20 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline sm:text-sm/6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
