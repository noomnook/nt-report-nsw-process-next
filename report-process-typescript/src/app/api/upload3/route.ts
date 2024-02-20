import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response){
    const reqeust = await req.formData();


    return NextResponse.json({
        status: 200,
        message: 'sus'
    })
}