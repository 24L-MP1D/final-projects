import bcrypt from "bcrypt";
import { DB } from "../../lib/db";

export async function POST(request: Request) {
    const body = await request.json();
    const { userName, email, phoneNumber, role, password } = body;

    if (!userName || !email || !password) {
        return new Response('Missing fields', { status: 400 });
    }

    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPassword = await bcrypt.hash(password, salt);

    await DB.collection('users').insertOne({
        userName,
        email,
        phoneNumber,
        role,
        password: hashedPassword,
        profilePicture: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return new Response(null, { status: 201 });
}
