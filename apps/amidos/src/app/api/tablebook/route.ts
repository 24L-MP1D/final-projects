import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { time, nums, calendar } = body;
  const tablebook = await db.collection("table").insertOne({
    time,
    nums,
    calendar,
    createdAt: new Date()
  });

  return new Response(null, {
    status: 204,
    headers: { "Content-Type": "application/json" }
  });
}
