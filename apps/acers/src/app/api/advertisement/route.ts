import { ObjectId } from 'mongodb';
import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    if (!body._id) {
      console.log('No _id provided in request body');
      return new Response(JSON.stringify({ message: '_id is required' }), { status: 400 });
    }

    let adId;
    try {
      adId = new ObjectId(body._id);
    } catch (error) {
      console.error('Invalid ObjectId format:', error);
      return new Response(JSON.stringify({ message: 'Invalid _id format' }), { status: 400 });
    }

    console.log('Searching for advertisement with ObjectId:', adId);

    if (!DB || !DB.collection) {
      console.error('Database connection not available');
      return new Response(JSON.stringify({ message: 'Database connection error' }), { status: 500 });
    }

    const ad = await DB.collection('advertisements').findOne({ _id: adId });

    if (!ad) {
      console.log('Advertisement not found for ObjectId:', adId);
      return new Response(JSON.stringify({ message: 'Advertisement not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(ad), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('Error in POST request:', e);
    return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
  }
}
