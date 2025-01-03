'use client';

import { useRouter } from 'next/navigation';
import { ImageBox } from "./ImageBox";
import { ImageItem } from "@/lib/types";
import { useState } from 'react';

interface Props {
  initialImages: ImageItem[];
}

export default function ClientSideImageGrid({ initialImages }: Props) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const handleImageClick = (image: ImageItem) => {
    setSelectedImage(image);
    router.push(`/shots/${image.id}`);
  };

  return (
    <>
      {initialImages.length === 0 ? (
        <p className="text-center mt-8">이미지가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {initialImages.map((image) => (
            <ImageBox
              key={image.id}
              image={image}
              onClick={handleImageClick}
            />
          ))}
        </div>
      )}
    </>
  );
}
