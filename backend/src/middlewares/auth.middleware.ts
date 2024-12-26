import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { forbiddenServerError, internalServerError } from '../utils/error.handler';

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticate = (req: Request & { user?: { username: string; _id: string } }, res: Response, next: NextFunction): void => {
  if (!SECRET_KEY) {
    console.log('No secret key provided');
    internalServerError(res, 'Internal server error');
    return; 
  }

  const token = req.cookies.accessToken;
  if (!token) {
    forbiddenServerError(res, 'No token provided');
    return; 
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { username: string; _id: string };
    req.user = decoded;
    next(); 
  } catch (error) {
    forbiddenServerError(res, 'Invalid token');
    return; 
  }
};
