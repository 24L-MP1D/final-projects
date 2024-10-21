import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { DB } from '../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        if (userId !== params.id) {
            return new Response('Forbidden', { status: 403 });
        }
        var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
        const body = await request.json();
        const { userName, phoneNumber, role, password } = body;

        const updateData: any = {
            userName,
            phoneNumber,
            role,
            updatedAt: new Date(),
        };
        if (password) {
            updateData.password = await bcrypt.hash(password, salt);
        }
        await DB.collection('users').updateOne({ _id: userId }, { $set: updateData });
        return new Response(null, { status: 204 });
} catch (error) {
    return new Response('Invalid token', { status: 403 });
}
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        if (userId !== params.id) {
            return new Response('Forbidden', { status: 403 });
        }
        await DB.collection('users').deleteOne({ _id: userId });

        return new Response(null, { status: 204 });
    } catch (error) {
        return new Response('Invalid token', { status: 403 });
    }
}