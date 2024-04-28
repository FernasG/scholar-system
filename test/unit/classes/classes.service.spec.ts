import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Classes } from '@database';
import { ClassesService } from '../../../src/api/classes/classes.service';
import { CreateClassData, UpdateClassData } from './classes.data';
import {
  classesRepositoryMock,
  datasourceMock,
  i18nServiceMock,
} from './classes.mocks';

describe('Test UsersService', () => {
  let classesRepository: Repository<Classes>;
  let classesService: ClassesService;
  let i18nService: I18nService;
  let datasource: DataSource;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ClassesService,
        {
          provide: I18nService,
          useValue: i18nServiceMock,
        },
        {
          provide: DataSource,
          useValue: datasourceMock,
        },
        {
          provide: getRepositoryToken(Classes),
          useValue: classesRepositoryMock,
        },
      ],
    }).compile();

    classesRepository = moduleRef.get<any>(getRepositoryToken(Classes));
    classesService = moduleRef.get<ClassesService>(ClassesService);
    i18nService = moduleRef.get<I18nService>(I18nService);
    datasource = moduleRef.get<DataSource>(DataSource);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service providers should be defined', () => {
    expect(classesRepository).toBeDefined();
    expect(classesService).toBeDefined();
    expect(i18nService).toBeDefined();
    expect(datasource).toBeDefined();
  });

  it('Service should create a new class', async () => {
    const response = await classesService.create(CreateClassData);

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.save).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalled();
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('class');
    expect(response.message).toBe('classes.create_class_success');
  });

  it('Service create should throw error when user not found', async () => {
    const payload = Object.assign({}, CreateClassData);
    payload.user_id = 'ca1855b1-d262-4383-97fa-849675cfb012';
    await expect(async () => classesService.create(payload)).rejects.toThrow(
      'users.user_not_found',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.save).not.toHaveBeenCalled();
  });

  it('Service should throw error when class name already in use', async () => {
    const payload = Object.assign({}, CreateClassData);
    payload.name = 'Class Name Used';
    await expect(async () => classesService.create(payload)).rejects.toThrow(
      'classes.class_name_already_in_use',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalled();
    expect(classesRepository.save).not.toHaveBeenCalled();
  });

  it('Service should throw error when save class fails', async () => {
    const payload = Object.assign({}, CreateClassData);
    payload.description = 'Class School 001';
    await expect(async () => classesService.create(payload)).rejects.toThrow(
      'classes.create_class_failed',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.save).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalled();
  });

  it('Service should list all classes by user', async () => {
    const data = { user_id: 'dd5adcff-2fdf-4589-b8cb-666908714ba7' };
    const response = await classesService.findAll(data);

    expect(i18nService.t).not.toHaveBeenCalled();
    expect(classesRepository.find).toHaveBeenCalledWith({ where: data });
    expect(response).toBeDefined();
    expect(response).toStrictEqual([]);
  });

  it('Service findAll should throw error when user not found', async () => {
    const data = { user_id: '7417a6d1-9c92-469f-a8e1-818953064b13' };

    await expect(async () => classesService.findAll(data)).rejects.toThrow(
      'users.user_not_found',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.find).not.toHaveBeenCalled();
  });

  it('Service should find one class by ID', async () => {
    const classId = 'f61082c5-2817-49c8-9330-b50e3e1f5fd2';
    const response = await classesService.findOne(classId);

    expect(i18nService.t).not.toHaveBeenCalled();
    expect(classesRepository.findOne).toHaveBeenCalledWith({
      where: { id: classId },
    });
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('class');
    expect(response.class.id).toBe(classId);
  });

  it('Service findOne should throw error when not found class', async () => {
    const userId = '8687872f-e02d-4d36-b353-cc50a384a8b2';
    await expect(async () => classesService.findOne(userId)).rejects.toThrow(
      'classes.class_not_found',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOne).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });

  it('Service should update class', async () => {
    const classId = 'f61082c5-2817-49c8-9330-b50e3e1f5fd2';
    const response = await classesService.update(classId, UpdateClassData);

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.update).toHaveBeenCalledWith(
      classId,
      UpdateClassData,
    );
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('classes.update_class_success');
    expect(response).toHaveProperty('class');
  });

  it('Service update should throw error when class not found', async () => {
    const classId = '72776fed-9961-4858-9693-82005f644c6f';
    await expect(
      async () => await classesService.update(classId, UpdateClassData),
    ).rejects.toThrow('classes.class_not_found');

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.update).not.toHaveBeenCalled();
  });

  it('Service should throw error when new class name already in use', async () => {
    const classId = 'f61082c5-2817-49c8-9330-b50e3e1f5fd2';
    const payload = Object.assign({}, UpdateClassData);
    payload.name = 'Class Name Used';
    await expect(
      async () => await classesService.update(classId, payload),
    ).rejects.toThrow('classes.class_name_already_in_use');

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.update).not.toHaveBeenCalled();
  });

  it('Service should throw error when fails to update class', async () => {
    const userId = 'f61082c5-2817-49c8-9330-b50e3e1f5fd2';
    const payload = Object.assign({}, UpdateClassData);
    payload.description = 'Class Description';
    await expect(
      async () => await classesService.update(userId, payload),
    ).rejects.toThrow('classes.update_class_failed');

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(classesRepository.update).toHaveBeenCalledWith(userId, payload);
  });

  it('Service should remove class', async () => {
    const classId = 'f61082c5-2817-49c8-9330-b50e3e1f5fd2';
    const response = await classesService.remove(classId);

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.softDelete).toHaveBeenCalledWith(classId);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('classes.remove_class_success');
  });

  it('Service remove should throw error when class not found', async () => {
    const classId = '72776fed-9961-4858-9693-82005f644c6f';
    await expect(
      async () => await classesService.remove(classId),
    ).rejects.toThrow('classes.class_not_found');

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.softDelete).not.toHaveBeenCalled();
  });

  it('Service should throw error when fails to remove class', async () => {
    const classId = '734f1e12-d175-418e-8814-9b8e8150d2af';
    await expect(
      async () => await classesService.remove(classId),
    ).rejects.toThrow('classes.remove_class_failed');

    expect(i18nService.t).toHaveBeenCalled();
    expect(classesRepository.findOneBy).toHaveBeenCalledWith({ id: classId });
    expect(classesRepository.softDelete).toHaveBeenCalledWith(classId);
  });
});
