import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'DECLINED'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workerId: {
    type: String,
    required: true,
  },
});
