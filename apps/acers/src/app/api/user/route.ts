import { DB } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const res = await DB.collection('Users').insertOne({ name: 'Zolo', age: 20 });
    return res;
  } catch (e) {
    return e;
  }
}
