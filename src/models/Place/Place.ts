import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";
import {getModelForClass, post, prop} from "@typegoose/typegoose";

class Place extends TimeStamps {

    @prop()
    public address!: string;

    @prop()
    public phone_number!: string;

    @prop()
    public required_pass_level!: number;

    @prop()
    public required_age_level!: number;
}

const PlaceModel = getModelForClass(Place);
export default PlaceModel;