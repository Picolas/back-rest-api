import { Router } from "express";
import userRoutes from "./User/UserRoutes";
import placeRoutes from "./Place/PlaceRoutes";
import authRoutes from "./Auth/AuthRoutes";
import SwaggerDocsRoutes from "./SwaggerDocs/SwaggerDocsRoutes";
import passRoutes from "./Pass/PassRoutes";

const API_PREFIX: string = "/api";

export default (): Router => {
    const router: Router = Router();

    router.get(API_PREFIX + '/', (req, res) => {
        res.json({
            message: 'Welcome to the API!'
        });
    });

    router.use(API_PREFIX + '/user', userRoutes());
    router.use(API_PREFIX + '/pass', passRoutes());
    router.use(API_PREFIX + '/place', placeRoutes());
    router.use(API_PREFIX + '/auth', authRoutes());

    // swagger docs
    router.use('/api-docs', SwaggerDocsRoutes());

    return router;
};
