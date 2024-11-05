import { DB } from '../../../lib/db'; // Ensure the DB connection is properly set up
import { hideData } from '../handyFunctions'; // Your utility function for hiding sensitive data

export async function GET(request: Request) {
  try {
    // Use the URL constructor to extract query parameters
    const url = new URL(request.url); // Create a URL object from the request URL
    const number = Number(url.searchParams.get('number')) || 10; // Default to 10 if not provided

    // Fetch recipes from the database, sorted by visits
    const data = await DB.collection('recipes').find().sort({ visits: -1 }).limit(number).toArray();

    // Return the data, potentially with sensitive fields hidden
    return new Response(JSON.stringify(hideData(data)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Error fetching recipes:', e);
    return new Response(JSON.stringify({ error: 'Error fetching recipes', details: e }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
