'use client';
import { ImageItem } from "@/lib/types";
import Sidebar from "@/app/components/Sidebar";
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'


export default function Shot() {
  const searchParams = useSearchParams();
  const image: ImageItem = searchParams.get('image') ? JSON.parse(searchParams.get('image')!) : null;
  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] overflow-hidden m-4 pb-4">
        {image && (
        <main className="flex-1 flex flex-col-reverse md:flex-row gap-4">
            <div className="border-2 border-black w-1/4">
              <Sidebar imageItem={image} />
            </div>
            <div className="relative flex-1"> {/* `relative` required for the `fill` attr. in the child Image tag */}
              <Image src={image.imageUrl} alt={image.text} fill style={{ objectFit: 'contain' }} sizes="100vw"/>
            </div>
        </main>
        )}
    </div>
  )
}
