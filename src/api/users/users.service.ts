import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '@database';
import { CreateUserDto } from './users.interface';
import {  } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const userAlreadyExists = await this.usersRepository.findOneBy({ email });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists.');
    }

    const passwordHash = 


    return {};
  }

}
