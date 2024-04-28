import { Test } from '@nestjs/testing';
import { ClassesController } from '../../../src/api/classes/classes.controller';
import { ClassesService } from '../../../src/api/classes/classes.service';
import { classesServiceMock } from './classes.mocks';
import { CreateClassData, UpdateClassData } from './classes.data';

describe('Test ClassesController', () => {
  let classesController: ClassesController;
  let classesService: ClassesService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClassesController],
      providers: [
        {
          provide: ClassesService,
          useValue: classesServiceMock,
        },
      ],
    }).compile();

    classesController = moduleRef.get<ClassesController>(ClassesController);
    classesService = moduleRef.get<ClassesService>(ClassesService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Controller and Service should be defined', () => {
    expect(classesController).toBeDefined();
    expect(classesService).toBeDefined();
  });

  it('Controller should call create method in service', async () => {
    await classesController.create(CreateClassData);

    expect(classesService.create).toHaveBeenCalled();
    expect(classesService.create).toHaveBeenCalledWith(CreateClassData);
  });

  it('Controller should call findAll method in service', async () => {
    const userId = 'daddef9f-3c13-430b-8ade-30679d07a5a1';
    await classesController.findAll({ user_id: userId });

    expect(classesService.findAll).toHaveBeenCalled();
    expect(classesService.findAll).toHaveBeenCalledWith({ user_id: userId });
  });

  it('Controller should call findOne method in service', async () => {
    const classId = 'd076cf6d-b4e2-485f-8831-bfba6a5c6062';
    await classesController.findOne(classId);

    expect(classesService.findOne).toHaveBeenCalled();
    expect(classesService.findOne).toHaveBeenCalledWith(classId);
  });

  it('Controller should call update method in service', async () => {
    const classId = 'ad237de7-3862-4e18-be9f-dcfb5d44c62e';
    await classesController.update(classId, UpdateClassData);

    expect(classesService.update).toHaveBeenCalled();
    expect(classesService.update).toHaveBeenCalledWith(
      classId,
      UpdateClassData,
    );
  });

  it('Controller should call remove method in service', async () => {
    const classId = '3df59a06-7a3e-4b73-8c95-a18ad07431da';
    await classesController.remove(classId);

    expect(classesService.remove).toHaveBeenCalled();
    expect(classesService.remove).toHaveBeenCalledWith(classId);
  });
});
