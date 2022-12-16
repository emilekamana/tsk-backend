import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { clientType } from '../enums/clientType';

export class CreateUserDto {
  @IsNotEmpty()
  readonly names: string;

  @IsEnum(clientType)
  readonly types: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  readonly email: string;
}
