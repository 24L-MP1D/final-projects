import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function auth(request: Request, userIdFromParams: string) {
  const token = request.headers.get('authtoken');

  if (!token) {
    return { status: 401, message: 'Unauthorized' };
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    if (userId !== userIdFromParams) {
      return { status: 403, message: 'Forbidden' };
    }

    return { userId, status: 200 };
  } catch (error) {
    return { status: 403, message: 'Invalid token' };
  }
}

export function generateSalt(rounds: number): string {
  return bcrypt.genSaltSync(rounds);
}
