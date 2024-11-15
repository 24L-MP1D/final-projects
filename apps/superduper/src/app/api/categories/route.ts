import { DB } from '@/lib/db';
import express from 'express';

const app = express();
let db;

export async function POST(request: Request) {
  try {
    const collection = await DB.collection('categories');
    const category = await request.json();

    const result = await collection.insertOne(category);
    return new Response(null, { status: 201 });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
const collection = DB.collection('categories');

// export async function POST(request: Request) {
//   try {
//     const category = await request.json();
//     console.log(category)
//     const result = await collection.insertOne({ category });
//     return new Response(null, { status: 201 })
//   } catch (err) {
//     return new Response(null, { status: 404 })
//   }
// }
// export async function GET(request: Request) {
//   try {
//     const categories = await collection.find({}).toArray()
//     return Response.json(categories)
//   } catch (err) {
//     return Response.json({ message: "categories deer aldaa garlaa" })

//   }
// }

// app.get('/categories', (req, res) => {
//   let category: never[] = []

//   DB.collection('categories')
//     .find()
//     .sort({category: 1})
//     .forEach(categories => categories.push(categories))
//     .then(() => {
//       res.status(200).json(category)
//     })
//     .catch(() => {
//       res.status(500).json({error: 'could not fetch the categories'})
//     })
//   })
// function express() {
//   throw new Error('Function not implemented.');
// }

export async function GET(request: Request) {
  try {
    const collection = DB.collection('categories');

    const result = await collection
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'category',
            as: 'categoryInfo',
          },
        },
        {
          $lookup: {
            from: 'product',
            localField: 'productId',
            foreignField: 'category',
            as: 'productInfo',
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();
    return Response.json(result);
  } catch (err) {
    return Response.json({ message: err });
  }
}
