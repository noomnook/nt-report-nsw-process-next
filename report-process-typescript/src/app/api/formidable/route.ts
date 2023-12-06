import { NextRequest, NextResponse } from "next/server";
import formidable, { errors as FormidableError } from "formidable";
const fs = require('fs');
const path = require('path')

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    console.log("NOT Method POST");
    return;
  }

  console.log("Welcome API POST Method");
  
  try {
    const form = formidable({
      uploadDir: './../../../../assits/uploads/',
      keepExtensions: true,
    });
    form.parse(res, (err, fields, files) => {
      console.log('fields:', fields);
      console.log('files:', files);
    });
  } catch (err: any) {
    if (err.code === FormidableError.maxFieldsExceeded) {
      return Response.json({ name: "Error" });
    }
    return;
  }
};

export async function GET() {
  return Response.json({ name: "GET Method" });
}