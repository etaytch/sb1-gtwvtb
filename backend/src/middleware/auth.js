import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { AppError } from './error.js';

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError('Not authorized to access this route', 401));
  }
};