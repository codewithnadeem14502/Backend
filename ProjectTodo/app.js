import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/Error.js";
import cors from "cors";
export const app = express();
config({
  path: "./data/config.env",
});
// middle ware
app.use(express.json());
app.use(cookieParser());

// using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
// mainly user for deployment of the site and we can add domain name of the website -> cors
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("working ");
});

//  Error handling by middleware
app.use(ErrorMiddleware);
