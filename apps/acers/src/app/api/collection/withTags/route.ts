import { DB } from '../../../lib/db';

export async function GET() {
  try {
    const collectionsRaw = await DB.collection('collections').find().toArray();
    const tags = await DB.collection('tags').find().toArray();

    // Create a dictionary for fast tag lookup by _id
    const tagDictionary = tags.reduce((acc: any, tag) => {
      acc[tag._id.toString()] = tag.tagName; // Convert _id to string for easy comparison
      return acc;
    }, {});

    const collection = collectionsRaw.map((ele) => ele.collection);

    const collectionName = collection.map((idList) => ({
      idList,
      name: idList
        .map((id: string) => tagDictionary[id]) // Look up each id in the tag dictionary
        .filter((name: string | undefined) => name !== undefined), // Remove undefined values
    }));

    return new Response(JSON.stringify(collectionName), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
  }
}
