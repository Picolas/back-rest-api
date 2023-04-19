import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import MongoService from "../../services/MongoService";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Pass} from "../Pass/Pass";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: The user's first name.
 *         last_name:
 *           type: string
 *           description: The user's last name.
 *         age:
 *           type: integer
 *           description: The user's age.
 *         phone_number:
 *           type: string
 *           description: The user's phone number.
 *         address:
 *           type: string
 *           description: The user's address.
 *         email:
 *           type: string
 *           description: The user's email address.
 *         password:
 *           type: string
 *           description: The user's password.
 *         pass:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pass'
 *           description: An array of pass objects associated with the user.
 *       required:
 *         - first_name
 *         - last_name
 *         - age
 *         - phone_number
 *         - address
 *         - email
 *         - password
 */

@modelOptions({ existingMongoose: MongoService.getInstance() })
class User extends TimeStamps {

    @prop()
    public first_name!: string;

    @prop()
    public last_name!: string;

    @prop()
    public age!: number;

    @prop()
    public phone_number!: string;

    @prop()
    public address!: string;

    @prop()
    public email!: string;

    @prop()
    public password!: string;

    // link with pass, user have 0 to n pass
    @prop({ ref: () => Pass })
    public pass?: Ref<Pass>[];
}

const UserModel = getModelForClass(User);
export default UserModel;
