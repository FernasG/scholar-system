import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import {
  CreateClassDto,
  FindAllClassesDto,
  UpdateClassDto,
  UpdateClassStudentsDto,
} from './classes.interface';
import { Classes, ClassesStudents, Users } from '@database';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
    private readonly datasource: DataSource,
    private readonly i18n: I18nService,
  ) { }

  public async create(createClassDto: CreateClassDto) {
    const { user_id, name } = createClassDto;

    const user = await this.datasource
      .getRepository(Users)
      .findOneBy({ id: user_id });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    const classExists = await this.classesRepository.findOneBy({
      name,
      user_id,
    });

    if (classExists) {
      const message = this.i18n.t('classes.class_name_already_in_use');
      throw new BadRequestException(message);
    }

    const classroom = await this.classesRepository.save(createClassDto);

    if (!classroom) {
      const message = this.i18n.t('classes.create_class_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('classes.create_class_success');

    return { message, class: classroom };
  }

  public async findAll(findAllClassesDto: FindAllClassesDto) {
    const { user_id } = findAllClassesDto;

    const user = await this.datasource
      .getRepository(Users)
      .findOneBy({ id: user_id });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    return this.classesRepository.find({ where: findAllClassesDto });
  }

  public async findOne(id: string) {
    const classroom = await this.classesRepository.findOne({ where: { id } });

    if (!classroom) {
      const message = this.i18n.t('classes.class_not_found');
      throw new NotFoundException(message);
    }

    return { class: classroom };
  }

  public async update(id: string, updateClassDto: UpdateClassDto) {
    const classroom = await this.classesRepository.findOneBy({ id });

    if (!classroom) {
      const message = this.i18n.t('classes.class_not_found');
      throw new NotFoundException(message);
    }

    const { name, description } = updateClassDto;

    const data: UpdateClassDto = {};

    if (name) {
      const classExists = await this.classesRepository.findOneBy({
        name,
        user_id: classroom.user_id,
      });

      if (classExists) {
        const message = this.i18n.t('classes.class_name_already_in_use');
        throw new BadRequestException(message);
      }

      data.name = name;
    }

    if (description) data.description = description;

    const updateResult = await this.classesRepository.update(id, data);

    if (!updateResult) {
      const message = this.i18n.t('classes.update_class_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('classes.update_class_success');

    return { message, class: classroom };
  }

  public async updateStudents(id: string, updateClassStudentsDto: UpdateClassStudentsDto) {
    const classroom = await this.classesRepository.findOneBy({ id });

    if (!classroom) {
      const message = this.i18n.t('classes.class_not_found');
      throw new NotFoundException(message);
    }

    const { students } = updateClassStudentsDto;

    await this.datasource
      .getRepository(ClassesStudents)
      .delete({ class_id: classroom.id })

    const classStudents = students.map((studentId) => ({ class_id: classroom.id, student_id: studentId }));

    await this.datasource
      .getRepository(ClassesStudents)
      .save(classStudents);

    return { status: 'OK' };
  }

  public async remove(id: string) {
    const classroom = await this.classesRepository.findOneBy({ id });

    if (!classroom) {
      const message = this.i18n.t('classes.class_not_found');
      throw new NotFoundException(message);
    }

    const deleteResult = await this.classesRepository.softDelete(id);

    if (!deleteResult) {
      const message = this.i18n.t('classes.remove_class_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('classes.remove_class_success');

    return { message };
  }
}
