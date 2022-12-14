export class User {
  id?: string;
  name: {
    type: string;
    required: true;
  };
  type: {
    type: string;
    enum: ['Client', 'Provider', 'All'];
    required: true;
  };
  password: string;
  email: {
    type: string;
    required: true;
  };
}
