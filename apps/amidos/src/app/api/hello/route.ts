export async function GET(request: Request) {
  return new Response('Hello, from API!');
}

export async function POST(request: Request) {
  return new Response('Hello, from API POST!');
}

export async function DELETE(request: Request) {
  return new Response('Hello, from API DELETE!');
}

export async function PUT(request: Request) {
  return new Response('Hello, from API PUT!');
}
