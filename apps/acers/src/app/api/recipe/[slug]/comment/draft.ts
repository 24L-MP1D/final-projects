// export async function POST(request: Request, { params }: { params: { title: string } }) {
//   const { title } = params;

//   try {
//     const body = await request.json();
//     console.log(body); // Log to see the parsed body

//     const { comment, userId, firstName, recipeId } = body; // Change _id to recipeId

//     if (!comment || !userId || !recipeId) {
//       return new Response('Missing required fields (comment, userId, recipeId)', { status: 400 });
//     }

//     const recipeObjectId = new ObjectId(recipeId);

//     const recipe = await DB.collection('recipes').findOne({ _id: recipeObjectId });
//     if (!recipe) {
//       return new Response('Recipe not found', { status: 404 });
//     }

//     const newComment = {
//       recipeId: recipeObjectId,
//       userId,
//       firstName: firstName || 'Anonymous',
//       comment,
//       createdAt: new Date(),
//     };

//     const result = await DB.collection('comments').insertOne(newComment);

//     const responseComment = {
//       ...newComment,
//       _id: result.insertedId.toString(),
//       recipeId: recipeObjectId.toString(),
//     };

//     const channel = ably.channels.get(`recipe-${title}-comments`);
//     channel.publish('new-comment', newComment);

//     return new Response(JSON.stringify({ success: true, comment: responseComment }), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error posting comment:', error);
//     return new Response('Internal server error', { status: 500 });
//   }
// }
