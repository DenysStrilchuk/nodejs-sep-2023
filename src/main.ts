import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "./api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("uncaughtException: ", error);
  process.exit(1);
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", async () => {
  await mongoose.connect(
    "mongodb+srv://denia876:ye4mQ5h1WbLsAITQ@cluster0.ueieiyd.mongodb.net/",
  );
  console.log(`server is running at http://0.0.0.0:${PORT}/`);
});
