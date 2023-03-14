import { Injectable } from '@nestjs/common';
import Error404 from '~/helpers/errors/404.error';
import { GatewayService } from '~/infra/gateway/gateway.service';

import { Email } from '../entities/email.entity';
import { User } from '../entities/user.entity';
import { Username } from '../entities/userName.entity';

interface GetUserByIdResponse {
  user: User;
}

@Injectable()
export class GetUserById {
  constructor(private readonly gateway: GatewayService) {}

  async execute(userId: number): Promise<GetUserByIdResponse> {
    try {
      const userFound = await this.gateway.findById(userId);
      const user = new User({
        email: new Email(userFound.data.email),
        first_name: new Username(userFound.data.first_name),
        last_name: new Username(userFound.data.last_name),
        avatar: userFound.data.avatar,
      });
      return { user };
    } catch (error) {
      throw new Error404(`Cound not fint this client id ${userId}`);
    }
  }
}
