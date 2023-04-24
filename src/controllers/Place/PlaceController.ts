import PlaceService from "../../services/PlaceService";
import {NextFunction, Request, Response} from "express";
import {getUserFromToken} from "../../utils/JwtUtils";

class PlaceController {

    public static async createPlace(req: Request, res: Response, next: NextFunction) {
        try {
            const place = await PlaceService.createPlace(req.body);
            if (!place) {
                return res.status(404).json({
                    message: 'Place not found'
                });
            }
            return res.status(201).json(place);
        } catch (e) {
            return next(e);
        }
    }

    public static async getPlace(req: Request, res: Response, next: NextFunction) {
        try {
            const place = await PlaceService.getPlaceById(req.params.id);
            if (!place) {
                return res.status(404).json({
                    message: 'Place not found'
                });
            }
            return res.status(200).json(place);
        } catch (e) {
            return next(e);
        }
    }

    public static async updatePlace(req: Request, res: Response, next: NextFunction) {
        try {
            const place = await PlaceService.updatePlace(req.params.id, req.body);
            if (!place) {
                return res.status(404).json({
                    message: 'Place not found'
                });
            }
            const updatedPlace = await PlaceService.getPlaceById(req.params.id);
            return res.status(200).json(updatedPlace);
        } catch (e) {
            return next(e);
        }
    }

    public static async deletePlace(req: Request, res: Response, next: NextFunction) {
        try {
            const place = await PlaceService.deletePlace(req.params.id);
            if (!place) {
                return res.status(404).json({
                    message: 'Place not found'
                });
            }
            return res.status(200).json(place);
        } catch (e) {
            return next(e);
        }
    }

    public static async getAllPlaces(req: Request, res: Response, next: NextFunction) {
        try {
            const places = await PlaceService.getAllPlaces();
            if (!places) {
                return res.status(404).json({
                    message: 'Places not found'
                });
            }
            return res.status(200).json(places);
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

export default PlaceController;