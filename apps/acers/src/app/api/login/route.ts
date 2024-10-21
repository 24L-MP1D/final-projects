import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    const user = await DB.collection('users').findOne({ email });

    if (!user) {
        return new Response("Invalid email or password", { status:401 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return new Response('Invalid email or password', { status: 401 });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '3h' });
    return Response.json({ token, user: { userName: user.userName, email: user.email, role: user.role } });
}
