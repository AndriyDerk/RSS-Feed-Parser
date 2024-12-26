import { Response } from 'express';

export const notFoundError = (res: Response, message = 'Resource not found'): Response => {
  return res.status(404).json({ message });
};

export const internalServerError = (res: Response, message = 'Internal server error'): Response => {
  return res.status(500).json({ message });
};

export const forbiddenServerError = (res: Response, message = 'Forbidden server error'): Response => {
  return res.status(401).json({ message });
};