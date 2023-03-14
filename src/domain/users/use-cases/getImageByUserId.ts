import { Injectable } from '@nestjs/common';
import Error404 from '~/helpers/errors/404.error';
import { readFileAsync } from '~/helpers/fileSystem';
import { GatewayService } from '~/infra/gateway/gateway.service';
import { IUserRepository } from '~/infra/repository/user/IUserRepository';

import { Email } from '../entities/email.entity';
import { User } from '../entities/user.entity';
import { Username } from '../entities/userName.entity';

@Injectable()
export class GetImageByUserId {
  constructor(
    private readonly gateway: GatewayService,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(extId: number) {
    try {
      const alreadyExists = await this.userRepository.findByExternalId(extId);

      if (alreadyExists?.avatar?.length) {
        const avatarBase64 = await readFileAsync(alreadyExists?.avatar);
        return {
          avatar: avatarBase64,
        };
      }

      const { file, user } = await this.gateway.download(extId);

      const userSchema = new User({
        email: new Email(user.data.email),
        first_name: new Username(user.data.first_name),
        last_name: new Username(user.data.last_name),
        avatar: file.name,
        external_id: extId,
      });

      alreadyExists
        ? await this.userRepository.updateUser(extId, userSchema)
        : await this.userRepository.create(userSchema);

      return {
        avatar: file.base64,
      };
    } catch (error) {
      console.log(error);

      throw new Error404(`Cound not fint this client id ${extId}`);
    }
  }
}
