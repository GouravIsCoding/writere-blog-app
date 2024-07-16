import { uploadToCloudinary } from "@/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const fileBuffer = await file.arrayBuffer();

    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const res: any = await uploadToCloudinary(fileUri, file.name);

    if (res?.success && res?.result) {
      return NextResponse.json({
        message: "success",
        secure_url: res.result.secure_url,
      });
    } else return NextResponse.json({ message: "failure" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: "failure" }, { status: 400 });
  }
}
