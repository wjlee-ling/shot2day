"use client";
import { ImageItem } from "@/lib/types";
import Sidebar from "@/app/components/Sidebar";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export default function Shot() {
  const searchParams = useSearchParams();
  const image: ImageItem = searchParams.get("image")
    ? JSON.parse(searchParams.get("image")!)
    : null;
  // const [imageOrientation, setImageOrientation] = useState<
  //   "landscape" | "portrait"
  // >("landscape");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   const img = new window.Image();
  //   img.onload = () => {
  //     setImageOrientation(img.width > img.height ? "landscape" : "portrait");
  //   };
  //   img.src = image.imageUrl;
  // }, [image]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // ${imageOrientation === "portrait" ? "lg:flex-row-reverse" : ""}
  return (
    <div
      className={`flex flex-col justify-evenly align-middle lg:flex-row h-[calc(98vh-var(--navbar-height))] gap-4 relative`}
    >
      <div className="relative flex-1 min-h-[calc(100vh*2/3)]">
        <Image
          src={image.imageUrl}
          alt={image.text}
          fill
          className="object-contain"
        />
      </div>

      <div
        className={`
        flex flex-col
        lg:max-w-[calc(100vw*2/3)]
        ${isSidebarOpen ? "h-[calc(100vh*2/3)] border-2 border-black rounded-lg" : "h-12"}
        mx-3
        overflow-auto
      `}
      >
        <div className="flex justify-end p-2">
        <button
          onClick={toggleSidebar}
          className="justify-end bg-zinc-800 text-white p-2 rounded-full"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <Minus size={24} /> : <Plus size={24} />}
        </button>
        </div>
        <div
          className={`
          overflow-y-scroll
          ${isSidebarOpen ? "max-h-full" : "max-h-0 lg:max-h-full hidden"}
          transition-all duration-300 ease-in-out
        `}
        >
          <Sidebar imageItem={image} />
        </div>
      </div>
      {/* <div className="border-2 border-black rounded-lg p-2 overflow-y-scroll">
        <Sidebar imageItem={image}/>
      </div> */}
    </div>
  );
}
