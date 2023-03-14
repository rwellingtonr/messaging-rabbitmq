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

import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { userPresentation } from './presentation/user.presentation';
import { CreateUser } from './use-cases/create.user';
import { GetImageByUserId } from './use-cases/getImageByUserId';
import { GetUserById } from './use-cases/getUserById';
import { RemoveAvatar } from './use-cases/remove.avatar';

@ApiTags('Users')
@Controller('api')
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserById: GetUserById,
    private readonly getImageByUserId: GetImageByUserId,
    private readonly removeAvatar: RemoveAvatar,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'User created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                avatar: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
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

  @ApiResponse({
    status: 200,
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                email: { type: 'string' },
                first_name: { type: 'string' },
                last_name: { type: 'string' },
                avatar: { type: 'string' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('user/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const { user } = await this.getUserById.execute(+id);
      res.json({ user: userPresentation(user) });
    } catch (error) {
      res.status(error?.status || 400).json({ message: error.message });
    }
  }
  @ApiResponse({
    status: 200,
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            avatar: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @Get('user/:id/avatar')
  async findAll(@Param('id') id: string, @Res() res: Response) {
    try {
      const avatar = await this.getImageByUserId.execute(+id);
      res.status(HttpStatus.OK).json(avatar);
    } catch (error) {
      res.status(error?.status || 400).json({ message: error?.message });
    }
  }
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
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
