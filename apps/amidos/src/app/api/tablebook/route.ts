import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { time, nums, table, day } = body;
  const tablebook = await db.collection("table").insertOne({
    time,
    nums,
    table,
    day
  });

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" }
  });
}
