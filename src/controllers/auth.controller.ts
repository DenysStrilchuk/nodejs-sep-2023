import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as Partial<IUser>;
      const data = await authService.createUser(dto);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
