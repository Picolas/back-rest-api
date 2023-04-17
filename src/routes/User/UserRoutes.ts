import {Router} from "express";
import UserController from "../../controllers/User/UserController";

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', UserController.getUserById);

    router.post('/', UserController.createUser);

    router.patch('/:id', UserController.updateUser);

    router.delete('/:id', UserController.deleteUser);

    // get all
    router.get('/', UserController.getAllUsers);

    return router;
};