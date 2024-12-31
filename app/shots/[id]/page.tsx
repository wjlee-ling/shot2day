'use client';
import { ImageItem } from "@/lib/types";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'


export default function Shot() {
  const searchParams = useSearchParams();
  const image: ImageItem = searchParams.get('image') ? JSON.parse(searchParams.get('image')!) : null;
  const metadata = image?.metadata;
  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] overflow-hidden">
      <main className="flex-1 flex flex-col">
        {image && (
          <>
            <h1>{image.id}</h1>
            <div className="relative flex-1">
              <Image src={image.imageUrl} alt={image.text} fill style={{ objectFit: 'contain' }} sizes="100vw"/>
            </div>
          </>
        )}
        </main>
    </div>
  )
}
