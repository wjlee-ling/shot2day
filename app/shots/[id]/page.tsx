'use client';
import { ImageItem } from "@/lib/types";
import Sidebar from "@/app/components/Sidebar";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Shot() {
  const searchParams = useSearchParams();
  const image: ImageItem = searchParams.get('image') ? JSON.parse(searchParams.get('image')!) : null
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait'>('landscape')
  
  useEffect(() => {
    const img = new window.Image()
    img.onload = () => {
      setImageOrientation(img.width > img.height ? 'landscape' : 'portrait')
    }
    img.src = image.imageUrl
  }, [image])

  return (
    <div className={`flex flex-col ${imageOrientation==='portrait'? 'lg:flex-row-reverse': ''} h-[calc(100vh-var(--navbar-height))] overflow-hidden gap-4`}>
      <div className="relative flex-1 min-h-[calc(100vh*2/3)]">
        <Image src={image.imageUrl} alt={image.text} fill className="object-contain" />
      </div>
      <div className="border-2 border-black rounded-lg p-2 overflow-y-scroll">
        <Sidebar imageItem={image}/>
      </div>
    </div>
  )
}
