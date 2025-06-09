import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routers/auth.router.js";
import { connectDb } from "./config/db.js";
import expenseRouter from "./routers/expense.route.js";

// dotenv configration
dotenv.config();

// create a app with the help of express
const app = express();

// declare a port number where server is start running
const PORT = process.env.PORT || 1200;

// connect to database
connectDb();

// use for send and receive a cookie
app.use(cookieParser());

// convert the data into a json format
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to the frontend url so frontend, backend and database communicates well
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// api endpoints start here 
app.use("/api/auth", authRoute);
app.use("/api/expense", expenseRouter);


// server is started
app.listen(PORT, () => {
    console.log(`server is started on http://localhost:${PORT}`)
})