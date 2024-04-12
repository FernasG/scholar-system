import { Test } from '@nestjs/testing';
import { LocalAuthGuard } from '@guards';
import { AuthenticationService } from '@authentication';
import { UsersController } from '../../../src/api/users/users.controller';
import { UsersService } from '../../../src/api/users/users.service';
import {
  authenticationServiceMock,
  guardMock,
  usersServiceMock,
} from './users.mocks';

describe('Test UsersController', () => {
  let authenticationService: AuthenticationService;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceMock,
        },
      ],
    })
      .overrideGuard(LocalAuthGuard)
      .useValue(guardMock)
      .compile();

    authenticationService = moduleRef.get<AuthenticationService>(
      AuthenticationService,
    );
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('Controller and Service should be defined', () => {
    expect(authenticationService).toBeDefined();
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it('Controller should call create method in service', async () => {
    const payload = {
      username: 'User',
      email: 'user@gmail.com',
      password: '123456',
    };
    await usersController.create(payload);

    expect(usersService.create).toHaveBeenCalled();
    expect(usersService.create).toHaveBeenCalledWith(payload);
  });

  it('Controller should call login method in authentication service', async () => {
    const userData = {
      username: 'User',
      email: 'user@gmail.com',
    };
    const payload = { user: userData };
    await usersController.login(payload);

    expect(authenticationService.login).toHaveBeenCalled();
    expect(authenticationService.login).toHaveBeenCalledWith(userData);
  });

  it('Controller should call findAll method in service', async () => {
    await usersController.findAll();

    expect(usersService.create).toHaveBeenCalled();
  });

  it('Controller should call findOne method in service', async () => {
    const userId = '20256d22-2f80-4774-98e5-a0d9501a54d3';
    await usersController.findOne(userId);

    expect(usersService.findOne).toHaveBeenCalled();
    expect(usersService.findOne).toHaveBeenCalledWith(userId);
  });

  it('Controller should call update method in service', async () => {
    const userId = 'ad237de7-3862-4e18-be9f-dcfb5d44c62e';
    const payload = {
      username: 'User',
      password: '123456',
    };
    await usersController.update(userId, payload);

    expect(usersService.update).toHaveBeenCalled();
    expect(usersService.update).toHaveBeenCalledWith(userId, payload);
  });

  it('Controller should call remove method in service', async () => {
    const userId = 'ad4a5bc9-bab4-4b0a-b9bb-67ac24b2fa16';
    await usersController.remove(userId);

    expect(usersService.remove).toHaveBeenCalled();
    expect(usersService.remove).toHaveBeenCalledWith(userId);
  });
});
