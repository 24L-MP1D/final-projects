import { DB } from '../../lib/db';

export const GET = async () => {
  try {
    const res = await DB.collection('tiers').find().toArray();
    return Response.json(res);
  } catch (e: any) {
    console.error(e);
    return Response.json([]);
  }
};
