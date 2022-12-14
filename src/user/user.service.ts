import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class UserService {
  saltOrRounds = 10;
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(
    res: Response,
    createUserDto: CreateUserDto,
  ): Promise<Response | User> {
    const userEmailExists = await this.findByEmail(createUserDto.email);
    if (userEmailExists) {
      return res.status(400).send('Email already taken');
    }
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    return res.status(400).send(await this.userModel.create(createUserDto));
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<User | undefined | null> {
    return await this.userModel.findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<User | undefined | null> {
    return await this.userModel.findOne({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
}
