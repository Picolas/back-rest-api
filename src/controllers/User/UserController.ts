import { NextFunction, Response, Request } from "express";
import UserService from "../../services/UserService";
import PassService from "../../services/PassService";
import {passwordEncryption} from "../../utils/PasswordUtils";

class UserController {

    // user controller crud methods
    public static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json(
                await user.populate('pass')
            );
        } catch (e) {
            return next(e);
        }
    }

    public static async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            // create or multiple passes based on object passes
            let passIds = [];
            if (req.body.passes) {
                for (const pass of req.body.passes) {
                    const createdPass = await PassService.createPass({
                        level: pass,
                    });
                    if (createdPass) {
                        passIds.push(createdPass._id);
                    }
                }
            }
            const password = passwordEncryption(req.body.password);

            const user = await UserService.createUser({
                ...req.body,
                pass: passIds,
                password: password
            });

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            return res.status(201).json(user);
        } catch (e) {
            return next(e);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json(user);
        } catch (e) {
            return next(e);
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.deleteUser(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            return res.status(200).json(user);
        } catch (e) {
            return next(e);
        }
    }

    // get all users
    public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            if (!users) {
                return res.status(404).json({
                    message: 'Users not found'
                });
            }
            return res.status(200).json(users);
        } catch (e) {
            return next(e);
        }
    }
}

export default UserController;