import User from "../infra/typeorm/entities/User";
import IUserDTO from "./IUserDTO";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
