import { IsEnum, IsNotEmpty } from 'class-validator';
import { Status } from '../enums/status';

export class CreateOrderDto {
  @IsNotEmpty()
  clientId: string;
  @IsNotEmpty()
  workerId: string;
  @IsNotEmpty()
  description: string;
  @IsEnum(Status)
  status: string;
  date: Date;
}
