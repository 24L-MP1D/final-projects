import { DB } from "../../lib/db";

export const GET = async () => {
    try {
        const data = await DB.collection('holidays').find().toArray()
        return new Response(JSON.stringify(data), { status: 200 })

    } catch (e) {
        console.error(e)
        return new Response(JSON.stringify({ error: e || 'An error occurred' }), { status: 500 });
    }
}