import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import connectToDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectToDB();

app.use("/", userRoutes);

export default app;