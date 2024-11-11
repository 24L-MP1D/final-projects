import { db } from "@/lib/db";

// export async function GET(request: Request) {
//   const Get = await db.collection("tablesDetail").find({ test }).toArray();
//   return Response.json(Get);
// }
export async function POST(request: Request) {
  const body = await request.json();
  const { phonenumber, time, table, day, reservedSeats } = body;
  const tablebook = await db.collection("ReservedTableDetail").insertOne({
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
