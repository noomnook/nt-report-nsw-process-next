import formidable from 'formidable'
import { promises as fs } from "fs";
import path from "path";

export async function POST(formData) {
    const commemt = formData.get('myfile');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await new Promise((resolve, reject) => {
        upload_stream({}, function (error, result) {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          })
          .end(buffer);
    })
}


export async function GET() {
    let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };
    const files = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const files = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {

        }).catch(e => {
            console.log(e);
            status = 500;
            resultBody = {
                status: 'fail', message: 'Upload error'
            }
        });
    })

    if (files?.length) {

        /* Create directory for uploads */
        const targetPath = path.join(process.cwd(), `./../../assits/uploads/`);
        try {
            await fs.access(targetPath);
        } catch (e) {
            await fs.mkdir(targetPath);
        }

        /* Move uploaded files to directory */
        for (const file of files) {
            const tempPath = file[1].filepath;
            await fs.rename(tempPath, targetPath + file[1].originalFilename);
        }
    }

    return res.status(status).json(resultBody);
    // return Response.json({
    //     name: 'api test'
    // })
}