import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto, UpdateStudentDto } from './students.interface';
import { Students } from '@database';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private readonly studentsRepository: Repository<Students>,
    private readonly i18n: I18nService,
  ) {}

  public async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentsRepository.save(createStudentDto);

    if (!student) {
      const message = this.i18n.t('students.create_student_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('students.create_student_success');

    return { message, student };
  }

  public async findAll() {
    return this.studentsRepository.find();
  }

  public async findOne(id: string) {
    const student = await this.studentsRepository.findOneBy({ id });

    if (!student) {
      const message = this.i18n.t('students.student_not_found');
      throw new NotFoundException(message);
    }

    return { student };
  }

  public async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentsRepository.findOneBy({ id });

    if (!student) {
      const message = this.i18n.t('students.student_not_found');
      throw new NotFoundException(message);
    }

    if (!Object.keys(updateStudentDto).length) {
      const message = this.i18n.t('system.invalid_request');
      throw new BadRequestException(message);
    }

    const updateResult = await this.studentsRepository.update(
      id,
      updateStudentDto,
    );

    if (!updateResult) {
      const message = this.i18n.t('students.update_student_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('students.update_student_success');

    return { message, student };
  }

  public async remove(id: string) {
    const student = await this.studentsRepository.findOneBy({ id });

    if (!student) {
      const message = this.i18n.t('students.student_not_found');
      throw new NotFoundException(message);
    }

    const deleteResult = await this.studentsRepository.softDelete(id);

    if (!deleteResult) {
      const message = this.i18n.t('students.remove_student_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('students.remove_student_success');

    return { message };
  }
}
