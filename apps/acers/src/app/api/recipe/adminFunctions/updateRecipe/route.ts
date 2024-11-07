import { ObjectId } from 'mongodb';
import { DB } from '../../../../lib/db';

export async function PUT(request: Request) {
  const body = await request.json();
  const { _id, updatedFields } = body; // Assuming updatedFields is an object with the fields to update

  try {
    // Validate the ObjectId
    if (!ObjectId.isValid(_id)) {
      return new Response('Invalid recipe ID', { status: 400 });
    }

    // Update the recipe
    const result = await DB.collection('recipes').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedFields } // Use updatedFields to specify which fields to update
    );

    // Check if any document was modified
    if (result.modifiedCount === 0) {
      return new Response('No recipe found or no changes made', { status: 404 });
    }

    return new Response('Recipe updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Internal server error', { status: 500 });
  }
}
