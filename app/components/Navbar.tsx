"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  const handleUploadImage = () => {
    router.push("/upload");
  };

  return (
    <nav className="bg-gray-800 text-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Shot2Day
        </Link>
        <div className="flex gap-4">
          <button
            onClick={handleUploadImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            이미지 추가
          </button>
        </div>
      </div>
    </nav>
  );
}
