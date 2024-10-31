import checkAdmin from '../user/adminFunctions/middleware/checkAdmin';

export async function GET(request: Request) {
  checkAdmin(request);
  return new Response('Hello, from API!');
}
