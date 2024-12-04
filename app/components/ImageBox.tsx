'use client'

import { ImageItem } from 'types/image'
import Image from 'next/image'

interface ImageBoxProps {
  image: ImageItem
  onClick: (image: ImageItem) => void
}

export function ImageBox({image, onClick}: ImageBoxProps) {
  return (
    <div className="cursor-pointer border rounded-lg overflow-hidden shadow-md hover:shadow-lg  transition-shadow duration-300 bg-card"
      onClick={() => onClick(image)}
    >
      <Image
        src={image.imageUrl}
        alt={image.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-card-foreground">{image.title}</h3>
        <p className="text-muted-foreground line-clamp-3">{image.description} </p>
      </div>
    </div>
  )
}