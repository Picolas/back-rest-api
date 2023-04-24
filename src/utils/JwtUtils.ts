import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const APP_JWT_SECRET_KEY = process.env.APP_JWT_SECRET_KEY || 'secret';

export function generateToken(user: any): string {
    return jwt.sign({user}, APP_JWT_SECRET_KEY, {
        expiresIn: '1h'
    });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, APP_JWT_SECRET_KEY);
}

export function getUserFromToken(token: string): any {
    const decoded = jwt.decode(token);
    if (decoded) {
        return decoded['user'];
    }
    return null;
}