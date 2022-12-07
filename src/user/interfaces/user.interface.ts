export interface User {
  id?: number;
  name: {
    type: string;
    required: true;
  };
  type: {
    type: string;
    enum: ['Client', 'Provider', 'All'];
    required: true;
  };
  password: {
    type: string;
    required: true;
  };
  email: {
    type: string;
    required: true;
  };
}
