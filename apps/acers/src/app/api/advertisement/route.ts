// import { DB } from '../../../lib/db';
// import { ObjectId } from 'mongodb';


// export async function POST(request: Request, { params }: { params?: { id: string } }) {
//     try {
//   const body = await request.json();
//   const { images, video, link } = body;
//   const res = await DB.collection('recipes').insertOne({
//     images,
//     video,
//     link,
//     createdAt: Date(),
//     updatedAt: Date(),
//   }); return new Response(JSON.stringify({ res: 'Succeed' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
// } catch (e) {
//   console.error(e);
//   return new Response(JSON.stringify({}), {
//     status: 500,
//     headers: { 'Content-Type': 'application/json' },
//   });
// }

// export async function GET(request: Request, { params }: { params?: { id: string } }) {
//     try {

//     }
// }
