import {NextFunction, Request, Response} from "express";
import {AnyZodObject} from "zod";

function validateSchemaMiddleware(schema: AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query
            });

            next();
        } catch (e) {
            return res.status(400).json({
                message: e.message
            });
        }
    }
}

export default validateSchemaMiddleware;