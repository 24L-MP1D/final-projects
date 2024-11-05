import { ObjectId } from 'mongodb';
import { DB } from '../../../lib/db';
import { hideData } from '../handyFunctions';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { tags, categoryid, role } = body;

    // Initialize the query object
    const query: any = {};

    // Handling the 'Free' role case
    if (role) {
      const idList = await DB.collection('tiers').find().toArray();
      const belowList: any[] = [];

      for (const tier of idList) {
        belowList.push(tier._id.toString());
        if (tier.name === role) {
          break; // Exit the loop if the role matches
        }
      }

      console.log('lowList    ', belowList);
      // Correct the $in operator usage
      query.availability = { $in: belowList };
    }

    // Add tags to the query if provided
    if (tags && tags.length > 0) {
      const updatedTags = tags.map((tag: string) => new ObjectId(tag));
      query.tags = { $elemMatch: { $in: updatedTags } }; // Check if any of the tags match
    }

    // Add categoryid to the query if provided
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
