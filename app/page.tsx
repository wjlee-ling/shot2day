"use client";

import { useState, useEffect } from "react";
import { ImageBox } from "@/app/components/ImageBox";
import { Modal } from "@/app/components/Modal";
import { ImageItem } from "@/app/types/image";

async function getImages(): Promise<ImageItem[]> {
  const { images } = await import("@/lib/images");
  return images;
}

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    const fetchedImages = await getImages();
    setImages(fetchedImages);
    setLoading(false);
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
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Shot2Day
      </h1>
      {loading ? (
        <p className="text-center mt-8">Loading images...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {images.map((image) => (
            <ImageBox key={image.id} image={image} onClick={handleImageClick} />
          ))}
        </div>
      )}
      <Modal image={selectedImage} onClose={handleCloseModal} />
    </main>
  );
}
