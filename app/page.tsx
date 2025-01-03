import ClientGallery from "@/app/components/ClientGallery";
import { supabase } from "@/lib/supabase";

type Params = {
  limit: number;
  offset: number;
  search?: string; // The search string to filter files by.
  sortBy?: object; // The column to sort by. Can be any column inside a FileObject.
};
const tableName = "shots";

async function getImages(params: Params) {
  const { data, error } = await supabase.from(tableName).select("*");

  if (error) throw error;
  const images = data.map((record) => ({
    id: record.id,
    imageUrl: record.image_url,
    text: record.text,
    createdAt: record.created_at,
    metadata: record.file_metadata,
  }));
  return images;
}

export default async function Home() {

  const fetchedImages = await getImages({
    limit: 5,
    offset: 0,
  });


  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <ClientGallery initialImages={fetchedImages} />
      </main>
    </>
  );
}
