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
