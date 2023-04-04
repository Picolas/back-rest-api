import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import MongoService from "../../services/MongoService";

@modelOptions({ existingMongoose: MongoService.getInstance() })
class Pass extends TimeStamps {

    @prop({ min: 0, max: 5 })
    public level!: number;
}

const PassModel = getModelForClass(Pass);
export default PassModel;
export {Pass};
