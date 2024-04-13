import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { Users } from '@database';
import {
  bcryptMock,
  i18nServiceMock,
  usersRepositoryMock,
} from './users.mocks';
import { UsersService } from '../../../src/api/users/users.service';
import { CreateUserData, UpdateUserData } from './users.data';

jest.mock(
  'bcrypt',
  jest.fn(() => bcryptMock),
);

describe('Test UsersService', () => {
  let usersRepository: Repository<Users>;
  let usersService: UsersService;
  let i18nService: I18nService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: I18nService,
          useValue: i18nServiceMock,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: usersRepositoryMock,
        },
      ],
    }).compile();

    usersRepository = moduleRef.get<any>(getRepositoryToken(Users));
    usersService = moduleRef.get<UsersService>(UsersService);
    i18nService = moduleRef.get<I18nService>(I18nService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Service providers should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(usersService).toBeDefined();
    expect(i18nService).toBeDefined();
  });

  it('Service should create a new user', async () => {
    const response = await usersService.create(CreateUserData);

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.save).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalled();
    expect(bcryptMock.hashSync).toHaveBeenCalledWith(
      CreateUserData.password,
      10,
    );
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('user');
    expect(response.message).toBe('users.create_user_success');
  });

  it('Service should throw error for email in use', async () => {
    const payload = Object.assign({}, CreateUserData);
    payload.email = 'user01@email.com';
    await expect(async () => usersService.create(payload)).rejects.toThrow(
      'users.email_already_used',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.save).not.toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalled();
    expect(bcryptMock.hashSync).not.toHaveBeenCalled();
  });

  it('Service should throw error when save users fails', async () => {
    const payload = Object.assign({}, CreateUserData);
    payload.username = 'User002';
    await expect(async () => usersService.create(payload)).rejects.toThrow(
      'users.create_user_failed',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.save).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalled();
    expect(bcryptMock.hashSync).toHaveBeenCalled();
  });

  it('Service should list all users', async () => {
    const response = await usersService.findAll();

    expect(i18nService.t).not.toHaveBeenCalled();
    expect(usersRepository.find).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response).toStrictEqual([]);
  });

  it('Service should find one user by ID', async () => {
    const userId = 'cab8805c-0f91-495f-ac44-eecdd54c77b2';
    const response = await usersService.findOne(userId);

    expect(i18nService.t).not.toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(response).toBeInstanceOf(Object);
    expect(response).toHaveProperty('user');
    expect(response.user.id).toBe(userId);
  });

  it('Service should throw error when not found user in findOne', async () => {
    const userId = 'ef4f13e1-4704-41dc-a394-dcb098ea063f';
    await expect(async () => usersService.findOne(userId)).rejects.toThrow(
      'users.user_not_found',
    );

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
  });

  it('Service should update user', async () => {
    const userId = 'cab8805c-0f91-495f-ac44-eecdd54c77b2';
    const response = await usersService.update(userId, UpdateUserData);

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.update).toHaveBeenCalledWith(userId, UpdateUserData);
    expect(bcryptMock.hashSync).toHaveBeenCalled();
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('users.update_user_success');
    expect(response).toHaveProperty('user');
  });

  it('Service should throw error when not found user in update', async () => {
    const userId = '72776fed-9961-4858-9693-82005f644c6f';
    await expect(
      async () => await usersService.update(userId, UpdateUserData),
    ).rejects.toThrow('users.user_not_found');

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.update).not.toHaveBeenCalled();
    expect(bcryptMock.hashSync).not.toHaveBeenCalled();
  });

  it('Service should throw error when fails to update user', async () => {
    const userId = 'cab8805c-0f91-495f-ac44-eecdd54c77b2';
    const payload = Object.assign({}, UpdateUserData);
    payload.username = 'User007';
    await expect(
      async () => await usersService.update(userId, payload),
    ).rejects.toThrow('users.update_user_failed');

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.update).toHaveBeenCalledWith(userId, payload);
    expect(bcryptMock.hashSync).toHaveBeenCalled();
  });

  it('Service should remove user', async () => {
    const userId = 'cab8805c-0f91-495f-ac44-eecdd54c77b2';
    const response = await usersService.remove(userId);

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.softDelete).toHaveBeenCalledWith(userId);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('users.remove_user_success');
  });

  it('Service should throw error when not found user in remove', async () => {
    const userId = '72776fed-9961-4858-9693-82005f644c6f';
    await expect(
      async () => await usersService.remove(userId),
    ).rejects.toThrow('users.user_not_found');

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.softDelete).not.toHaveBeenCalled();
  });

  it('Service should throw error when fails to remove user', async () => {
    const userId = 'f97db887-9e4e-4775-a0f0-f74353d88035';
    await expect(
      async () => await usersService.remove(userId),
    ).rejects.toThrow('users.remove_user_failed');

    expect(i18nService.t).toHaveBeenCalled();
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(usersRepository.softDelete).toHaveBeenCalledWith(userId);
  });
});
