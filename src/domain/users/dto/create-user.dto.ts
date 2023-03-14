import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;
}
