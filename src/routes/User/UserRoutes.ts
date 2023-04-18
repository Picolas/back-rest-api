import {Router} from "express";
import UserController from "../../controllers/User/UserController";
import HasOwnershipMiddleware from "../../middlewares/HasOwnershipMiddleware";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";
import {PartialUserSchema, UserSchema} from "../../models/User/Validation/UserSchema";
import validateSchemaMiddleware from "../../middlewares/ValidateSchemaMiddleware";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', jwtMiddleware, HasOwnershipMiddleware, UserController.getUserById);

    router.post('/', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(UserSchema), UserController.createUser);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PartialUserSchema), UserController.updateUser);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, UserController.deleteUser);

    // get all
    router.get('/', isAdminMiddleware, UserController.getAllUsers);

    return router;
};