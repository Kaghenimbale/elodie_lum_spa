// app/api/upload-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

// Initialize ImageKit with environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

// Handle POST request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { file, fileName } = body;

    if (!file || !fileName) {
      return NextResponse.json(
        { error: "Missing file or fileName" },
        { status: 400 }
      );
    }

    // Upload base64 image to ImageKit
    const result = await imagekit.upload({
      file, // base64 encoded string (must start with `data:image/...`)
      fileName,
      folder: "/services", // Optional: create folder in ImageKit
      useUniqueFileName: true, // Avoid filename collision
    });

    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (error: any) {
    console.error("ImageKit Upload Error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Image upload failed" },
      { status: 500 }
    );
  }
}
