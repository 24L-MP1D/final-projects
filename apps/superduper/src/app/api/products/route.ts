import { DB } from "../../lib/db";



export async function POST(request: Request) {
  try {
    const collection = DB.collection("product");
    const newProduct = await request.json();
    console.log(newProduct)
    const result = await collection.insertOne(newProduct) 
    console.log(result)
    return Response.json(result,{status:200})
  }
  catch (error){
    
    return Response.json({ message: 'Failed to create product!' }, {status:404});
  }
}




