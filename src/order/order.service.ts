import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './interfaces/order.interface';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create(createOrderDto);
  }

  findAll() {
    return this.orderModel.find();
  }

  findWorker(id: string) {
    return this.orderModel.find({ workerId: id });
  }

  findClient(id: string) {
    return this.orderModel.find({ clientId: id });
  }

  findOne(id: string) {
    return this.orderModel.findOne({ _id: id });
  }

  approve(id: string) {
    return this.orderModel.updateOne({ _id: id }, { status: 'APPROVED' });
  }

  decline(id: string) {
    return this.orderModel.updateOne({ _id: id }, { status: 'DECLINED' });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
