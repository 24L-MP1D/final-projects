import bcrypt from "bcrypt";
import { DB } from "../../lib/db";

export async function POST(req: Request) {
    try {
    //const body = await req.json();
    //console.log(body);
    const { firstName, lastName, email, phoneNumber, role, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
        return new Response('Missing fields', { status: 400 });
    }

    var salt = bcrypt.genSaltSync(Number(process.env.saltNumber));
    const hashedPassword = await bcrypt.hash(password, salt);

    await DB.collection('users').insertOne({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        password: hashedPassword,
        profilePicture: '',
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return new Response(null, { status: 201 });
} catch (error) {
    return new Response('Internal server error', { status: 500 });
}
}