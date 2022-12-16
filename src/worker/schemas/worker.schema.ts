import * as mongoose from 'mongoose';
import { imageSchema } from './image.schema';

export const WorkerSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    default: '20$',
  },
  tags: {
    type: Array<string>,
    required: true,
    default: ['Web development', 'Javascript'],
  },
  shortBio: {
    type: String,
    required: true,
  },
  longBio: {
    type: String,
    required: false,
  },
  image: {
    type: imageSchema,
    required: false,
  },
});
