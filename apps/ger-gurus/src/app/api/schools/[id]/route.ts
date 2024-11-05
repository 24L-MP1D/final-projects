import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

// export async function GET(request: Request) {
//   const host = new URL(request.url).hostname ;
//  const hostname = host === 'localhost' ? process.env.NAME : host;
//   console.log(hostname)
//   const school = await db.collection('schools').findOne({domain: hostname});
//   return  new Response(JSON.stringify(school), {status: 200})
// }

type Params = Promise<{ id: string }>

export async function GET(request: Request, { params }: { params: Params }) {
  const {id}= await params
  const oneSchool = await db.collection('schools').findOne({ _id: new ObjectId(id) });
  if (!oneSchool) {
    return new Response('Not Found', { status: 404 });
  }
  return Response.json(oneSchool);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const {id}= await params
  const body = await request.json();

  await db.collection('schools').updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: body,
    }
  );
  return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const {id}= await params
  await db.collection('schools').deleteOne({ _id: new ObjectId(id) });
  return new Response(null, { status: 204 });
}
