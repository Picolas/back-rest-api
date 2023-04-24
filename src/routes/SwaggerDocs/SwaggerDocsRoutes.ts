import {Router} from "express";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJSDoc from "swagger-jsdoc";
import * as dotenv from 'dotenv';
import * as process from "process";
dotenv.config();

export default (): Router => {

    const router: Router = Router();

    const APP_URL = process.env.APP_URL || 'http://localhost';
    const APP_PORT = process.env.APP_PORT || 3000;

    const specs = swaggerJSDoc({
        swaggerDefinition: {
            openapi: '3.0.3',
            info: {
                title: process.env.APP_SWAGGER_TITLE || 'My API',
                version: process.env.APP_SWAGGER_VERSION || '1.0.0',
                description: process.env.APP_SWAGGER_DESCRIPTION || 'My API description',
            },
            servers: [
                {
                    url: `${APP_URL}:${APP_PORT}/api` || 'http://localhost:3000/api',
                }
            ],
            components: {
                securitySchemes: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization'
                    },
                },
                responses: {
                    "200": {
                        description: "Success"
                    },
                    "400": {
                        description: "Bad Request"
                    },
                    "401": {
                        description: "Unauthorized"
                    },
                    "403": {
                        description: "Forbidden"
                    },
                    "404": {
                        description: "Not Found"
                    }
                }
            },
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization'
                }
            }
        },
        apis: ["**/*Routes.{ts, js}", "**/*.{ts, js}"],
    });

    router.use('/',
        swaggerUi.serve,
        swaggerUi.setup(specs,
            {
                explorer: true,
            }),
    );

    return router;
};