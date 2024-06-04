import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let code: number = 400
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            code = 401
            throw new Error('Access denied. No token provided.')
        }
        const decoded = jwt.verify(token, JWT_SECRET) as { userID: string };
        req.body.user = { userID: decoded.userID };
        next();
    } catch (error: any) {
        res.status(code).send({ code: code, success: false, message: error.message })
    }
};
