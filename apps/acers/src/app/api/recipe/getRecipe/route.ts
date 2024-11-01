import { DB } from '../../../lib/db';
import { hideData } from '../trending/route';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { tags, categoryid } = body;

    const query: any = {};

    if (tags) {
      query.tags = { $in: tags };
    }

    if (categoryid) {
      query.categoryid = categoryid;
    }

    const res = await DB.collection('recipes').find(query).toArray();
    const hiddenData = hideData(res);

    return new Response(JSON.stringify({ success: true, hiddenData }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'An error occurred' }), { status: 500 });
  }
}
