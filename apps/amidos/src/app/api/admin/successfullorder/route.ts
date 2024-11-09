import { db } from '@/lib/db';
import nodeMailer from 'nodemailer';
const GOOGLE_SECRET_OTP = process.env.GOOGLE_SECRET_OTP;
const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const collection = db.collection('admin');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, phonenumber, order, totalprice, otp, id } = body;
    await db.collection('successfullorder').insertOne({
      address,
      phonenumber,
      order,
      totalprice,
      otp,
      id,
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}

export async function GET(request: Request) {
  try {
    const successfullorder = await db.collection('successfullorder').find({}).toArray();
    return Response.json(successfullorder);
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, otp, address, orderdetail, deliveryperson, email } = body;
    const successfullorder = await db.collection('successfullorder').updateOne({ id }, { $set: { deliveryperson } });
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anarchulu@gmail.com',
        pass: GOOGLE_SECRET_OTP,
      },
    });
    await transporter.sendMail({
      from: 'anarchulu@gmail.com',
      to: deliveryperson == '98723478' ? 'anarchulu@gmail.com' : 'pmm14d461@st.mnums.edu.mn',
      subject: 'Хүргэлтийн мэдээлэл',
      html: `<div>
      <p style="color: gray; font-size: large; ">Сайн байна уу? Танд энэ өдрийн мэнд хүргэе</p>
      <p style="color: gray; font-size: medium;">Захиалгын дугаар:</p>
      <span style="color: white; font-size: large; padding: 3px; background-color: green;">  ${otp} </span>
      <p style="color: gray; font-size: medium;">Хүргэлтийн хаяг:</p>
      ${address}
      <p style="color: gray; font-size: medium;">Amido's</p>
      <a href="http://localhost:3000/deliveryperson/${id}">ЭНД ДАРЖ ӨӨРИЙН БАЙРШЛЫГ ХУВААЛЦАНА УУ</a>
    </div>`,
    });
    return new Response('Successfully updated deliveryperson', { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Could not create');
  }
}
