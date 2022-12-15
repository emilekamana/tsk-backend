import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { Worker } from './interfaces/worker.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel('Worker') private workerModel: Model<Worker>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(
    createWorkerDto: CreateWorkerDto,
    image: Express.Multer.File,
  ): Promise<Worker | undefined> {
    if (image) {
      console.log(image);
      const newImage = await this.cloudinary.uploadImage(image).catch((err) => {
        console.log(err);
        throw new BadRequestException('Invalid file type.');
      });

      console.log(newImage);

      createWorkerDto.imageUrl = newImage.secure_url;
    }
    return await this.workerModel.create(createWorkerDto);
  }

  async findAll(): Promise<Worker[]> {
    return await this.workerModel.find();
  }

  async findOne(id: string): Promise<Worker | undefined | null> {
    return await this.workerModel.findOne({ _id: id });
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    return await this.workerModel.updateOne(
      { _id: id },
      { $set: updateWorkerDto },
    );
  }

  async remove(id: number) {
    return await this.workerModel.deleteOne({ _id: id });
  }
}
