'use server'

// import { NextResponse } from "next/server"

export async function submitUpload(formData: FormData) {

    console.log(formData);
    
    const res = await fetch('/api/upload2', {
        method: 'POST',
        body: formData
    })

    console.log(res);
    
    
    // return NextResponse.json({
    //     success: true
    // })
}