import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./api-error";
import { reader, writer } from "./fs.service";
import { userRouter } from "./routers/user.router";
import { IUser } from "./user.interface";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (name.length > 15) {
      throw new ApiError("Name should not be longer than 15 characters", 400);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      throw new ApiError("Invalid email", 400);
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!passwordPattern.test(password)) {
      throw new ApiError(
        "Password must consist of at least 6 characters and contain at least one number",
        400,
      );
    }

    const users = await reader();

    const newUser: IUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    await writer(users);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

app.get(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const users = await reader();

      if (!Number.isInteger(userId) || userId <= 0) {
        throw new ApiError("Invalid user ID", 400);
      }

      const user = users.find((user) => user.id === userId);
      if (!user) {
        throw new ApiError("User  not found", 404);
      }
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      if (name.length > 15) {
        throw new ApiError("Name should not be longer than 15 characters", 400);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        throw new ApiError("Invalid email", 400);
      }

      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

      if (!passwordPattern.test(password)) {
        throw new ApiError(
          "Password must consist of at least 6 characters and contain at least one number",
          400,
        );
      }

      const userId = Number(req.params.userId);
      const users = await reader();

      const index = users.findIndex((user) => user.id === userId);
      if (index === -1) {
        throw new ApiError("User  not found", 400);
      }
      users[index] = { ...users[index], name, email, password };
      await writer(users);

      res.status(201).json(users[index]);
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const users = await reader();

      const index = users.findIndex((user) => user.id === userId);
      if (index === -1) {
        throw new ApiError("User  not found", 400);
      }
      users.splice(index, 1);
      await writer(users);

      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
);

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
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running at http://0.0.0.0:${PORT}/`);
});
