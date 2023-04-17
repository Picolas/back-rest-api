import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const APP_DB_HOST = process.env.APP_DB_HOST || "";
const APP_DB_NAME = process.env.APP_DB_NAME || "";
const APP_DB_PORT = process.env.APP_DB_PORT || "";
const APP_DB_USER = process.env.APP_DB_USER || "";
const APP_DB_PASSWORD = process.env.APP_DB_PASSWORD || "";

class MongoService {

    private static instance: mongoose.Mongoose;

    public static getInstance(): mongoose.Mongoose {
        if (!MongoService.instance) {
            MongoService.instance = mongoose;
        }
        return MongoService.instance;
    }

    // connect to mongodb
    public static async connect(): Promise<void> {
        let DB_USER_PASSWORD = "";
        if (APP_DB_USER && APP_DB_PASSWORD) {
            DB_USER_PASSWORD = APP_DB_USER + ":" + APP_DB_PASSWORD + "@";
        }
        try {
            await MongoService.getInstance().connect(
                `mongodb://${DB_USER_PASSWORD}${APP_DB_HOST}:${APP_DB_PORT}`, {
                dbName: APP_DB_NAME
            });
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error(`Connection DB Error : ${error}`);
        }
    }

    // disconnect from mongodb
    public static async disconnect(): Promise<void> {
        try {
            await MongoService.getInstance().disconnect();
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error(`Disconnection DB Error : ${error}`);
        }
    }
}

export default MongoService;