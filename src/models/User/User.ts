import {getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import MongoService from "../../services/MongoService";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {Pass} from "../Pass/Pass";

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
