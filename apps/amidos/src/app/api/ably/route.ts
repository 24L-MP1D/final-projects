// import Ably, { AuthOptions } from 'ably';

// const rest = new Ably.Rest('Nh6tIw.Klcmeg:giWLIzmJQ9jQ_ovhkmin61JtSF5QScEZb_EQgxLTr5I');

// export async function GET(request: Request) {
//   const tokenParams = {
//     clientId: 'my-client-id',
//   };

//   try {
//     const tokenRequest: AuthOptions = await rest.auth.createTokenRequest(tokenParams); // Await result with expected AuthOptions type
//     console.log(tokenRequest);
//     return new Response(JSON.stringify(tokenRequest));
//   } catch (error) {
//     console.error('Error requesting token:', error); // Log the actual error object
//     return new Response('Error requesting token', { status: 500 }); // More informative error response
//   }
// }
