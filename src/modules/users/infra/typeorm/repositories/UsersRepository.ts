import { getRepository, Repository } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepositiry from "@modules/users/repositories/IUsersRepositiry";
import IUserDTO from "@modules/users/repositories/IUserDTO";

class UsersRepository implements IUsersRepositiry {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User> {
    const findUserByEmail = await this.ormRepository.findOne({
      where: { email },
    });

    return findUserByEmail || undefined;
  }

  public async findById(id: string): Promise<User | undefined> {
    /* const findAppointmentInSameDate = this. appointments.find((appointment) =>
      isEqual(date, appointment.date)
    ); */
    const findUserById = await this.ormRepository.findOne({
      where: { id },
    });

    return findUserById || undefined;
  }

  public async create({ email, name, password }: IUserDTO): Promise<User> {
    /** Para criar um novo registro não precisamos do await */
    const user = this.ormRepository.create({
      email,
      name,
      password,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
}

export default UsersRepository;
