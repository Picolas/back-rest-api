import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {getModelForClass, post, prop} from "@typegoose/typegoose";


/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *           description: The place's address.
 *         phone_number:
 *           type: string
 *           description: The place's phone number.
 *         required_pass_level:
 *           type: integer
 *           description: The required pass level to access the place.
 *         required_age_level:
 *           type: integer
 *           description: The required age level to access the place.
 *       required:
 *         - address
 *         - phone_number
 *         - required_pass_level
 *         - required_age_level
 */

class Place extends TimeStamps {

    @prop()
    public address!: string;

    @prop()
    public phone_number!: string;

    @prop({ min: 1, max: 5 })
    public required_pass_level!: number;

    @prop()
    public required_age_level!: number;
}

const PlaceModel = getModelForClass(Place);
export default PlaceModel;