import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateSchoolDayDto,
  FindAllSchoolDaysDto,
  UpdateSchoolDayDto,
} from './school-days.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Classes, SchoolDays } from '@database';

@Injectable()
export class SchoolDaysService {
  constructor(
    @InjectRepository(SchoolDays)
    private readonly schoolDaysRepository: Repository<SchoolDays>,
    private readonly datasource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  public async create(createSchoolDayDto: CreateSchoolDayDto) {
    const { class_id, date } = createSchoolDayDto;

    const classroom = await this.datasource
      .getRepository(Classes)
      .findOneBy({ id: class_id });

    if (!classroom) {
      const message = this.i18n.t<string>('classes.class_not_found');
      throw new NotFoundException(message);
    }

    const dateClass = new Date(date);
    dateClass.setHours(3);

    const day = dateClass.getDate();
    const year = dateClass.getFullYear();
    const month = dateClass.getMonth() + 1;

    const schoolDay = await this.schoolDaysRepository.save({
      day,
      year,
      month,
      date,
      class_id,
    });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.create_school_day_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t<string>(
      'school_days.create_school_day_success',
    );

    return { message, school_day: schoolDay };
  }

  public async findAll(findAllSchoolDaysDto: FindAllSchoolDaysDto) {
    const { class_id } = findAllSchoolDaysDto;

    const classroom = await this.datasource
      .getRepository(Classes)
      .findOneBy({ id: class_id });

    if (!classroom) {
      const message = this.i18n.t<string>('classes.class_not_found');
      throw new NotFoundException(message);
    }

    return this.schoolDaysRepository.findBy(findAllSchoolDaysDto);
  }

  public async findOne(id: string) {
    const schoolDay = await this.schoolDaysRepository.findOneBy({ id });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.school_day_not_found');
      throw new NotFoundException(message);
    }

    return { school_day: schoolDay };
  }

  public async update(id: string, updateSchoolDayDto: UpdateSchoolDayDto) {
    const schoolDay = await this.schoolDaysRepository.findOneBy({ id });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.school_day_not_found');
      throw new NotFoundException(message);
    }

    const { date } = updateSchoolDayDto;
    const dateClass = new Date(date);
    dateClass.setHours(3);

    const day = dateClass.getDate();
    const year = dateClass.getFullYear();
    const month = dateClass.getMonth() + 1;

    const updateResult = await this.schoolDaysRepository.update(id, {
      day,
      year,
      month,
      date,
    });

    if (!updateResult) {
      const message = this.i18n.t('school_days.update_school_day_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t<string>(
      'school_days.update_school_day_success',
    );

    return { message, school_day: schoolDay };
  }

  public async remove(id: string) {
    const schoolDay = await this.schoolDaysRepository.findOneBy({ id });

    if (!schoolDay) {
      const message = this.i18n.t('school_days.school_day_not_found');
      throw new NotFoundException(message);
    }

    const deleteResult = await this.schoolDaysRepository.softDelete(id);

    if (!deleteResult) {
      const message = this.i18n.t('school_days.remove_school_day_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('school_days.remove_school_day_success');

    return { message };
  }
}
