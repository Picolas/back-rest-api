import {getUserFromToken} from "../utils/JwtUtils";
import {NextFunction, Request, Response} from "express";

async function hasOwnershipMiddleware(req: Request, res: Response, next: NextFunction) {
    // check if user is the user
    const userId = req.params.id;
    if (!userId) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    // retrieve the user from the token
    const user = getUserFromToken(req.headers.authorization);
    if (!user) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    if (user._id !== userId) {
        return res.status(403).json({
            message: 'You do not have the permission to access this resource'
        });
    }

    return next();
}

export default hasOwnershipMiddleware;