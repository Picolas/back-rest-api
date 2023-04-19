import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import MongoService from "../../services/MongoService";

/**
 * @swagger
 * components:
 *   schemas:
 *     Pass:
 *       type: object
 *       properties:
 *         level:
 *           type: integer
 *           minimum: 0
 *           maximum: 5
 *           description: The pass level, ranging from 0 to 5.
 *       required:
 *         - level
 */

@modelOptions({ existingMongoose: MongoService.getInstance() })
class Pass extends TimeStamps {

    @prop({ min: 0, max: 5 })
    public level!: number;
}

const PassModel = getModelForClass(Pass);
export default PassModel;
export {Pass};
