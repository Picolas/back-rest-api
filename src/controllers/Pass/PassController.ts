import PlaceService from "../../services/PlaceService";
import {NextFunction, Request, Response} from "express";
import {getUserFromToken} from "../../utils/JwtUtils";
import PassService from "../../services/PassService";

class PassController {

    public static async createPass(req: Request, res: Response, next: NextFunction) {
        try {
            const pass = await PassService.createPass(req.body);
            if (!pass) {
                return res.status(404).json({
                    message: 'Pass not found'
                });
            }
            return res.status(201).json(pass);
        } catch (e) {
            return next(e);
        }
    }

    public static async getPass(req: Request, res: Response, next: NextFunction) {
        try {
            const pass = await PassService.getPassById(req.params.id);
            if (!pass) {
                return res.status(404).json({
                    message: 'Pass not found'
                });
            }
            return res.status(200).json(pass);
        } catch (e) {
            return next(e);
        }
    }

    public static async updatePass(req: Request, res: Response, next: NextFunction) {
        try {
            const pass = await PassService.updatePass(req.params.id, req.body);
            if (!pass) {
                return res.status(404).json({
                    message: 'Pass not found'
                });
            }
            const updatedPass = await PassService.getPassById(req.params.id);
            return res.status(200).json(updatedPass);
        } catch (e) {
            return next(e);
        }
    }

    public static async deletePass(req: Request, res: Response, next: NextFunction) {
        try {
            const pass = await PassService.deletePass(req.params.id);
            if (!pass) {
                return res.status(404).json({
                    message: 'Pass not found'
                });
            }
            return res.status(200).json(pass);
        } catch (e) {
            return next(e);
        }
    }

    public static async getAllPass(req: Request, res: Response, next: NextFunction) {
        try {
            const passes = await PassService.getPasses();
            if (!passes) {
                return res.status(404).json({
                    message: 'No passes found'
                });
            }
            return res.status(200).json(passes);
        } catch (e) {
            return next(e);
        }
    }

    public static async getAllUserPlaces(req: Request, res: Response, next: NextFunction) {
        try {
            const user = getUserFromToken(req.headers.authorization);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const userPlaces = (await Promise.all(user.pass.map(async pass => {
                const places = await PlaceService.getAllPlacesByPassLevel(pass.level);
                return places.filter(place => user.age >= place.required_age_level);
            }))).flat();

            return res.status(200).json(userPlaces);
        } catch (e) {
            return next(e);
        }
    }
}

export default PassController;