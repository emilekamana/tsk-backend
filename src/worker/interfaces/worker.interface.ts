export interface Worker {
  id?: string;
  name: string;
  readonly userId: string;
  shortBio: string;
  longBio?: string;
  imageUrl?: string;
}
