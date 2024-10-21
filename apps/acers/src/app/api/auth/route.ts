import bcrypt from "bcrypt";
import "dotenv/config";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DB } from '../../lib/db';

export async function GET(request: Request) {
    const users = await DB.collection('users').find({}).sort({ metacritic: -1 }).toArray();
    return Response.json(users);
}

export async function POST(request: Request) {
    const {userName, email} = body;
    const users = await DB.collection('users').insertOne({
        userName, 
        email
    });
    return Response.json(users);
}

const SALT_SECRET = process.env.SALT_SECRET || "";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

const register = async (req: Request, res: Response) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) return res.sendStatus(400);

        const hashedPassword = await bcrypt.hash(String(password), Number(SALT_SECRET));

        await UserModel.create({
            email,
            password: hashedPassword,
        })
        res.send("Successfully registered");
    } catch (error) {
        res.sendStatus(401);
    }
}
const login = async (req:Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).send("User does not exist");

        const isEqual = await bcrypt.compare(String(password), user.password)

        if (isEqual) {
            const accessToken = jwt.sign(
                { userId: user._id, email },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "12h",
                }
            );
            return res.send({
                accessToken,
            }); 
        }
        res.status(401).send("Password is incorrect");
    } catch (error) {
        res.sendStatus(401);
    }
}

export { login, register };
