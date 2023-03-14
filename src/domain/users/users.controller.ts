import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDto } from './dto/create-user.dto';
import {
  userPresentation,
  UserPresentationResponse,
} from './presentation/user.presentation';
import { CreateUser } from './use-cases/create.user';
import { GetUserById } from './use-cases/getUserById';

@Controller('api')
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUserById: GetUserById,
  ) {}

  @Post('users')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserPresentationResponse> {
    const { user } = await this.createUser.execute(createUserDto);

    return userPresentation(user);
  }

  // @Get()
  // async findAll() {
  //   return this.usersService.findAll();
  // }

  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    const { user } = await this.getUserById.execute(+id);
    return userPresentation(user);
  }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
