import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import IUsersRepositiry from "../repositories/IUsersRepositiry";

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticationUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositiry
  ) {}

  public async execute({ email, password }: IRequestDTO): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError(`Incorrect email/password combination!`, 404);
    }

    const passwordMatched = await compare(password, userExists.password);

    if (!passwordMatched) {
      throw new AppError(`Incorrect email/password combination!`);
    }
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, { expiresIn, subject: userExists.id });

    return { user: userExists, token };
  }
}

export default AuthenticationUserService;
