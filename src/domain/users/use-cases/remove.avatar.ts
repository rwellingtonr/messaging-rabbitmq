import { Injectable } from '@nestjs/common';
import Error404 from '~/helpers/errors/404.error';
import { IUserRepository } from '~/infra/repository/user/IUserRepository';

@Injectable()
export class RemoveAvatar {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(extId: number) {
    const alreadyExists = await this.userRepository.findByExternalId(extId);

    if (!alreadyExists) {
      throw new Error404(`Could not find this user id ${extId}`);
    }

    await this.userRepository.removeAvatar(extId);
  }
}
