// import { EntityRepository, Repository } from "typeorm";
import { getRepository, Repository } from "typeorm";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "@modules/appointments/repositories/ICreateAppointmentDTO";
// extends Repository<Appointment>
// @EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | null> {
    /* const findAppointmentInSameDate = this. appointments.find((appointment) =>
      isEqual(date, appointment.date)
    ); */
    const findAppointmentInSameDate = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointmentInSameDate || null;
  }

  public async create({
    date,
    provider_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    /** Para criar um novo registro não precisamos do await */
    const appointment = this.ormRepository.create({
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
