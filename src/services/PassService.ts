import PassModel from "../models/Pass/Pass";

class PassService {

    public static passModel = PassModel;

    public static async createPass(pass: any) {
        return await this.passModel.create(pass);
    }

    public static async updatePass(id: string, pass: any) {
        return await this.passModel.findByIdAndUpdate(id, pass);
    }

    public static async getPassById(id: string) {
        return await this.passModel.findById(id);
    }

    public static async deletePass(id: string) {
        return await this.passModel.findByIdAndDelete(id);
    }

    public static async getPasses() {
        return await this.passModel.find();
    }

    // getPassesByUserId
    public static async getPassesByUserId(id: string) {
        return await this.passModel.find({user: id});
    }
}

export default PassService;