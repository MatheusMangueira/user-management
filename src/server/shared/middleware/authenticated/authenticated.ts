import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

export const authenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      return response.status(401).json({ error: 'Token is missing' });
    }

    const [, token] = authHeaders.split(' ');

    try {
      const decoded = verify(token, process.env.SECRET_JWT as string);

      if (typeof decoded === 'object' && decoded.sub) {
        request.userId = decoded.sub; 
        return next();
      }

      throw new Error('Invalid token structure.');

    } catch (err) {
      return response.status(401).end();
    }
  };
};
