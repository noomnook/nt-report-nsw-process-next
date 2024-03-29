import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import * as XLSX from "xlsx";
import { existsSync } from "fs";

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
        const data = await fs.readFile(filePath + `\\` + path);
        const workbook = XLSX.read(data, { type: "buffer" });
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

export async function DELETE(req: Request, res: Response) {
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
      if((await fs.readdir(filePath)).length > 0){
        return NextResponse.json({
          status: 400,
          message: "Delete All Files in Directory First",
        });
      }
      await fs.rmdir(filePath);
      return NextResponse.json({
        status: 200,
        message: "Delete Completed",
      });
    }else {
      if (!(await fs.readFile(filePath))) {
        return NextResponse.json({
          status: 400,
          message: "No file directory",
        });
      }
      await fs.unlink(filePath);
      return NextResponse.json({
        status: 200,
        message: "Delete Completed",
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

export async function GET(req: Request, res: Response) {
  const dir = path.resolve("./assets/uploads");
  try {
    if (!existsSync("./assets")) {
      fs.mkdir("./assets", { recursive: true });
    }
    const folderList = await fs.readdir(path.resolve("./assets"));
    const resultData = await Promise.all(
      folderList.map(async (data) => {
        const fullPath = path.resolve("./assets", data);
        const stats = await fs.stat(fullPath);
        if (!stats.isDirectory()) {
          return {
            name: data,
            isFolder: false,
            path: fullPath,
            subFolder: [],
          };
        } else {
          return {
            name: data,
            isFolder: true,
            path: fullPath,
            subFolder: (await fs.readdir(path.resolve("./assets/" + data))).map((subFolder) => {
              return {
                name: subFolder,
                path: fullPath +'\\'+ subFolder,
              };
            }),
          };
        }
      })
    );
    return NextResponse.json({
      status: 200,
      data: resultData,
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
