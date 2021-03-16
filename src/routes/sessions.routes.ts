import { Router } from "express";
import AuthenticationUserService from "../services/AuthenticationUserService";
const sessionsRouter = Router();

/** Esta criando o vetor de appointments */
// const appointmentsRepository = new AppointmentsRepository();

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthenticationUserService();

  const { user, token } = await authUserService.execute({ email, password });
  delete user.password;
  return response.status(201).json({ user, token });
});

export default sessionsRouter;
