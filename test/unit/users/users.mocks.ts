import { CanActivate } from '@nestjs/common';

export const guardMock: CanActivate = { canActivate: jest.fn(() => true) };

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
