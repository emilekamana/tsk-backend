import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { clientType } from '../enums/clientType';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  readonly names: string;

  @IsEnum(clientType)
  readonly types: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  readonly email: string;
}
