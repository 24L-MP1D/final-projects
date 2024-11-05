import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const isSpecial = await db.collection('addFood').updateOne(
    {
      _id: new ObjectId(params.id),
    },
    {
      $set: { special: true },
    }
  );

  return Response.json(isSpecial);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isSpecial = await db.collection('addFood').updateOne(
    {
      _id: new ObjectId(params.id),
    },
    {
      $set: { special: false },
    }
  );

  return Response.json(isSpecial);
}
