import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/JwtUtils";

function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token) {
        try {
            req.body.user = verifyToken(token);
            next();
        } catch (e) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }
    } else {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
}

export default jwtMiddleware;