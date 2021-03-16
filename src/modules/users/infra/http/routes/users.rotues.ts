import { Router } from "express";
import { container } from "tsyringe";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateAvatarUserService";

import ensureAuth from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = container.resolve(CreateUserService);
  // new CreateUserService(usersRepository);

  const user = await createUserService.execute({ name, email, password });
  delete user.password;
  return response.status(201).json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  async (resquest, response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    // new UpdateUserAvatarService(usersRepository);

    console.log(resquest.user.id, resquest.file.filename);

    const user = await updateUserAvatarService.execute({
      user_id: resquest.user.id,
      avatarFileName: resquest.file.filename,
    }); /* */

    delete user.password;

    return response.json({ ...user });
  }
);

export default usersRouter;
