import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticationUserService from "@modules/users/services/AuthenticationUserService";

/** Lembrando que podemos ter create, update, show, delete, index */
class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthenticationUserService);

    const { user, token } = await authUserService.execute({ email, password });

    delete user.password;

    return response.status(201).json({ user, token });
  }
}

export default SessionsController;
