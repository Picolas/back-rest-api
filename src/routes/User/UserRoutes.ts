import {Router} from "express";
import UserController from "../../controllers/User/UserController";
import HasOwnershipMiddleware from "../../middlewares/HasOwnershipMiddleware";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', jwtMiddleware, HasOwnershipMiddleware, UserController.getUserById);

    router.post('/', jwtMiddleware, isAdminMiddleware, UserController.createUser);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, UserController.updateUser);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, UserController.deleteUser);

    // get all
    router.get('/', isAdminMiddleware, UserController.getAllUsers);

    return router;
};