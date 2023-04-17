import {Router} from "express";
import PlaceController from "../../controllers/Place/PlaceController";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import canUserAccessPlaceMiddleware from "../../middlewares/CanUserAccessPlaceMiddleware";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', jwtMiddleware, canUserAccessPlaceMiddleware, PlaceController.getPlace);

    router.post('/', jwtMiddleware, PlaceController.createPlace);

    router.patch('/:id', jwtMiddleware, PlaceController.updatePlace);

    router.delete('/:id', jwtMiddleware, PlaceController.deletePlace);

    router.get('/', jwtMiddleware, PlaceController.getAllPlaces);

    return router;
};