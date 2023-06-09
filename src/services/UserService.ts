import UserModel from "../models/User/User";

class UserService {

    public static userModel = UserModel;

    public static async createUser(user: any) {
        return await this.userModel.create(user);
    }

    public static async getAllUsers() {
        return await this.userModel.find().populate('pass');
    }

    public static async updateUser(id: string, user: any) {
        return await this.userModel.findByIdAndUpdate(id, user).populate('pass');
    }

    public static async getUserById(id: string) {
        return await this.userModel.findById(id).populate('pass');
    }

    public static async getUserByEmail(email: string) {
        return await this.userModel.findOne({email: email}).populate('pass');
    }

    public static async deleteUser(id: string) {
        return await this.userModel.findByIdAndDelete(id).populate('pass');
    }

    public static async addPassToUser(id: any, passId: any) {
        return await this.userModel.findByIdAndUpdate(id, {$push: {pass: passId}}).populate('pass');
    }
}

export default UserService;