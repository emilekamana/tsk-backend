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
    file: Express.Multer.File,
  ): Promise<Worker | undefined> {
    if (file) {
      console.log(file);
      const newImage = await this.cloudinary.uploadImage(file).catch((err) => {
        console.log(err);
        throw new BadRequestException('Invalid file type.');
      });
      console.log(newImage);
      createWorkerDto.image = {
        public_id: newImage.public_id,
        secure_url: newImage.secure_url,
        signature: newImage.signature,
      };
    }
    return await this.workerModel.create(createWorkerDto);
  }

  async findAll(): Promise<Worker[]> {
    return await this.workerModel.find();
  }

  async findOne(id: string): Promise<Worker | undefined | null> {
    return await this.workerModel.findOne({ _id: id });
  }

  async update(
    id: string,
    updateWorkerDto: UpdateWorkerDto,
    file: Express.Multer.File,
  ) {
    if (file) {
      const newImage = await this.cloudinary.uploadImage(file).catch((err) => {
        console.log(err);
        throw new BadRequestException('Invalid file type.');
      });

      console.log('new image: ', newImage);

      updateWorkerDto.image = {
        public_id: newImage.public_id,
        secure_url: newImage.secure_url,
        signature: newImage.signature,
      };
    }

    return await this.workerModel.updateOne(
      { _id: id },
      { $set: updateWorkerDto },
    );
  }

  async remove(id: number) {
    return await this.workerModel.deleteOne({ _id: id });
  }
}
