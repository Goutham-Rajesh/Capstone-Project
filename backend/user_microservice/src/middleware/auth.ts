import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    req.user = user as JwtPayload;
    next();
  });
};

export const authorizeRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction): void => {
  if (!roles.includes((req.user as JwtPayload).role)) {
    res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    return;
  }
  next();
};
