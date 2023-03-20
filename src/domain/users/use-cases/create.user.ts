import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import Error409 from '~/helpers/errors/409.error';
import { IUserRepository } from '~/infra/repository/user/IUserRepository';
import { CreateUserDto } from '../dto/create-user.dto';
import { Email } from '../entities/email.entity';
import { User } from '../entities/user.entity';
import { Username } from '../entities/userName.entity';

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(
    private readonly userRepository: IUserRepository,
    @Inject('MESSAGE') private clientRabbit: ClientProxy,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = new User({
      email: new Email(createUserDto.email),
      first_name: new Username(createUserDto.first_name),
      last_name: new Username(createUserDto.last_name),
    });

    const alreadyExis = await this.userRepository.findByEmail(user.email.value);
    if (alreadyExis) {
      throw new Error409('Email duplicated');
    }

    user.createUser();
    const userCreated = await this.userRepository.create(user);

    this.clientRabbit.emit('created-user', {
      email: user.email.value,
      firstName: user.firstName.value,
    });

    console.log('Created user!');

    return {
      user: userCreated,
    };
  }
}
