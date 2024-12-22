import { NextRequest, NextResponse } from "next/server";
import { Tags, ExifTool } from "exiftool-vendored";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import os from "os";

// (async () => {
//   try {
//     const version = await exiftool.version();
//     console.log("Exiftool version:", version);
//   } catch (error) {
//     console.error("Error checking exiftool version:", error);
//   }
// })();

const EXIF_TIMEOUT = 30000; // 30 seconds timeout

export async function POST(req: NextRequest) {
  console.log("Received POST request");

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    console.log("No file uploaded");
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  console.log("File received:", file.name, file.type, file.size);

  let tempPath: string | null = null;

  try {
    // Create a temporary file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempPath = join(os.tmpdir(), `upload-${Date.now()}-${file.name}`);
    await writeFile(tempPath, buffer);

    console.log(`Temporary file created at: ${tempPath}`);

    // if (!exiftool) {
    //   return new Response("ExifTool not initialized", { status: 500 });
    // }

    // try {
    //   // Your ExifTool operations here
    //   const result = await exiftool.read(tempPath);
    //   console.log("Exiftool output:", result);
    //   return new Response(JSON.stringify(result), {
    //     headers: { "Content-Type": "application/json" },
    //   });
    // } catch (error) {
    //   console.error("Error processing file:", error);
    //   return new Response("Error processing file", { status: 500 });
    // }

    // Read EXIF data with timeout
    const exiftool = new ExifTool();
    console.log("Reading EXIF data...");
    // const tags = await exiftool.read(tempPath);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("EXIF reading timed out")),
        EXIF_TIMEOUT,
      ),
    );
    const tagsPromise = exiftool.read(tempPath);

    const tags: Tags | null = (await Promise.race([
      tagsPromise,
      timeoutPromise,
    ])) as Tags | null;

    console.log("Exiftool output:", tags);

    if (tags === null) {
      console.log("No metadata found");
      return NextResponse.json({ error: "No metadata found" }, { status: 404 });
    }

    console.log("Sending metadata back to client");
    return NextResponse.json({ newMetadata: tags });
  } catch (error) {
    console.error("Error in exiftool processing:", error);
    return NextResponse.json(
      {
        error: `Failed to read metadata: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      },
      { status: 500 },
    );
  } finally {
    // Clean up the temporary file
    if (tempPath) {
      try {
        await unlink(tempPath);
        console.log(`Temporary file removed: ${tempPath}`);
      } catch (cleanupError) {
        console.error("Error during cleanup:", cleanupError);
      }
    }
    await exiftool.end();
  }
}
