import { CanActivate } from '@nestjs/common';
import { CreateUserData, UserData } from './users.data';

export const guardMock: CanActivate = { canActivate: jest.fn(() => true) };
const userIds = [
  'cab8805c-0f91-495f-ac44-eecdd54c77b2',
  'f97db887-9e4e-4775-a0f0-f74353d88035',
];

export const usersServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

export const authenticationServiceMock = {
  login: jest.fn(),
};

export const i18nServiceMock = {
  t: jest.fn((msg: string) => msg),
};

export const usersRepositoryMock = {
  findOneBy: jest.fn((...params: any) => {
    const [{ id, email }] = params;

    if (id && userIds.includes(id)) return UserData;

    if (email === CreateUserData.email) return undefined;

    if (!email) return null;

    return { email };
  }),
  save: jest.fn((...params: any) => {
    const [user] = params;

    if (user.username !== CreateUserData.username) return null;

    return user;
  }),
  find: jest.fn(() => []),
  update: jest.fn((...params: any) => {
    const [_, { username }] = params;

    if (username !== 'User') return null;

    return { ...params };
  }),
  softDelete: jest.fn((...params: any) => {
    const [id] = params;

    if (id === userIds.at(0)) return true;

    return null;
  }),
};

export const bcryptMock = {
  hashSync: jest.fn((...params: any) => {
    return 'hashed-password';
  }),
};
