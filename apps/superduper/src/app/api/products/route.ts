import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
type filtType = {
  status?: string;
  startDate?: { $gte: Date };
  endDate?: { $lt: Date };
};

const collection = DB.collection('product');
const ACCESS_TOKEN_SECRET = process.env.ADMIN_ACCESS_TOKEN_SECRET || '';
export async function GET(request: Request) {
  const token = cookies().get('token');

  const { searchParams } = new URL(request.url);
  const stat = searchParams.get('status');
  const dateFrom = searchParams.get('startDate');
  const dateTo = searchParams.get('endDate');

  const filt: filtType = {};

  if (stat) {
    filt.status = stat;
  }

  if (dateFrom && dateTo) {
    filt.startDate = { $gte: new Date(dateFrom) };
    filt.endDate = { $lt: new Date(dateTo) };
  }

  try {
    const result = await collection.find(filt).toArray();
    return Response.json(result);
  } catch (err) {
    console.error(err);
  }
  return Response.json({ message: 'Heelo world!' });
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const { getFromLocal } = newProduct;
    getFromLocal.startDate = new Date(getFromLocal.startDate);
    getFromLocal.endDate = new Date(getFromLocal.endDate);
    getFromLocal.createdAt = new Date();
    const result = await collection.insertOne(getFromLocal);

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to create product!' }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json();
  try {
    await collection.deleteOne({ _id: { $in: ids.map((id: string) => new ObjectId(id)) } });
    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 400 });
  }
}
