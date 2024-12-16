import { ImageItem } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const storageBucketName: string = "shot2day-images";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getOrCreateStorageBucket(): Promise<
  StorageBucket | StorageError
> {
  // https://supabase.com/docs/reference/javascript/storage-listbuckets
  const bucket = await supabase.storage.getBucket(storageBucketName);
  if (bucket.error && bucket.error.message.includes("does not exist")) {
    const { data, error } = await supabase.storage.createBucket(
      storageBucketName,
      {
        public: false,
        allowedMimeTypes: ["image/*"],
      },
    );
    if (error) throw error;
    return data;
  } else if (bucket.error) {
    throw bucket.error;
  }
  return bucket.data;
}

export async function getAllImagesFromSupabase(): Promise<ImageItem[]> {
  const { data, error } = await supabase.from("ricoh").select("*");

  if (error) {
    throw error;
    return [];
  }

  return data || [];
}

export async function uploadImageToBucket(
  file: File,
  title: string,
  description: string,
  metadata: object,
): Promise<null | void> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${title}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(storageBucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error inserting image data:", error);
    return null;
  }
  console.log(data);
  return;
}
