import jwt from 'jsonwebtoken';
import { DB } from '../../lib/db';

export const POST = async (req:Request) => {
    const JWT_SECRET = process.env.JWT_SECRET || '';

    try{
        const body = await req.json()
        const {recipeId} = body
        const token = req.headers.get('authtoken') || '';
        const decoded = jwt.verify(token, JWT_SECRET)
        const {userId} = decoded as {userId : string}
        const res = await DB.collection('favorites').insertOne({userId, recipeId })
        return  new Response(JSON.stringify({ s: "suxeed"  }), { status: 200 });
    }
    catch(e){
        return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
    }
}