import { Router } from "express";
import { PostController } from "../controllers/post.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get(
  "/:userId/posts",
  AuthMiddleware.validateAuth,
  PostController.getPostsByUser,
);

export default userRouter;
