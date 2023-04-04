import UserModel from "../models/User/User";

class UserService {

    public static userModel = UserModel;

    public static async createUser(user: any) {
        return await this.userModel.create(user);
    }

    public static async updateUser(id: string, user: any) {
        return await this.userModel.findByIdAndUpdate(id, user);
    }

    public static async getUserById(id: string) {
        return await this.userModel.findById(id).populate('pass');
    }

    public static async deleteUser(id: string) {
        return await this.userModel.findByIdAndDelete(id);
    }
}

export default UserService;