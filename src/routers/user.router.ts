import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);

router.post("/", userController.createUser);

router.get("/:userId", commonMiddleware.isIdValid, userController.getUserById);

router.put(
  "/:userId",
  commonMiddleware.isIdValid,
  userController.updateUserById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid,
  userController.deleteUserById,
);

export const userRouter = router;
