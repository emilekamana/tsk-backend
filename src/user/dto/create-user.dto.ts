import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { clientType } from '../enums/clientType';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEnum(clientType)
  readonly type: {
    type: string;
    enum: ['CLIENT', 'WORKER', 'ALL'];
  };

  @IsNotEmpty()
  password: string;

  @IsEmail()
  readonly email: string;
}
