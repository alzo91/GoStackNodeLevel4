import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
// import Appointment from "../model/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";
import ensureAuthenticated from "../Middlewares/ensureAuthenticated";
const appointmentsRouter = Router();

/** Esta criando o vetor de appointments */
// const appointmentsRepository = new AppointmentsRepository();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  console.log(request.user);
  const appointments = await appointmentsRepository.find({
    where: { provider_id: request.user.id },
    relations: ["provider"],
  });
  return response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  /** Apenas transformando a data */
  const parsedDate = parseISO(date);

  const createAppointmentService = new CreateAppointmentService();

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.status(201).json(appointment);
});

export default appointmentsRouter;
