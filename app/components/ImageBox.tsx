"use client";

import { ImageItem } from "@/lib/types";
import Image from "next/image";

interface ImageBoxProps {
  image: ImageItem;
  onClick: (image: ImageItem) => void;
}

export function ImageBox({ image, onClick }: ImageBoxProps) {
  return (
    <div
      className="cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white p-2"
      onClick={() => onClick(image)}
    >
      <Image
        src={image.imageUrl}
        alt="image retrieved from a Supabase bucket"
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      {/* <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {image.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{image.description}</p>
      </div> */}
    </div>
  );
}
