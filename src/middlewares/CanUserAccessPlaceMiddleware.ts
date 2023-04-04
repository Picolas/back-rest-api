import {Request, Response, NextFunction} from "express";
import PlaceService from "../services/PlaceService";
import UserService from "../services/UserService";
import PassService from "../services/PassService";

async function canUserAccessPlaceMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const place = await PlaceService.getPlaceById(req.params.id);
        const user = await UserService.getUserById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (!place) {
            return res.status(404).json({
                message: 'Place not found'
            });
        }

        if (user.age < place.required_age_level) {
            return res.status(403).json({
                message: 'User is too young to access this place'
            });
        }

        // check all pass level for user, for the rappel, a user have 0 to n pass
        let userHasRequiredPass = false;
        for (const pass of user.pass) {
            const passLevel = await PassService.getPassById(pass.id);
            if (passLevel.level >= place.required_pass_level) {
                userHasRequiredPass = true;
            }
        }

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