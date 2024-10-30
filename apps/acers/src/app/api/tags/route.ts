import { DB } from '../../lib/db';

export async function GET() {
  try {
    const data = await DB.collection('tags').find().toArray(); // Call toArray as a function
    return Response.json(data); // Use return to send the response
  } catch (e: any) {
    console.error(e);
    return Response.json([]); // Send a structured error message
  }
}
