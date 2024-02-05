import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import 'dotenv/config';
import globalErrorHandler from "./utils/globalErrorHandler.js";
import asyncHandler from "./utils/asyncHandler.js";
import { connectDB } from './db.js'
import userRouter from "./routes/userRoutes.js"
import courseRouter from "./routes/courseRoutes.js"

const app = express();

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(userRouter)
app.use(courseRouter)


app.get('/', asyncHandler(async (req, res) => {
    return res.send("<h1>hello world</h1>");
}));


app.use(globalErrorHandler);


app.listen(3000, () => {
    console.log("server is running on the port 3000");
});
