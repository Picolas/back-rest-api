import PlaceModel from "../models/Place/Place";

class PlaceService {

    public static placeModel = PlaceModel;

    public static async createPlace(place: any) {
        return await this.placeModel.create(place);
    }

    public static async updatePlace(id: string, place: any) {
        return await this.placeModel.findByIdAndUpdate(id, place);
    }

    public static async getPlaceById(id: string) {
        return await this.placeModel.findById(id);
    }

    public static async deletePlace(id: string) {
        return await this.placeModel.findByIdAndDelete(id);
    }

    public static async getAllPlaces() {
        return await this.placeModel.find();
    }
}

export default PlaceService;