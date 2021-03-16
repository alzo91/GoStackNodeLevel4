import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../model/User";
import AppError from "../errors/AppError";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new AppError(`This email '${email}' already exist!`);
    }

    const hashedPassword = await hash(password, 0);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
