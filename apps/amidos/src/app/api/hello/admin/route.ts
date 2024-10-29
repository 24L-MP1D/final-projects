import { db } from '@/lib/db';
import { algoliasearch } from 'algoliasearch';
import { nanoid } from 'nanoid';
import { type NextRequest } from 'next/server';
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const collection = db.collection('admin');

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('searchvalue');
  try {
    if (query) {
      console.log(query);
      await client.connect();

      const database = client.db('ecommerce');

      const coll = database.collection('admin');

      const data = await collection
        .aggregate([
          {
            $search: {
              index: 'amidos',
              text: {
                query: query,
                path: {
                  wildcard: '*',
                },
              },
            },
          },
        ])
        .toArray();
      console.log(data);
      return Response.json(data);
    } else {
      const dishes = await db.collection('admin').find({}).toArray();
      return Response.json(dishes);
    }
  } catch (error) {
    new Response(null);
  }
}

export async function POST(request: Request) {
  try {
    const client = algoliasearch('MLKXEEH303', '8afc4b223bd36c4137f45360abf5dfb0');
    const id = nanoid();
    console.log(id);
    const body = await request.json();
    const { name, description, ingredients, price, photos } = body;
    await db.collection('admin').insertOne({
      name,
      description,
      ingredients,
      price,
      photos,
      id,
    });
    await client.saveObject({ indexName: 'amidos', body: { name: name, description: description, ingredients: ingredients, price: price, photos: photos, id: id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}
