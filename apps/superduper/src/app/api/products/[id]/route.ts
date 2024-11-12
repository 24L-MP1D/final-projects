import { DB } from '@/lib/db';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

const collection = DB.collection('product');
const notifCollection = DB.collection('notifications');
const GOOGLE_SECRET = process.env.GOOGLE_SECRET || '';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const _id = params.id;
  try {
    const data = await collection.findOne({ _id: new ObjectId(_id) });
    return Response.json(data);
  } catch (err) {
    return Response.json({ message: err });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    await collection.deleteOne({ _id: new ObjectId(id) });
    return Response.json({ message: 'successfully deleted' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { status, message, userId } = await request.json();

  try {
    await notifCollection.insertOne({ message, isSeen: false, productId: new ObjectId(params.id), userId });
    const data = await collection.updateOne({ _id: new ObjectId(params.id) }, { $set: { status: status } });
    const oneProduct = await collection.findOne({ _id: new ObjectId(params.id) });
    if (oneProduct?.status == 'Accept') {
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
            subject: 'Сайн байна уу? "Сүпер Дүпер" дуудлага худалдаа эхлэх гэж байна!',
            html: `<p>Сайн байна уу? <b>Эрхэм хүндэт ${users[i].firstName}</b>,</p>
            <p>Бид таныг өөрсдийн зохион байгуулж байгаа дуудлага худалдаанд орохыг урьж байна. </p>
            <p>Та доорх линк дээр даран манай веб руу орж болно.</p>
              <a href="http://localhost:3000/client">Энд дарна уу</a>
              <ul> 
              <li>Бүтээгдэхүүний нэр: "${oneProduct?.productName}"</li>
              <li>Дуудлага худалдаа эхлэх огноо: ${oneProduct?.startDate}</li>
              <ul>
            <div style="margin-top: 20px; ">  
              <img src=${oneProduct?.frontImage} alt="zurag">
            </div>`,
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
    }
    return Response.json({ message: 'Succesfully updated' });
  } catch (err) {
    return new Response(null, { status: 404 });
  }
}
