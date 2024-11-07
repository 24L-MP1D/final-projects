// import nodemailer from 'nodemailer';
// import { DB } from '../../../lib/db';
// import { OtpModel } from '../../../models/otpModel'; // Import the OTP Model

// // Send OTP email
// const sendOtpEmail = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'enkhdari88@gmail.com', // Your email address
//       pass: 'your-app-password', // App password if 2FA is enabled
//     },
//   });

//   // Prepare the mail options
//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'Password Reset OTP',
//     text: `Your OTP for resetting your password is: ${otp}`,
//   };

//   // Send the OTP email
//   await transporter.sendMail(mailOptions);
// };

// // POST function for Forgot Password and OTP Generation
// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, otp, newPassword } = body; // Get OTP and newPassword for password reset

//   try {
//     // Check if the email is provided for password reset or if OTP needs to be sent
//     if (otp && newPassword) {
//       // Verify OTP and reset password if OTP is provided
//       const otpRecord = await DB.collection('opt').findOne({ email, otp });

//       if (!otpRecord) {
//         return new Response('Invalid OTP', { status: 400 });
//       }

//       // OTP is valid, now update the password
//       const user = await DB.collection('users').findOne({ email });

//       if (!user) {
//         return new Response('User not found', { status: 404 });
//       }

//       // Update the password (make sure to hash the password before saving)
//       user.password = newPassword; // Use hashing here
//       await user.save();

//       return new Response('Password reset successful', { status: 200 });
//     }

//     // If only the email is provided, generate and send the OTP
//     const user = await DB.collection('users').findOne({ email });

//     if (!user) {
//       return new Response('User not found', { status: 404 });
//     }

//     // Generate a 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     // Save OTP in the database (with an expiration of 5 minutes)
//     await OtpModel.create({ email, otp });

//     // Send OTP to user's email
//     await sendOtpEmail(email, otp);

//     return new Response(JSON.stringify({ message: 'OTP sent to your email' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
//   } catch (error) {
//     console.error('Error occurred:', error);
//     return new Response('An error occurred', { status: 500 });
//   }
// }
