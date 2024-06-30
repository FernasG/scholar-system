import { Annotations, SchoolDays } from '@database';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { DataSource, Repository } from 'typeorm';
import { CreateAnnotationsDto, UpdateAnnotationsDto } from './annotations.interface';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectRepository(Annotations)
    private readonly annotationsRepository: Repository<Annotations>,
    private readonly datasource: DataSource,
    private readonly i18n: I18nService,
  ) { }

  public async create(createAnnotationsDto: CreateAnnotationsDto) {
    const { school_day_id } = createAnnotationsDto;

    const schoolDay = await this.datasource
      .getRepository(SchoolDays)
      .findOne({ where: { id: school_day_id } })

    if (!schoolDay) throw new NotFoundException();

    const annotation = await this.annotationsRepository
      .save({ school_day_id });

    if (!annotation) throw new InternalServerErrorException()

    return { message: '', annotation };
  }

  public async update(id: string, updateAnnotationsDto: UpdateAnnotationsDto) {
    const annotation = this.annotationsRepository.findOneBy({ id });

    if (!annotation) throw new NotFoundException();

    const { text } = updateAnnotationsDto;

    const updateResult = await this.annotationsRepository.update(id, { text });

    if (!updateResult) throw new InternalServerErrorException();

    return { message: '', annotation };
  }
}