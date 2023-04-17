import { NextFunction, Response, Request } from "express";
import UserService from "../../services/UserService";
import {generateToken} from "../../utils/JwtUtils";
import * as bcrypt from "bcrypt";

class AuthController {

    public static async authUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { email, password } = req.body;

            const user = await UserService.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }

            const token = generateToken(user);

            return res.status(200).json({
                token: token,
                message: 'User authenticated'
            });
        } catch (e) {
            return next(e);
        }
    }
}

export default AuthController;