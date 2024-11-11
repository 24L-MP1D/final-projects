import { ObjectId } from 'mongodb';
import { DB } from '../../../../lib/db';

export async function DELETE(request: Request) {
  const body = await request.json();
  const { _id } = body;

  if (!_id) {
    return new Response(JSON.stringify({ message: 'Recipe ID is required' }), { status: 400 });
  }

  try {
    // Convert the string _id to an ObjectId
    const recipeId = new ObjectId(_id);

    const result = await DB.collection('recipes').deleteOne({ _id: recipeId });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: 'Recipe deleted successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'Recipe not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
