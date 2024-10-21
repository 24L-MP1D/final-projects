import { DB } from "../../lib/db";

export async function POST(request: Request) {
  try {
    const collection = DB.collection("categories");
    const addCategory = await request.json();
    console.log(addCategory)
    const approvedCategory = await collection.insertOne(addCategory) 
    console.log(approvedCategory)
    return Response.json(approvedCategory,{status:201})
  }
  catch (error){
    return Response.json({ message: 'Failed to add category of product!' }, {status:404});
  }
}