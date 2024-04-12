import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { Repository } from 'typeorm';
import { Users } from '@database';
import {
  CreateUserDto,
  ENCRYPT_SALT_ROUNDS,
  UpdateUserDto,
} from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly i18n: I18nService,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const { username, email, password: pass } = createUserDto;

    const emailAlreadyTaken = await this.usersRepository.findOneBy({ email });

    if (emailAlreadyTaken) {
      const message = this.i18n.t('users.email_already_used');
      throw new BadRequestException(message);
    }

    const password = bcrypt.hashSync(pass, ENCRYPT_SALT_ROUNDS);
    const data = { username, email, password };

    const user = await this.usersRepository.save(data);

    if (!user) {
      const message = this.i18n.t('users.create_user_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('users.create_user_success');

    return { message, user };
  }

  public async findAll() {
    return this.usersRepository.find();
  }

  public async findOne(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    return { user };
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    const { username, password: pass } = updateUserDto;

    const password = bcrypt.hashSync(pass, ENCRYPT_SALT_ROUNDS);

    const updateResult = await this.usersRepository.update(id, {
      username,
      password,
    });

    if (!updateResult) {
      const message = this.i18n.t('users.update_user_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('users.update_user_success');

    return { message, user };
  }

  public async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      const message = this.i18n.t('users.user_not_found');
      throw new NotFoundException(message);
    }

    const deleteResult = await this.usersRepository.softDelete(id);

    if (!deleteResult) {
      const message = this.i18n.t('users.remove_user_failed');
      throw new InternalServerErrorException(message);
    }

    const message = this.i18n.t('users.remove_user_success');

    return { message };
  }
}
