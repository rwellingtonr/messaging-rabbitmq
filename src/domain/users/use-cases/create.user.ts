import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bull';
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
    @InjectQueue('sendMail-queue') private queue: Queue,
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
    this.clientRabbit
      .emit(
        'created-user',
        `username ${user.firstName.value} ${user.lastName.value}`,
      )
      .subscribe({
        complete: () => console.log('ok'),
        error: (err) => console.error(err),
      });
    await this.queue.add('sendMail-job', {
      email: user.email.value,
      firstName: user.firstName.value,
    });
    return {
      user: userCreated,
    };
  }
}
