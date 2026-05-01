import { Router } from "express";
import { PostController } from "../controllers/post.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { PostMiddleware } from "../middlewares/post.middleware.js";

const postRouter = Router();

postRouter.post(
  "/",
  AuthMiddleware.validateApiKey,
  PostMiddleware.validateCreate,
  PostController.create,
);
postRouter.put(
  "/:id",
  AuthMiddleware.validateApiKey,
  PostMiddleware.validateUpdate,
  PostController.update,
);

export default postRouter;
