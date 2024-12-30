'use client';
import {Navbar} from '@/app/components/Navbar';
import { useSearchParams } from 'next/navigation'

export default function Shot() {
  const searchParams = useSearchParams();
  const image = searchParams.get('image') ? JSON.parse(searchParams.get('image')!) : null; // 추가된 코드

  return (
    <div>
    <Navbar/>
    <div>
      {image && (
        <div>
          <h1>{image.id}</h1>
          <img src={image.imageUrl} alt={image.text} />
        </div>
      )}
    </div>
    </div>
  )
}
