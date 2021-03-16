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
      console.log("directory", uploadConfig.directory);
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      console.log("userAvatarFilePath", userAvatarFilePath);
      try {
        const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

        if (userAvatarFileExist) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      } catch (err) {
        console.log(err);
      }
    }

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
