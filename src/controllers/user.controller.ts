import { Request, Response } from "express";

import { reader } from "../fs.service";

class UserController {
  public async getList(req: Request, res: Response) {
    try {
      const users = await reader();
      res.json(users);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }
}

export const userController = new UserController();
