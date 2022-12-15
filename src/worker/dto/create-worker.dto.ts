import { IsNotEmpty } from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly userId: string;

  @IsNotEmpty()
  readonly shortBio: string;

  readonly longBio?: string;
  imageUrl?: string;
}
