import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import {Application} from "express";
import MongoService from "./services/MongoService";
import apiRoutes from "./routes/api";

dotenv.config();

const app: Application = express();
const PORT: string | number = process.env.APP_PORT || 3000;

// init mongodb using service and routes
const initApp = async () => {
    await MongoService.connect();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // routes api
    app.use(apiRoutes());

    // error handler 500
    app.use((err: any, req: any, res: any, next: any) => {
        console.error(err.stack);
        res.status(err.status || 500).json({ error: err.message });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

initApp().then(r => {
    console.log('App Working');
});

