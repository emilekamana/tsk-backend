import * as mongoose from 'mongoose';

export const imageSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
});
