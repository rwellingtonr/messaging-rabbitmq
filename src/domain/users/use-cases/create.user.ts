import { Injectable } from '@nestjs/common';
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
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = new User({
      email: new Email(createUserDto.email),
      first_name: new Username(createUserDto.first_name),
      last_name: new Username(createUserDto.last_name),
    });

    user.createUser();
    const userCreated = await this.userRepository.create(user);

    return {
      user: userCreated,
    };
  }
}
