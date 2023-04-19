import {Router} from "express";
import AuthController from "../../controllers/Auth/AuthController";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate a user
 *     description: Authenticates a user by checking their credentials and returning a token if successful. Use this token in the `Authorization` header of your requests and in the `Authorize` popup in Swagger.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 in: body
 *                 required: true
 *                 default: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 in: body
 *                 required: true
 *                 default: "johndoe@gmail.com"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the authenticated user.
 *       401:
 *         description: Invalid credentials.
 *       404:
 *         description: User not found.
 */

export default (): Router => {
    const router: Router = Router();

    router.post('/', AuthController.authUser)

    return router;
};