import { Image } from './image.interface';

export interface Worker {
  id?: string;
  names: string;
  readonly userId: string;
  shortBio: string;
  longBio?: string;
  image?: Image;
}
