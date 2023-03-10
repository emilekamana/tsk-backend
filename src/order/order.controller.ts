import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post('approve/:id')
  approve(@Param('id') id: string) {
    return this.orderService.approve(id);
  }

  @Post('decline/:id')
  decline(@Param('id') id: string) {
    return this.orderService.decline(id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('worker/:id')
  findWorker(@Param('id') id: string) {
    return this.orderService.findWorker(id);
  }

  @Get('client/:id')
  findClient(@Param('id') id: string) {
    return this.orderService.findClient(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
