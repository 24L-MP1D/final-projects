import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';

type filtType = {
  status?: string;
  startDate?: { $gte: Date };
  endDate?: { $lt: Date };
  category?: string;
};

const collection = DB.collection('product');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stat = searchParams.get('status');
  const dateFrom = searchParams.get('startDate');
  const dateTo = searchParams.get('endDate');
  const category = searchParams.get('category');
  const filt: filtType = {};
  if (stat) {
    filt.status = stat;
  }
  if (category) filt.category = category;
  if (dateFrom && dateTo) {
    filt.startDate = { $gte: new Date(dateFrom) };
    filt.endDate = { $lt: new Date(dateTo) };
  }

  try {
    const result = await collection.find(filt).toArray();
    return Response.json(result);
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json();
    const { getFromLocal, userId } = newProduct;
    getFromLocal.userId = new ObjectId(String(userId));
    getFromLocal.startDate = new Date(getFromLocal.startDate);
    getFromLocal.endDate = new Date(getFromLocal.endDate);
    getFromLocal.createdAt = new Date();
    const result = await collection.insertOne(getFromLocal);
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to create product!' }, { status: 404 });
  }
}

export async function PUT(request: Request) {
  try {
    const product: any = {};

    const body = await request.json();

    const { searchValue, status, userId, page, limit, categoryId } = body;

    if (categoryId) product.categoryId = categoryId;
    console.log(categoryId);
    if (status) product.status = 'Accept';
    if (userId) product.userId = new ObjectId(String(userId));
    if (searchValue) {
      product.$or = [
        { category: { $regex: searchValue, $options: 'i' } },
        { countryOfOrigin: { $regex: searchValue, $options: 'i' } },
        { productName: { $regex: searchValue, $options: 'i' } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$startBid' },
              regex: searchValue,
            },
          },
        },
      ];
    }

    const products = await collection.find(product, { limit: page * limit }).toArray();

    return Response.json(products);
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
