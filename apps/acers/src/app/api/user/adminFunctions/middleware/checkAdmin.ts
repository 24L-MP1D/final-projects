// export default async function checkAdmin(Request) {
//   const authToken = Request.headers.get('authtoken');

//   console.log(authToken);
// }

// export default async function checkAdmin(Request) {
//     // Log all headers
//     console.log(Request.headers);

//     // Retrieve the authtoken from the headers
//     const authToken = Request.headers.get('authtoken');

//     if (!authToken) {
//       console.log('No auth token provided');
//       return null; // Handle missing token as needed
//     }

//     console.log('Auth Token:', authToken);

//     // Continue with your logic to check if the user is an admin
//     // For example, you can decode the token or check against a database
//     return authToken; // Or any other logic you need
//   }

import jwt from 'jsonwebtoken';

export default async function checkAdmin(request: Request) {
  const authToken = request.headers.get('authtoken');

  if (!authToken) {
    console.log('No auth token provided');
    return null; // Handle missing token
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET || 'your_secret_key'); // Verify token using your secret
 

    console.log('User is an admin:', decoded);
    return decoded; // Return user info or proceed with admin logic
  } catch (error) {
    console.error('Token verification failed:', error);
    return null; // Handle verification failure
  }
}
