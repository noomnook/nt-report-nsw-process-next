import fs from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData(); ///
  const folderName:string = data.get("folderName") as string;
  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({
      status: 400,
      message: "No File was provided",
    });
  }
  try {
    await createDirectory(folderName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("./assets/" + `${folderName}/`, "", file.name);
    await fs.writeFile(path, buffer);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

const createDirectory = async(folderName:string) => {
  try{
    await fs.mkdir('./assets/' + folderName,{recursive: true});
  } catch(err){
    console.log('createDirectory',err);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}