import { DB } from '@/lib/db';
import nodemailer from 'nodemailer';
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';

export async function GET(request: Request) {
  try {
    const collection = DB.collection('users');
    const users = await collection.find({}).toArray();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'galt.batzana1@gmail.com',
        pass: GOOGLE_SECRET,
      },
    });

    async function sendEmailToAllUsers() {
      for (let i = 0; i < users.length; i++) {
        const mailOptions = {
          from: 'galt.batzana1@gmail.com',
          to: users[i].email,
          subject: 'Hello! Welcome to SuperDuper Auction!',
          text: `Hello ${users[i].firstName}, We would like to invite to our auction.`,
          html: `<p>Hello <b>${users[i].firstName}</b>, We invite you to participate in our auction. </p>`,
        };

        try {
          const info = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${users[i].email}: ${info.response}`);
        } catch (error) {
          console.error(`Error sending email to ${users[i].email}: ${error}`);
        }
      }
    }
    sendEmailToAllUsers();

    return Response.json({ message: 'success' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}

//////////////////////CRUD///////////////////////////////

// export async function POST(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await request.json();
//     const user = await DB.collection('users').insertOne(body);
//     return Response.json('Success', { status: 200 });
//   } catch (err) {
//     return new Response('failed to create user', { status: 400 });
//   }
// }
///////////////////////GET////////////////////////////////

// export async function GET(
//   request: Request,
//   {
//     params,
//   }: {
//     params: { id: string };
//   }
// ) {
//   try {
//     const oneUser = await DB.collection('users').findOne({ _id: new ObjectId(params.id) });
//     if (!oneUser) {
//       return new Response('User Not Found', { status: 404 });
//     }
//     return new Response('success');
//   } catch (error) {
//     return new Response('internal server error', { status: 500 });
//   }
// }

///////////////////Update////////////////////////////////////

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const body = await request.json();
//     const result = await DB.collection('users').updateOne({ _id: new Object(params.id) }, { $set: body });
//     if (!result) {
//       return new Response('Not Found', { status: 404 });
//     }
//     return new Response('Success', { status: 204 });
//   } catch (err) {
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }
////////////////Delete////////////////////////////////////

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const result = await DB.collection('users').deleteOne({ _id: new Object(params.id) });
//     if (!result) {
//       return new Response('User Not Found', { status: 404 });
//     }
//     return new Response('User deleted successfully', { status: 200 });
//   } catch (err) {
//     return new Response('Internal Server Errror', { status: 500 });
//   }
// }
