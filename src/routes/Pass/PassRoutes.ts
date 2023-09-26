import {Router} from "express";
import jwtMiddleware from "../../middlewares/JwtMiddleware";
import isAdminMiddleware from "../../middlewares/IsAdminMiddleware";
import validateSchemaMiddleware from "../../middlewares/ValidateSchemaMiddleware";
import {PartialPassSchema, PassSchema} from "../../models/Pass/Validation/PassSchema";
import PassController from "../../controllers/Pass/PassController";

/**
 * @swagger
 * tags:
 *   name: Pass
 *   description: Pass management endpoints
 */

/**
 * @swagger
 * /pass/{id}:
 *   get:
 *     summary: Get a pass by ID
 *     description: Retrieves a specific pass by its ID.
 *     tags: [Pass]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the pass to retrieve
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to create a new pass.
 *     responses:
 *       200:
 *         description: Successfully retrieved the pass.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Pass'
 *       404:
 *         description: Pass not found.
 *
 * @swagger
 * /pass:
 *   post:
 *     summary: Create a new pass
 *     description: Creates a new pass with the provided information.
 *     tags: [Pass]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to create a new pass.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Pass'
 *     responses:
 *       201:
 *         description: Successfully created the pass.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Pass'
 *       400:
 *         description: Invalid input data.
 *
 * @swagger
 * /pass/{id}:
 *   patch:
 *     summary: Update a pass by ID
 *     description: Updates a specific pass by its ID with the provided information.
 *     tags: [Pass]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the pass to update
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all pass.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartialPass'
 *     responses:
 *       200:
 *         description: Successfully updated the pass.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pass'
 *       404:
 *         description: Pass not found.
 *
 * @swagger
 * /pass/{id}:
 *   delete:
 *     summary: Delete a pass by ID
 *     description: Deletes a specific pass by its ID.
 *     tags: [Pass]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the pass to delete
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all pass.
 *     responses:
 *       200:
 *         description: Successfully deleted the pass.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pass'
 *       404:
 *          description: Pass not found.
 *
 * @swagger
 * /pass:
 *   get:
 *     summary: Get all passes
 *     description: Retrieves all passes.
 *     tags: [Pass]
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: header
 *         name: admin
 *         default: exaltit
 *         required: true
 *         description: Admin password to retrieve all passes.
 *     responses:
 *       200:
 *         description: Successfully retrieved all passes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pass'
 *       404:
 *         description: Pass not found.
 */

export default (): Router => {
    const router: Router = Router();

    router.get('/:id', jwtMiddleware, isAdminMiddleware, PassController.getPass);

    router.post('/', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PassSchema), PassController.createPass);

    router.patch('/:id', jwtMiddleware, isAdminMiddleware, validateSchemaMiddleware(PartialPassSchema), PassController.updatePass);

    router.delete('/:id', jwtMiddleware, isAdminMiddleware, PassController.deletePass);

    router.get('/', jwtMiddleware, isAdminMiddleware, PassController.getAllPass);

    return router;
};