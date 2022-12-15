import { Image } from './image.interface';

export interface Worker {
  id?: string;
  name: string;
  readonly userId: string;
  shortBio: string;
  longBio?: string;
  image?: Image;
}
