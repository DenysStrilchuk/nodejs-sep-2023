import express, { Request, Response } from "express";

import { ApiError } from "./api-error";
import { reader, writer } from "./fs.service";
import { IUser } from "./user.interface";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (res: Response) => {
  res.send("hello world");
});

app.get("/users", async (res: Response) => {
  try {
    const users = await reader();
    res.json(users);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

app.post("/users", async (req: Request, res: Response) => {
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
    res.status(400).json(e.message);
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
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
    res.status(400).json(e.message);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
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
    res.status(400).json(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
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
    res.status(400).json(e.message);
  }
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`server is running at http://0.0.0.0:${PORT}/`);
});
