import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUsersRepositiry from "../repositories/IUsersRepositiry";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositiry
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError(`This email '${email}' already exist!`);
    }

    const hashedPassword = await hash(password, 0);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    /// await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
