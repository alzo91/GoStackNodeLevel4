import fs from "fs";
import path from "path";
import { getRepository } from "typeorm";
import User from "../model/User";
import uploadConfig from "../configs/upload";
import AppError from "../errors/AppError";
interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });

    if (!user) {
      throw new AppError("User does not authentication", 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
