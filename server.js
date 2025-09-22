import express, {Router} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { errorHandling } from './middlewares/middlewares.js';

const app = express();
const PORT = process.env.PORT;
const apiRouter = Router();

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const URI_DB = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.k6lea.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(URI_DB)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(`DB connection error: ${err}`));
    
app.use(bodyParser.json());
app.use(cookieParser);

app.use(errorHandling)

app.listen(PORT, console.log(`Listening on port ${PORT}`))