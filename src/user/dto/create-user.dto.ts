export class CreateUserDto {
  readonly name: {
    type: string;
    required: true;
  };
  readonly type: {
    type: string;
    enum: ['Client', 'Provider', 'All'];
    required: true;
  };
  password: {
    type: string;
    required: true;
  };
  readonly email: {
    type: string;
    required: true;
  };
}
