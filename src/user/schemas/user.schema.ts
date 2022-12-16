import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    enum: ['CLIENT', 'WORKER', 'ALL'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
