import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// if (!supabaseUrl || !supabaseServiceKey) {
//   throw new Error("Supabase URL or Service Key is not defined");
// }

const bucketName = "shot2day-image";
// const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  const { id } = await request.json();

  try {
    // Check if the bucket exists
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) throw listError;

    const bucketExists = buckets.some((bucket) => bucket.name === bucketName);

    if (!bucketExists) {
      throw new Error("Bucket not found");
    }

    // Generate a unique file path
    const path = `${id}`;

    return NextResponse.json({ path });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
