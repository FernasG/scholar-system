import { CreateClassData, ClassData, UpdateClassData } from './classes.data';

const usersIds = [
  'dd5adcff-2fdf-4589-b8cb-666908714ba7',
  '2cc7d76a-c549-4319-b003-94c2a0238f2a',
];

const classIds = [
  'f61082c5-2817-49c8-9330-b50e3e1f5fd2',
  '734f1e12-d175-418e-8814-9b8e8150d2af',
];

export const classesServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const i18nServiceMock = {
  t: jest.fn((msg: string) => msg),
};

export const classesRepositoryMock = {
  findOneBy: jest.fn((...params: any) => {
    const [{ id, name }] = params;

    if (name === 'Class Name Used') return { name: 'Class Name Used' };

    if (id && !classIds.includes(id)) return null;

    if ([CreateClassData.name, UpdateClassData.name].includes(name))
      return null;

    return ClassData;
  }),
  save: jest.fn((...params: any) => {
    const [classrom] = params;

    if (classrom.description !== CreateClassData.description) return null;

    return classrom;
  }),
  find: jest.fn(() => []),
  findOne: jest.fn((...params: any) => {
    const [
      {
        where: { id },
      },
    ] = params;

    if (id === ClassData.id) return ClassData;

    return null;
  }),
  update: jest.fn((...params: any) => {
    const [_, { description }] = params;

    if (description !== UpdateClassData.description) return null;

    return { ...params };
  }),
  softDelete: jest.fn((...params: any) => {
    const [id] = params;

    if (id === classIds.at(0)) return true;

    return null;
  }),
};

export const datasourceMock = {
  getRepository: jest.fn(() => ({
    findOneBy: jest.fn((...params: any) => {
      const [{ id }] = params;

      if (usersIds.includes(id)) return { id };

      return null;
    }),
  })),
};
