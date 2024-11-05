import { db } from '@/lib/db';
import { ObjectId } from 'mongodb';

type Params = Promise<{ id: string }>

export async function GET(request: Request, { params }: { params: Params }) {
    const {id}= await params
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
        return new Response('Not Found', { status: 404 });
    }
    return Response.json(user);
}

export async function PUT(request: Request, { params }: { params: Params}) {
    const {id}= await params
    const body = await request.json();

    await db.collection('users').updateOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: body,
        }
    );
    return new Response(null, { status: 204 });
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    const {id}= await params
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return new Response(null, { status: 204 });
}
