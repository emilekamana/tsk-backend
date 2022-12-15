import * as mongoose from 'mongoose';

export const WorkerSchema = new mongoose.Schema({
  name: {
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
  imageUrl: {
    type: String,
    required: false,
  },
});
