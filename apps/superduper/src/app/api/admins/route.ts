import { DB } from "../../lib/db";

export async function GET(request: Request) {
  try {
    const collection = DB.collection('productApproveRequest');
    const approve = await collection.find({}).toArray();
    return Response.json(approve)
  } catch (err) {
    console.error(err)
  }
  return Response.json({ message: 'approved' });
}

export async function POST(request: Request) {
  try {
    const collection = DB.collection("productApproveRequest");
    const approveApproveProduct = await request.json();
    console.log(approveApproveProduct)
    const approve = await collection.insertOne(approveApproveProduct) 
    console.log(approve)
    return Response.json(approve,{status:200})
  }
  catch (error){
    
    return Response.json({ message: 'Failed to approve the product!' }, {status:404});
  }
}




