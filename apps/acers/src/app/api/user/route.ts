import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        const user = await DB.collection('users').findOne({ _id: userId });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        return Response.json({ user: { userName: user.userName, email: user.email, phoneNumber: user.phoneNumber, role: user.role } });
    } catch (error) {
        return new Response('Invalid token', { status: 403 });
    }
}