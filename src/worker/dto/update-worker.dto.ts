import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDto } from './create-worker.dto';
import { IsNotEmpty } from 'class-validator';
import { Image } from '../interfaces/image.interface';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  @IsNotEmpty()
  readonly names: string;

  @IsNotEmpty()
  readonly tags: Array<string>;

  @IsNotEmpty()
  readonly shortBio: string;

  @IsNotEmpty()
  readonly price: string;

  readonly longBio?: string;
  image?: Image;
}
