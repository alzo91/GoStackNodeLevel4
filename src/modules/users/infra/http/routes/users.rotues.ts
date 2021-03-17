import { Router } from "express";

import multer from "multer";

import uploadConfig from "@config/upload";

import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";

import ensureAuth from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);
const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
