import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";

import swaggerDocument from "../docs/swagger.json";
import { config } from "./configs/config";
import { runCronJobs } from "./crons";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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

app.listen(config.PORT, "0.0.0.0", async () => {
  await mongoose.connect(config.MONGO_URL);
  console.log(`server is running at http://${config.HOST}:${config.PORT}/`);
  runCronJobs();
});
