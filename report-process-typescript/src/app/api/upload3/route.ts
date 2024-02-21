import { NextResponse } from "next/server"
import fs from 'fs/promises'
import path from 'path';
import * as XLSX from 'xlsx';

export async function POST(req: Request, res: Response){
    try{
        console.log(req);
        const filePath  =  './assits/uploads/Book1.xlsx';
        const data = await fs.readFile(filePath);
        const workbook = XLSX.read(data, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        console.log(json)
    
    } catch(err){
        return NextResponse.json({
            status: 200,
            message: 'sus'
        })
    }
}

export async function GET(req: Request, res: Response){
    const dir =  path.resolve('./assits/uploads' );
    try{
        const filenames = await fs.readdir(dir) ? await fs.readdir(dir) : [];
        const filesDetail = filenames.length > 0 ? await Promise.all(filenames.map(async filename => {
            const filePath = path.join(dir, filename);
            const detail = await fs.stat(filePath);
                return {
                    name: filename,
                    path: filePath,
                    size: detail.size, 
                    modifiedAt: detail.mtime 
                }
            })) : [] ;
        return NextResponse.json({
            status: 200,
            data: filesDetail
        })        
    } catch(err){
        return NextResponse.json({
            status: 500,
            message: 'Internal Server Error'
        })        
    }
}