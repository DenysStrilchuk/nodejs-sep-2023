import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(UserValidator.create),
  authController.createUser,
);

export const authRouter = router;
