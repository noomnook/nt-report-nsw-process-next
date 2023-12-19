import formidable from 'form'

export async function GET() {
    return Response.json({
        name: 'api test'
    })
}