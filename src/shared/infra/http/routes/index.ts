import { Router } from "express";
import appointmentsRouter from "@modules/appointments/infra/http/routes/appointments.routes";
import usersRouter from "@modules/users/infra/http/routes/users.rotues";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";

const routes = Router();

// routes.use(json());
routes.use("/appointments", appointmentsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);

export default routes;
