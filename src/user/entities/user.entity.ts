export class User {
  id?: string;
  name: {
    type: string;
    required: true;
  };
  type: {
    type: string;
    enum: ['CLIENT', 'WORKER', 'ALL'];
    required: true;
  };
  password: string;
  email: {
    type: string;
    required: true;
  };
}
