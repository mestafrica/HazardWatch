import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import User from '../models/user';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating token');

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.server.token.secret, async (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                if (typeof decoded === 'object' && 'id' in decoded) {
                    try {
                        const user = await User.findById(decoded.id).exec();
                        if (user) {
                            (req as any).user = user; // Type assertion to avoid TypeScript errors
                            next();
                        } else {
                            return res.status(401).json({
                                message: 'User not found'
                            });
                        }
                    } catch (err) {
                        return res.status(500).json({
                            message: 'Error finding user',
                            error: err
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: 'Invalid token'
                    });
                }
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as IUser;
    
    if (user && user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: 'Access denied: Admins only'
        });
    }
};

export { extractJWT, checkAdmin };
