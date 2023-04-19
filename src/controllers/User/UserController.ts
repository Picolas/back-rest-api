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
            // check if email already exists
            const getUserByEmail = await UserService.getUserByEmail(req.body.email);
            if (getUserByEmail) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            // create or multiple passes based on object passes
            let passIds = [];
            if (req.body.pass) {
                for (const pass of req.body.pass) {
                    const createdPass = await PassService.createPass(
                        pass
                    );
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
            const currentUser = await UserService.getUserById(req.params.id);
            // update user, check if email already exists
            const getUserByEmail = await UserService.getUserByEmail(req.body.email);
            if (getUserByEmail && getUserByEmail._id != currentUser._id) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            }

            const userBody = req.body;
            // remove pass from body
            delete userBody.pass;
            if (userBody.password) {
                userBody.password = passwordEncryption(userBody.password);
            }

            const user = await UserService.updateUser(req.params.id, userBody);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const updatedUser = await UserService.getUserById(req.params.id);
            return res.status(200).json(updatedUser);
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

    // add pass to user
    public static async addPassToUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            // create pass
            const pass = await PassService.createPass(
                req.body
            );
            if (!pass) {
                return res.status(404).json({
                    message: 'Pass not found'
                });
            }

            const userPassUpdated = await UserService.addPassToUser(user._id, pass._id);
            if (!userPassUpdated) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const updatedUser = await UserService.getUserById(req.params.id);
            return res.status(200).json(updatedUser);
        } catch (e) {
            return next(e);
        }
    }
}

export default UserController;