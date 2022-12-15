import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDto } from './create-worker.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly shortBio: string;

  readonly longBio?: string;
  readonly ImageUrl?: string;
}
