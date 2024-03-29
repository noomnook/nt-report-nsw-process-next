import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData(); ///
  const folderName: string = data.get("folderName") as string;
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({
      status: 400,
      message: "No File was provided",
    });
  }
  try {
    if(folderName === '0'){
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("./assets/", file.name);
      await fs.writeFile(path, buffer);
      return NextResponse.json({ success: true });
    }
    let check = await checkDirectory(folderName);
    if (check) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join("./assets/" + `${folderName}/`, "", file.name);
      await fs.writeFile(path, buffer);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        status: 500,
        message: "No File Path Provided",
      });
    }
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const checkDirectory = async (folderName: string) => {
  try {
    const fullPath = path.resolve("./assets", folderName);
    const stats = await fs.stat(fullPath);
    return stats.isDirectory();
  } catch (err) {
    console.log("Error Directory", err);
    return false;
  }
};
