import {Request, Response, NextFunction} from "express";
import PassService from "../services/PassService";

async function hasPassUserMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const pass = await PassService.getPassById(req.params.id);
        if (!pass) {
            return res.status(404).json({
                message: 'Pass not found'
            });
        }

        return next();
    } catch (e) {
        return next(e);
    }
}

export default hasPassUserMiddleware;