import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import { body } from "express-validator";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use("/api/v1", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port 5000`));
