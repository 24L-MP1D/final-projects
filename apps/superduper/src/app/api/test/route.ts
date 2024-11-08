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
