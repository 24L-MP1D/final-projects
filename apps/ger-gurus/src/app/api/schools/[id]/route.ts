import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

// export async function findSchoolId(request: Request) {
//   const host = new URL(request.url).hostname ;
//  const hostname = host === 'localhost' ? process.env.NAME : host;
//   const school = await db.collection('schools').findOne({domain: hostname});
//   if (!school){
//     throw new Error (`School not found for domain : ${hostname}`)
//   }
//   return school?._id
// }
type Params = Promise<{ id: string }>
export async function GET(request: Request, { params }: { params: Params }) {
  const {id}=await params
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
