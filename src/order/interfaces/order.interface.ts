import { Status } from '../enums/status';

export interface Order {
  id?: string;
  clientId: string;
  workerId: string;
  description: string;
  status: Status;
}
