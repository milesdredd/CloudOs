console.log("initiating backend engine... ");
import express from "express";
import cookieParser from "cookie-parser";
import homeRouter from './routes/home.routes.js';
import authRouter from './routes/home.auth.js';
import osRouter from './routes/os.routes.js';
import mongoose from "mongoose";
import cors from 'cors';
import { handleTokenMiddleware } from "./middleware/auth.middleware.js";
console.log("looking for db server ... ");
mongoose.connect("mongodb://127.0.0.1:27017/cloudOs")
    .then(() => { console.log("storage accessed") })
    .catch((e) => { console.log("can't locate DB") });
mongoose.connection.on("connected", () => {
    console.log("🔥 MongoDB connected");
});

const app = express();

const port = 4060;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/os', handleTokenMiddleware, osRouter);




app.listen(port, () => { console.log(`server started at ${port} \n`) });