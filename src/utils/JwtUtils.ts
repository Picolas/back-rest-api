import * as jwt from 'jsonwebtoken';

const APP_JWT_SECRET_KEY = process.env.JWT_SECRET;

export function generateToken(user: any): string {
    // using JWT
    return jwt.sign(user, APP_JWT_SECRET_KEY, {
        expiresIn: '1h'
    });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, APP_JWT_SECRET_KEY);
}