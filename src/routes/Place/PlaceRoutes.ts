import {Router} from "express";
import PlaceController from "../../controllers/Place/PlaceController";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import canUserAccessPlaceMiddleware from "../../middlewares/CanUserAccessPlaceMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";
import validateSchemaMiddleware from "../../middlewares/ValidateSchemaMiddleware";
import {PartialPlaceSchema, PlaceSchema} from "../../models/Place/Validation/PlaceSchema";

/**
 * @swagger
 * tags:
 *   name: Place
 *   description: Place management endpoints
 */

/**
 * @swagger
 * /place/{id}:
 *   get:
 *     summary: Get a place by ID
 *     description: Retrieves a specific place by its ID.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the place to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the place.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found.
 *
 * @swagger
 * /place/all:
 *   get:
 *     summary: Get all place a user can access
 *     description: Retrieves all places a user can access.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all places a user can access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: User not found.
 *
 * @swagger
 * /place:
 *   post:
 *     summary: Create a new place
 *     description: Creates a new place with the provided information.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     parameters:
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
 *             type: object
 *             $ref: '#/components/schemas/Place'
 *     responses:
 *       201:
 *         description: Successfully created the place.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Place'
 *       400:
 *         description: Invalid input data.
 *
 * @swagger
 * /place/{id}:
 *   patch:
 *     summary: Update a place by ID
 *     description: Updates a specific place by its ID with the provided information.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the place to update
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
 *             $ref: '#/components/schemas/PartialPlace'
 *     responses:
 *       200:
 *         description: Successfully updated the place.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found.
 *
 * @swagger
 * /place/{id}:
 *   delete:
 *     summary: Delete a place by ID
 *     description: Deletes a specific place by its ID.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the place to delete
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all places.
 *     responses:
 *       200:
 *         description: Successfully deleted the place.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *          description: Place not found.
 *
 * @swagger
 * /place:
 *   get:
 *     summary: Get all places
 *     description: Retrieves all places.
 *     tags: [Place]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all places.
 *     responses:
 *       200:
 *         description: Successfully retrieved all places.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       404:
 *         description: Places not found.
 */

export default (): Router => {
    const router: Router = Router();

    // 🚦 Une route pour obtenir la liste des Place accessibles par un User
    router.get('/all', jwtMiddleware, PlaceController.getAllUserPlaces);

    // 🚦 Une route pour vérifier si un User a accès à une Place
    router.get('/:id', jwtMiddleware, canUserAccessPlaceMiddleware, PlaceController.getPlace);

    router.post('/', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PlaceSchema), PlaceController.createPlace);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PartialPlaceSchema), PlaceController.updatePlace);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, PlaceController.deletePlace);

    router.get('/', jwtMiddleware, isAdminMiddleware, PlaceController.getAllPlaces);

    return router;
};