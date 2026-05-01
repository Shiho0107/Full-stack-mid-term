import express from "express";
import { userController } from "../controllers/user.controller.js";
import { UserMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post(
  "/register",
  UserMiddleware.validateRegister,
  userController.register,
);
router.post("/login", UserMiddleware.validateLogin, userController.login);

export default router;
