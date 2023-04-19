import {Router} from "express";
import UserController from "../../controllers/User/UserController";
import HasOwnershipMiddleware from "../../middlewares/HasOwnershipMiddleware";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";
import {PartialUserSchema, UserSchema} from "../../models/User/Validation/UserSchema";
import validateSchemaMiddleware from "../../middlewares/ValidateSchemaMiddleware";
import {PassSchema} from "../../models/Pass/Validation/PassSchema";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management endpoints
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieves a specific user by their ID.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *         default: 643ad5c09da0e4a77bbd7ae2
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with the provided information.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Successfully created the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data.
 *
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Updates a specific user by their ID with the provided information.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all places.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Deletes a specific user by their ID.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all places.
 *     responses:
 *       200:
 *         description: Successfully deleted the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves all users.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Users not found.
 *
 * @swagger
 * /user/{id}/pass:
 *   post:
 *     summary: Add a pass to a user
 *     description: Adds a pass to a user.
 *     tags: [User]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to add pass to a user.
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to add pass to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pass'
 *     responses:
 *       201:
 *         description: Successfully add pass to the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data.
 */

export default (): Router => {
    const router: Router = Router();

    // crud routes
    router.get('/:id', jwtMiddleware, HasOwnershipMiddleware, UserController.getUserById);

    router.post('/', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(UserSchema), UserController.createUser);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PartialUserSchema), UserController.updateUser);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, UserController.deleteUser);

    // get all
    router.get('/', jwtMiddleware, isAdminMiddleware, UserController.getAllUsers);

    // add pass to user
    router.post('/:id/pass', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PassSchema), UserController.addPassToUser);

    return router;
};