import cookieParser from "cookie-parser";
import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Cors error origin: " + origin + " not aurotized!");
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", redirectRouter); //opcional redirect de back
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//login/token example
//app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port 5000`));
