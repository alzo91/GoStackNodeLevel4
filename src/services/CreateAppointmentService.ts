import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../model/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import AppError from "../errors/AppError";
/**  */
interface IRequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    /** Aqui estamos pegando todos os metods a serem executados */
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    /** Regra de negocio da aplicação poderia ser de 15, 30, 45 minutos  */
    const initialDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      initialDate
    );

    if (!!findAppointmentInSameDate) {
      throw new AppError(`This appointment is already booked`);
    }

    /** Para criar um novo registro não precisamos do await */
    const appointment = appointmentsRepository.create({
      provider_id,
      date: initialDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
