import { Injectable } from '@nestjs/common';
import Error400 from '~/helpers/errors/400.error';
import Error404 from '~/helpers/errors/404.error';
import { deleteFile } from '~/helpers/fileSystem';
import { IUserRepository } from '~/infra/repository/user/IUserRepository';

@Injectable()
export class RemoveAvatar {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(extId: number) {
    const alreadyExists = await this.userRepository.findByExternalId(extId);

    if (!alreadyExists) {
      throw new Error404(`Could not find this user id ${extId}`);
    }

    if (!alreadyExists.avatar?.length) {
      throw new Error400('This user dont have any avatar');
    }

    await Promise.all([
      this.userRepository.removeAvatar(extId),
      deleteFile(alreadyExists.avatar),
    ]);
  }
}
