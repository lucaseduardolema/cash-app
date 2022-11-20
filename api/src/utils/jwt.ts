import dotenv from 'dotenv';
import jwt, { Jwt } from 'jsonwebtoken';
import IUser from '../interfaces/newUser.interface';
import HttpError from './httpError';

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
  
  if (!data) throw new HttpError(401, 'Token Inválido');
  
  return data.payload as IUser;
};
