import { Request, Response } from "express";
import { parseISO } from "date-fns";
import { container } from "tsyringe";

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

/** Lembrando que podemos ter create, update, show, delete, index */
class AppointmentsController {
  async index(request: Request, response: Response) {
    console.log(request.user);

    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    // console.log(request.user);
    // const appointments = await appointmentsRepository.find({
    //  where: { provider_id: request.user.id },
    //    relations: ["provider"],
    // });

    return response.status(200).json([{ test: true }]);
  }

  async create(request: Request, response: Response) {
    const { provider_id, date } = request.body;

    /** Apenas transformando a data */
    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(201).json(appointment);
  }
}

export default AppointmentsController;
