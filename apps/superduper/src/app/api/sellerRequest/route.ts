import { DB } from '@/lib/db'; // import the database connection

export async function GET(request: Request) {
  try {
    const collection = DB.collection('approvedlists');
    const approve = await collection.find({}).toArray();
    return Response.json(approve);
  } catch (err) {
    console.error(err);
  }
  return Response.json({ message: 'approved' });
}

export async function POST(request: Request) {
  try {
    const collection = DB.collection('approvedlists');
    const approvedProducts = await request.json();
    console.log(approvedProducts);
    const approve = await collection.insertOne(approvedProducts);
    console.log(approve);
    return Response.json(approve, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to approve the product!' }, { status: 404 });
  }
}