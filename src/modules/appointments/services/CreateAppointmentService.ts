import { startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
import AppError from "@shared/errors/AppError";

import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  // private appointmentsRepository: IAppointmentsRepository;

  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    /** Regra de negocio da aplicação poderia ser de 15, 30, 45 minutos  */
    const initialDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      initialDate
    );

    if (!!findAppointmentInSameDate) {
      throw new AppError(`This appointment is already booked`);
    }

    /** Para criar um novo registro não precisamos do await */
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: initialDate,
    });

    // await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
