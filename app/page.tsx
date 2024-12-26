"use client";

import { useState, useEffect } from "react";
import { ImageBox } from "@/app/components/ImageBox";
import { Modal } from "@/app/components/Modal";
import { Navbar } from "@/app/components/Navbar";
import { ImageItem } from "@/lib/types";
import { supabase } from "@/lib/supabase";

type Params = {
  limit: number;
  offset: number;
  search?: string; // The search string to filter files by.
  sortBy?: object; // The column to sort by. Can be any column inside a FileObject.
};
// const bucketName = "shot2day-image";
const tableName = "shots";

async function getImages(params: Params) {
  // const { data, error } = await supabase.storage
  //   .from(bucketName)
  //   .list("", params);

  const { data, error } = await supabase.from(tableName).select("*");

  if (error) throw error;
  const images = data.map((record) => ({
    id: record.id,
    imageUrl: record.image_url,
    text: record.text,
    createdAt: record.created_at,
    metadata: record.file_metadata,
  }));
  return images;
}

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  // const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const fetchImages = async () => {
    const fetchedImages = await getImages({
      limit: 9,
      offset: 0,
    });
    setImages(fetchedImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {images.length === 0 ? (
          <p className="text-center mt-8">Loading images...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {images.map((image) => (
              <ImageBox
                key={image.id}
                image={image}
                onClick={handleImageClick}
              />
            ))}
          </div>
        )}
        <Modal image={selectedImage} onClose={handleCloseModal} />
      </main>
    </>
  );
}
