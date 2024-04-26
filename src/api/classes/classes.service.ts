import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { DataSource, Repository } from 'typeorm';
import { CreateClassDto, UpdateClassDto } from './classes.interface';
import { Classes, Users } from '@database';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classes)
    private readonly classesRepository: Repository<Classes>,
    private readonly datasource: DataSource,
    private readonly i18n: I18nService,
  ) {}

  public async create(createClassDto: CreateClassDto) {
    const { user_id } = createClassDto;

    const user = await this.datasource
      .getRepository(Users)
      .findOneBy({ id: user_id });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    const classroom = await this.classesRepository.save(createClassDto);

    if (!classroom) {
      const message = this.i18n.t('classes.create_class_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('classes.create_class_success');

    return { message, class: classroom };
  }

  public async findAll() {
    return `This action returns all classes`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  public async update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
