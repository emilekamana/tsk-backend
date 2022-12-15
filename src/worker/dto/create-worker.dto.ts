import { IsNotEmpty } from 'class-validator';
import { Image } from '../interfaces/image.interface';

export class CreateWorkerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly shortBio: string;

  readonly longBio?: string;
  image: Image;
}
