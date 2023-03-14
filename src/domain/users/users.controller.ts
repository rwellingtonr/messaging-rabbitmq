import { InjectQueue } from '@nestjs/bull';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { userPresentation } from './presentation/user.presentation';
import { CreateUser } from './use-cases/create.user';
import { GetImageByUserId } from './use-cases/getImageByUserId';
import { GetUserById } from './use-cases/getUserById';
import { RemoveAvatar } from './use-cases/remove.avatar';

@Controller('api')
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserById: GetUserById,
    private readonly getImageByUserId: GetImageByUserId,
    private readonly removeAvatar: RemoveAvatar,
  ) {}

  @Post('users')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser = await this.createUser.execute(createUserDto);

      const { user } = userPresentation(createdUser.user);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      res.status(error?.status || 400).json({ message: error.message });
    }
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const { user } = await this.getUserById.execute(+id);
      res.json({ user: userPresentation(user) });
    } catch (error) {
      res.status(error?.status || 400).json({ message: error.message });
    }
  }

  @Get('user/:id/avatar')
  async findAll(@Param('id') id: string, @Res() res: Response) {
    try {
      const avatar = await this.getImageByUserId.execute(+id);
      res.status(HttpStatus.OK).json(avatar);
    } catch (error) {
      res.status(error?.status || 400).json({ message: error?.message });
    }
  }

  @Delete('user/:id/avatar')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.removeAvatar.execute(+id);
      res.sendStatus(HttpStatus.OK);
    } catch (error) {
      res.status(error?.status || 400).json({ message: error?.message });
    }
  }
}
