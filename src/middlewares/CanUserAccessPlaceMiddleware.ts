import {Request, Response, NextFunction} from "express";
import PlaceService from "../services/PlaceService";
import {getUserFromToken} from "../utils/JwtUtils";

async function canUserAccessPlaceMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const place = await PlaceService.getPlaceById(req.params.id);
        if (!place) {
            return res.status(404).json({
                message: 'Place not found'
            });
        }

        const user = getUserFromToken(req.headers.authorization);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (user.age < place.required_age_level) {
            return res.status(403).json({
                message: 'User is too young to access this place'
            });
        }

        const userHasRequiredPass = user.pass.some(pass => pass.level >= place.required_pass_level);

        if (userHasRequiredPass === false) {
            return res.status(403).json({
                message: 'User does not have the required pass to access this place'
            });
        }

        return next();
    } catch (e) {
        return next(e);
    }
}

export default canUserAccessPlaceMiddleware;