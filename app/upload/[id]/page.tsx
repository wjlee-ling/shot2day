"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { BookImage } from "lucide-react";
import { v4 } from "uuid";

export default function UploadPage() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const bucketName = "shot2day-image";
  const tableName = "shots";
  const [fileMetadata, setFileMetadata] = useState<object | null>(null);
  const [fileMetadataVisible, setFileMetadataVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [text, setText] = useState("");
  // const [description, setDescription] = useState("");

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file); // Store the uploaded file
    setImageSrc(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("id", id);

    try {
      const response = await fetch("http://localhost:3001/api/exif", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to read metadata");
      }

      const newMetadata = await response.json();

      setFileMetadata(newMetadata);
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

  const updateBucket = async ({ path, file }: { path: string; file: File }) => {
    // sync bucket w/ image
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path, file);

    if (error) throw error;
  };

  const updateTable = async ({
    id,
    text,
    metadata,
    imageUrl,
  }: {
    id: string;
    text: string;
    metadata: object | null;
    imageUrl: string;
  }) => {
    // sync table w/ metadata and post text
    const { error } = await supabase.from(tableName).insert({
      id: id,
      text: text,
      file_metadata: metadata,
      image_url: imageUrl,
    });
    if (error) throw error;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !text) return;

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to get/create bucket");
      }

      const { path } = await response.json();
      const url = supabase.storage.from(bucketName).getPublicUrl(path)
        .data.publicUrl;
      updateBucket({ path, file: imageFile });
      updateTable({ id, text, metadata: fileMetadata, imageUrl: url });
      alert("Uploaded successfully");

      setImageFile(null);
      setText("");

      const uniqueId = v4();
      router.push(`/upload/${uniqueId}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">이미지 업로드</h1>
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
        <div className="md:col-span-4 col-span-full">
          {imageFile ? (
            <div
              className="relative"
              style={{ width: "100%", height: "auto" }}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <Image
                src={imageSrc}
                alt="Uploaded Image"
                layout="responsive"
                width={16}
                height={9}
                className="object-contain rounded-lg object-top"
              />
              {fileMetadata && fileMetadataVisible && (
                <div className="absolute inset-0 p-4 rounded-lg overflow-auto">
                  <div
                    className={`flex flex-col gap-4 text-lg bg-black/50 text-white`}
                  >
                    {Object.entries(fileMetadata).map(([key, value]) =>
                      value && typeof value !== "object" ? (
                        // TODO: value가 object인 경우 처리
                        <div key={key} className="flex items-center px-4 py-2">
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
            post
          </label>
          <div className="mt-2 bg-white rounded-md outline outline-1 -outline-offset-1 focus-within:outline focus-within:outline-slate-400">
            <input
              id="post-text"
              name="post-text"
              type="text"
              className="block min-w-0 w-full grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline sm:text-sm/6"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          {/* <label className="block text-lg/6 font-bold text-gray-900 bg-slack-500 mt-4">
            description
          </label>
          <div className="mt-2 bg-white rounded-md outline outline-1 -outline-offset-1 focus-within:outline focus-within:outline-slate-400">
            <input
              id="post-body"
              name="post-body"
              type="text"
              className="block w-full min-w-0 min-h-20 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline sm:text-sm/6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}
          <button onClick={handleUpload}>업로드</button>
        </div>
      </div>
    </div>
  );
}
