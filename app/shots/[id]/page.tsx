"use client";
import Sidebar from "@/app/components/Sidebar";
import { supabase } from "@/lib/supabase";
import { ImageItem } from "@/lib/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Plus, Minus } from "lucide-react";

export default function Shot() {
  const pathname = usePathname();
  const img_id = pathname.split("/").pop();
  const [image, setImage] = useState<ImageItem>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchRecord = async () => {
    const { data, error } = await supabase
      .from("shots")
      .select("*")
      .eq("id", img_id)
      .single();
    if (error) throw error;
    setImage({
      id: data.id,
      text: data.text,
      imageUrl: data.image_url,
      createdAt: data.created_at,
      metadata: data.file_metadata,
    });
    console.log(data);
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <>
      {image ? (
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
                className="bg-zinc-800 text-white p-2 rounded-full"
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
