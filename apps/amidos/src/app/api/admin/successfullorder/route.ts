import { db } from '@/lib/db';
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const collection = db.collection('admin');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, phonenumber, order, totalprice, otp, id } = body;
    await db.collection('successfullorder').insertOne({
      address,
      phonenumber,
      order,
      totalprice,
      otp,
      id,
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}

export async function GET(request: Request) {
  try {
    const successfullorder = await db.collection('successfullorder').find({}).toArray();
    return Response.json(successfullorder);
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, deliveryperson } = body;
    const successfullorder = await db.collection('successfullorder').updateOne({ id }, { $set: { deliveryperson } });
    return new Response('Successfully updated deliveryperson', { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}
