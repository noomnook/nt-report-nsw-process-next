import formidable from 'formidable'
import { NextResponse } from 'next/server';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export async function POST(req, res, next) {
    console.log(JSON.stringify(req.body));
    const data = await req.body;
    console.log('body>>>> ', data);
    const file = data.get('myfile')

    if (!file) {
        console.log('!file exit');
        return NextResponse.json({ success: false })
    }

    const form = formidable({});
    form.uploadDir = "./../../../assits/uploads/";
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(err, fields, files);
        if (err) {
            console.log('Error >>>>>>>>>>>>>>>>>>>>>>>>>');
            next(err);
            return;
        }
        console.log('Response >>>>>>>>>>>>>>>>>>>>');
        return NextResponse.json({ fields, files })
    })
}

export async function GET() {
    return NextResponse.json({ text: 'GET```` Method' })
}