import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { errors as FormidableError } from "formidable";
// import express from "express";
const fs = require('fs');
const path = require('path')
// import { parseForm, FormidableError } from "./../../../../lib/parse-form";

// const app = express();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  try {
    const form = formidable({
      uploadDir: './../../../../assits/uploads/',
      keepExtensions: true,
    });
    form.parse(req, (err, fields, files) => {
      console.log('fields:', fields);
      console.log('files:', files);
    });
  } catch (err: any) {
    if (err.code === FormidableError.maxFieldsExceeded) {
      return NextResponse.json({ name: "Error" });
    }
    return;
  }
};
