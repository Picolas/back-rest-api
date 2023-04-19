// cors
import * as cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const ALLOWED_ORIGINS = process.env.APP_CORS_ALLOWED_ORIGINS || [];
const corsOptions: cors.CorsOptions = {
    origin: function (origin: any, callback: any) {
        if (process.env.APP_ENVIRONMENT === 'development' || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

export default cors(corsOptions);