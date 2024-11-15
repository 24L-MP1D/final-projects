import { db } from '@/lib/db';

function toObject(obj: Object) {
  return JSON.parse(
    JSON.stringify(
      obj,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )
  );
}
type Params = Promise<{ schoolId: string }>;
export async function GET(request: Request, { params }: { params: Params }) {
  const { schoolId } = await params;

  const oneCourse = await db.collection('courses').find({ schoolId: schoolId });
  const obj = await oneCourse.toArray();
  if (!obj) {
    return new Response('Not Found', { status: 404 });
  }
  const newObj = toObject(obj);

  return Response.json(newObj);
}
