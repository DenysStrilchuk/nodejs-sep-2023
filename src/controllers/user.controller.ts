import { NextFunction, Request, Response } from "express";

import { ApiError } from "../api-error";
import { reader, writer } from "../fs.service";
import { userService } from "../services/user.service";
import { IUser } from "../user.interface";

class UserController {
  public async getList(req: Request, res: Response) {
    try {
      const users = await userService.getList();
      res.json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const newUser = userService.createUser(dto);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
  public async getUserById(req: Request, res: Response, next: NextFunction) {
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
  }
  public async updateUserById(req: Request, res: Response, next: NextFunction) {
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
  }
  public async deleteUserById(req: Request, res: Response, next: NextFunction) {
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
  }
}

export const userController = new UserController();
