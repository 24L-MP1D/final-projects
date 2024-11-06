import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phonenumber, time, table, day, reservedSeats } = body;
  const tablebook = await db.collection("ReservedTableDetail").insertOne({
    name,
    phonenumber,
    time,
    table,
    day,
    reservedSeats
  });

  return new Response(null, {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
