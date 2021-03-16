import fs from "fs";
import path from "path";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import IUsersRepositiry from "../repositories/IUsersRepositiry";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositiry
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
