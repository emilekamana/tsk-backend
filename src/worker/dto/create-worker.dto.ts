import { IsNotEmpty } from 'class-validator';
import { Image } from '../interfaces/image.interface';

export class CreateWorkerDto {
  @IsNotEmpty()
  readonly names: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly price: string;

  @IsNotEmpty()
  readonly tags: Array<string>;

  @IsNotEmpty()
  readonly shortBio: string;

  readonly longBio?: string;
  image: Image;
}
