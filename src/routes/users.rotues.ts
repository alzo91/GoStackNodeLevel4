import { request, Router } from "express";
import multer from "multer";
import uploadConfig from "../configs/upload";
import CreateUserService from "../services/CreateUserService";
import ensureAuth from "../Middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateAvatarUserService";
const upload = multer(uploadConfig);
const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({ name, email, password });
  delete user.password;
  return response.status(201).json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuth,
  upload.single("avatar"),
  async (resquest, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();

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
