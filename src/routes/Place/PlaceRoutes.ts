import {Router} from "express";
import PlaceController from "../../controllers/Place/PlaceController";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import canUserAccessPlaceMiddleware from "../../middlewares/CanUserAccessPlaceMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";
import validateSchemaMiddleware from "../../middlewares/ValidateSchemaMiddleware";
import {PartialPlaceSchema, PlaceSchema} from "../../models/Place/Validation/PlaceSchema";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', jwtMiddleware, canUserAccessPlaceMiddleware, PlaceController.getPlace);

    router.post('/', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PlaceSchema), PlaceController.createPlace);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PartialPlaceSchema), PlaceController.updatePlace);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, PlaceController.deletePlace);

    router.get('/', jwtMiddleware, isAdminMiddleware, PlaceController.getAllPlaces);

    return router;
};