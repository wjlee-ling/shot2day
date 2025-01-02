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

    // <div className="flex flex-col md:flex-row h-[calc(100vh-var(--navbar-height))] overflow-hidden">
    //     {image && (
    //     <main className="flex-1 flex flex-col-reverse md:flex-row gap-4">
    //         <div className="border-2 border-black w-1/4">
    //           <Sidebar imageItem={image} />
    //         </div>
    //         <div className="relative flex-1"> {/* `relative`, `absolute` or `fixed` required for the `fill` attr. in the child Image tag */}
    //           <Image src={image.imageUrl} alt={image.text} fill style={{ objectFit: 'contain' }} sizes="100vw"/>
    //         </div>
    //     </main>
    //     )}
    // </div>
  )

  // const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait'>('landscape')
  // const imageUrl = image ? image.imageUrl : "";


  // useEffect(() => {
  //   const img = new window.Image()
  //   img.onload = () => {
  //     setImageOrientation(img.width > img.height ? 'landscape' : 'portrait')
  //   }
  //   img.src = imageUrl
  // }, [imageUrl])
  
  // return (
  //   <div className="flex flex-col md:flex-row gap-8">
  //     <div className={`relative flex-grow ${
  //       imageOrientation === 'landscape' 
  //         ? 'md:w-2/3 lg:w-3/4' 
  //         : 'md:w-1/2 lg:w-2/3'
  //     }`}>
  //       <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-zinc-900">
  //         <Image
  //           src={imageUrl}
  //           alt="Photo detail"
  //           fill
  //           className="object-contain"
  //           sizes={imageOrientation === 'landscape' 
  //             ? "(max-width: 768px) 100vw, 75vw"
  //             : "(max-width: 768px) 100vw, 66.67vw"
  //           }
  //           priority
  //         />
  //       </div>
  //     </div>
  //     <div className={`md:w-1/3 lg:w-1/4 ${
  //       imageOrientation === 'landscape'
  //         ? ''
  //         : 'md:w-1/2 lg:w-1/3'
  //     }`}>
  //       <div className="space-y-4 rounded-lg bg-zinc-900 p-6">
  //         <h1 className="text-xl font-semibold text-white">Image Title</h1>
  //         <div className="space-y-2 text-sm text-zinc-400">
  //           <div className="grid grid-cols-2 gap-x-4">
  //             <div className="font-medium">Date</div>
  //             <div>2024.10.11</div>
  //             <div className="font-medium">Camera</div>
  //             <div>RICOH GR III</div>
  //             <div className="font-medium">Focal Length</div>
  //             <div>18.3mm</div>
  //             <div className="font-medium">ISO</div>
  //             <div>800</div>
  //             <div className="font-medium">Exposure</div>
  //             <div>1/4000</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
