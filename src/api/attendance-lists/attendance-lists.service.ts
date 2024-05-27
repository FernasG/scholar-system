import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAttendanceListDto,
  FindAllAttendanceListsDto,
  UpdateAttendanceListDto,
} from './attendance-lists.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceLists, Classes, SchoolDays } from '@database';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AttendanceListsService {
  constructor(
    @InjectRepository(AttendanceLists)
    private readonly attendanceListsRepository: Repository<AttendanceLists>,
    private readonly datasource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  public async create(createAttendanceListDto: CreateAttendanceListDto) {
    const { school_day_id } = createAttendanceListDto;

    const schoolDay = await this.datasource
      .getRepository(SchoolDays)
      .findOneBy({
        id: school_day_id,
      });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.school_day_not_found');
      throw new NotFoundException(message);
    }

    const classroom = await this.datasource.getRepository(Classes).findOne({
      where: {
        id: schoolDay.class_id,
      },
      relations: { students: true },
    });

    if (!classroom) {
      const message = this.i18n.t<string>('classes.class_not_found');
      throw new NotFoundException(message);
    }

    const { students } = classroom;

    if (!students || !students.length) {
      const message = this.i18n.t<string>(
        'attendance_lists.create_attendance_list_failed',
      );
      throw new InternalServerErrorException(message);
    }

    const items: Partial<AttendanceLists>[] = students.map(({ id }) => ({
      student_id: id,
      school_day_id,
    }));

    const batchInsertResult = await this.attendanceListsRepository.save(items);

    if (!batchInsertResult) {
      const message = this.i18n.t<string>(
        'attendance_lists.create_attendance_list_failed',
      );
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t<string>(
      'attendance_lists.create_attendance_list_success',
    );

    return { message };
  }

  public async findAll(findAllAttendanceListsDto: FindAllAttendanceListsDto) {
    const { school_day_id } = findAllAttendanceListsDto;

    const schoolDay = await this.datasource.getRepository(SchoolDays).findOne({
      where: { id: school_day_id },
      relations: { attendance_lists: true },
    });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.school_day_not_found');
      throw new NotFoundException(message);
    }

    const { attendance_lists } = schoolDay;

    return attendance_lists;
  }

  public async findOne(id: string) {
    const attendanceList = await this.attendanceListsRepository.findOneBy({
      id,
    });

    if (!attendanceList) {
      const message = this.i18n.t('attendance_lists.attendance_list_not_found');
      throw new NotFoundException(message);
    }

    return { attendance_list: attendanceList };
  }

  public async update(
    id: string,
    updateAttendanceListDto: UpdateAttendanceListDto,
  ) {
    const attendanceList = await this.attendanceListsRepository.findOneBy({
      id,
    });

    if (!attendanceList) {
      const message = this.i18n.t('attendance_lists.attendance_list_not_found');
      throw new NotFoundException(message);
    }

    const { attendance } = updateAttendanceListDto;
    const updateResult = await this.attendanceListsRepository.update(id, {
      attendance,
    });

    if (!updateResult) {
      const message = this.i18n.t(
        'attendance_lists.update_attendance_list_failed',
      );
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t<string>(
      'attendance_lists.update_attendance_list_success',
    );

    return { message, attendance_list: attendanceList };
  }

  public async remove(id: string) {
    const attendanceList = await this.attendanceListsRepository.findOneBy({
      id,
    });

    if (!attendanceList) {
      const message = this.i18n.t('attendance_lists.attendance_list_not_found');
      throw new NotFoundException(message);
    }

    const deleteResult = await this.attendanceListsRepository.delete(id);

    if (!deleteResult) {
      const message = this.i18n.t(
        'attendance_lists.remove_attendance_list_failed',
      );
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t(
      'attendance_lists.remove_attendance_list_success',
    );

    return { message };
  }
}
