import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

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
      const userId = req.params.userId;
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const dto = req.body as Partial<IUser>;
      const user = await userService.updateUserById(userId, dto);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteUserById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
