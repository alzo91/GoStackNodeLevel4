import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateUserAvatarService from "@modules/users/services/UpdateAvatarUserService";

/** Lembrando que podemos ter create, update, show, delete, index */
class UserAvatarController {
  async show(request: Request, response: Response) {}

  async update(request: Request, response: Response) {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    // new UpdateUserAvatarService(usersRepository);

    console.log(request.user.id, request.file.filename);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    }); /* */

    delete user.password;

    return response.json({ ...user });
  }
}

export default UserAvatarController;
