import { auth, generateSalt } from '../auth/route';
import { DB } from '../../lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const {  }
    const authResult = await auth(request, params.id);
  
    if (authResult.status !== 200) {
      return new Response(authResult.message, { status: authResult.status });
    }
    try {
      const userId = authResult.userId;
      const body = await request.json();
      const { firstName, lastName, phoneNumber, role, password } = body;
  
      const updateData: any = {
        firstName,
        lastName,
        phoneNumber,
        role,
        updatedAt: new Date(),
      };
  
      await DB.collection('comment').updateOne({ _id: userId }, { $set: updateData });
      return new Response(null, { status: 204 });
    } catch (error) {
      return new Response('Invalid token', { status: 403 });
    }
  }

export async function GET getComment = async (req: Request, res: Response) => {
  const { productId } = req.query;
  try {
    const query: any = {};
    if (productId) query.productId = productId;
    const data = await Comment.find({ productId }).populate(
      "userId",
      "userName"
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const editComment = async (req: Request, res: Response) => {
    const token = req.headers["authtoken"];
    const { productId, comment, rating } = req.body;
  
    try {
      const userId = jwt.decode(token).id;
      const selectedComment = await Comment.findOneAndUpdate(
        {
          productId,
          userId
        },
        { rating, comment }
      );
  
      res.status(200).json({ val: "success" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ val: "failed" });
    }
  };

export async function DELETE deleteComment = async (req: Request, res: Response) => {
  const token = req.headers["authtoken"];
  const { productId } = req.body;

  try {
    const userId = jwt.decode(token).id;
    await Comment.deleteOne({ userId, productId });
    res.status(200).json({ val: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ val: "failed" });
  }
};


