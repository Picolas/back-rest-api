import * as dotenv from 'dotenv';
import {NextFunction, Request, Response} from "express";
dotenv.config();

async function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
    // check if body contain admin password :
    const adminPassword = req.headers.admin;
    if (!adminPassword) {
        return res.status(400).json({
            message: 'Admin rights required'
        });
    }

    const ADMIN_PASSWORD = process.env.APP_ADMIN_PASSWORD || 'thispasswordisnotsecure';
    // check if admin password is correct
    if (ADMIN_PASSWORD !== adminPassword) {
        return res.status(403).json({
            message: 'Invalid admin credentials'
        });
    }

    return next();
}

export default isAdminMiddleware;