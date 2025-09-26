import express, {Router} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { errorHandling } from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const PORT = process.env.PORT;
const apiRouter = Router();

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const URI_DB = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.k6lea.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const CORS_ORIGINS = process.env.CORS_ORIGINS.split(', ');
mongoose
    .connect(URI_DB)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(`DB connection error: ${err}`));
    
app.use(
    cors({
        origin: CORS_ORIGINS,
        credentials: true,
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

apiRouter.use(userRoutes);
apiRouter.use('/cart', cartRoutes);
apiRouter.use('/product', productRoutes);

app.use(apiRouter);
app.use(errorHandling);

app.listen(PORT, console.log(`Listening on port ${PORT}`));