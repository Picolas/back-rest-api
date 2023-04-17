import {Router} from "express";
import AuthController from "../../controllers/Auth/AuthController";

export default (): Router => {
    const router: Router = Router();

    router.post('/', AuthController.authUser)

    return router;
};