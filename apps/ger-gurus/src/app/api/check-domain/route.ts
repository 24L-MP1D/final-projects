import { db } from "@/lib/db";


export async function POST(request: Request){
    const {domain}= await request.json()

    const oneSchool= await db.collection('schools').findOne({domain: domain})

return Response.json(Boolean(oneSchool));

}