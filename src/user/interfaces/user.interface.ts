export interface User {
  id?: string;
  names: {
    type: string;
    required: true;
  };
  types: {
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
