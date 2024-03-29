import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import * as XLSX from "xlsx";

export async function POST(req: Request, res: Response) {
    try {
      const request = await req.json();
      if (!request || !request?.path) {
        return NextResponse.json({
          status: 400,
          message: "No path directory provided",
        });
      }    
      const filePath = request?.path;
      const isDirectory = (await fs.stat(filePath)).isDirectory();
      if(isDirectory){
        const fileNames = path.basename(filePath);
        const readFileList = await fs.readdir(filePath);
        if(readFileList.length === 0){
          return NextResponse.json({
            status: 200,
            fileNames: fileNames,
            data: [],
          });
        }
        let dataExceltoJson: any = [];
        await Promise.all(readFileList.map(async (path) => {
          const data = await fs.readFile(filePath + `\\` + path,'binary');
          const workbook = XLSX.read(data, { type: "binary", codepage: 65001 }); //Specify type as binary and codepage as UTF-8
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          dataExceltoJson.push(json);
      }));
        return NextResponse.json({
          status: 200,
          fileNames: fileNames,
          data: dataExceltoJson,
        });
      }else {
        if (!(await fs.readFile(filePath))) {
          return NextResponse.json({
            status: 400,
            message: "No file directory",
          });
        }
        const fileNames = path.basename(filePath);
        const data = await fs.readFile(filePath);
        const workbook = XLSX.read(data, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        return NextResponse.json({
          status: 200,
          fileNames:fileNames,
          data: [json],
        });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }