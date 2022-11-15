import dotenv from 'dotenv';
import jwt, { Jwt } from 'jsonwebtoken';

dotenv.config();

export const createToken = (data: object) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: '24h',
    algorithm: 'HS256',
  });

  return token;
};

interface IJtw extends Jwt {
  payload: { username: string }
}

export const decodeToken = (token: string) => {
  const data = jwt.decode(token, { complete: true }) as IJtw;
  
  // if (!data) throw new HttpError(401, 'Invalid token');
  
  // return data.payload as IUser;
};
