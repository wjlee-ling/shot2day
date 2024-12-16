"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookmarkPlus } from "lucide-react";
import { v4 } from "uuid";

export function Navbar() {
  const router = useRouter();

  const handleUploadImage = () => {
    const uniqueId = v4();
    router.push(`/upload/${uniqueId}`);
  };

  return (
    <nav className="bg-gray-800 text-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Shot2Day
        </Link>
        <div className="gap-4">
          <button
            onClick={handleUploadImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <BookmarkPlus />
            New Shot
          </button>
        </div>
      </div>
    </nav>
  );
}
