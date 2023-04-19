// cors
import * as cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const ALLOWED_ORIGINS = process.env.APP_CORS_ALLOWED_ORIGINS || [];
const corsOptions: any = {
    origin: function (origin: any, callback: any) {
        if (ALLOWED_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            // return error if origin is not allowed
            callback(new Error('Not allowed by CORS'))
        }
    }
}

export default cors(corsOptions);