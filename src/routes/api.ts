import { Router } from "express";
import userRoutes from "./User/UserRoutes";
import placeRoutes from "./Place/PlaceRoutes";
import authRoutes from "./Auth/AuthRoutes";

const API_PREFIX: string = "/api";

export default (): Router => {
    const router: Router = Router();

    router.use(API_PREFIX + '/user', userRoutes());
    router.use(API_PREFIX + '/place', placeRoutes());
    router.use(API_PREFIX + '/auth', authRoutes());

    return router;
};