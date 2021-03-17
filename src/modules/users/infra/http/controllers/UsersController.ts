import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "@modules/users/services/CreateUserService";

/** Lembrando que podemos ter create, update, show, delete, index */
class UsersController {
  async index(request: Request, response: Response) {}

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    // new CreateUserService(usersRepository);

    const user = await createUserService.execute({ name, email, password });
    delete user.password;
    return response.status(201).json(user);
  }
}

export default UsersController;
