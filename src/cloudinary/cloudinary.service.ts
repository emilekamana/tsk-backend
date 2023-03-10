import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { Image } from '../worker/interfaces/image.interface';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result: any) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(image: Image) {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.destroy(image.public_id, function (err, res) {
        if (err) {
          console.log(err);
          reject(err);
        }

        console.log(res);
        resolve(res);
      });
    });
  }
}
