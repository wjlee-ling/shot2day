"use client";

import { useState, useEffect } from "react";
import { ImageBox } from "@/app/components/ImageBox";
import { Navbar } from "@/app/components/Navbar";
import { ImageItem } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import Link from 'next/link';

type Params = {
  limit: number;
  offset: number;
  search?: string; // The search string to filter files by.
  sortBy?: object; // The column to sort by. Can be any column inside a FileObject.
};
const tableName = "shots";

async function getImages(params: Params) {
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
  // const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

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
    // setSelectedImage(image);
    // router.push(`/shots/${image.id}`);
    console.log('item')
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {images.length === 0 ? (
          <p className="text-center mt-8">Loading images...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
            {images.map((image) => (
              <Link href={{
                pathname: `/shots/${image.id}`,
                query: { image: JSON.stringify(image) }
              }} key={image.id}>
                <ImageBox
                  image={image}
                  onClick={handleImageClick}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
