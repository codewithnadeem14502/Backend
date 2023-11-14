import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

export const app = express();
config({
  path: "./data/config.env",
});
// middle ware
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("working ");
});
