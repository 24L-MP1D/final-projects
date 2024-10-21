import { DB } from 'apps/amidos/src/lib/db';

export async function POST(request: Request) {
  const test = await DB.collection('menu').insertOne({});
  new Response('Hello, from API POST!');
}

export async function GET(request: Request) {
  const bodytest = request.body;
  const Get = await DB.collection('menu').find({ bodytest });
  console.log('Get', Get);
  return new Response('Hello, from API GET!');
}

export async function DELETE(request: Request) {
  return new Response('Hello, from API DELETE!');
}

export async function PUT(request: Request) {
  return new Response('Hello, from API PUT!');
}
