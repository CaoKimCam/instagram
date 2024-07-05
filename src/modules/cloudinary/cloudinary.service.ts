import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier'
@Injectable()
export class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<UploadApiErrorResponse|UploadApiResponse> {
        return new Promise<UploadApiErrorResponse|UploadApiResponse>((resolve, reject) => {
          if (!file || !file.buffer) {
            return reject(new Error('Invalid file or file buffer is missing.'));
          }
          const uploadStream = v2.uploader.upload_stream(
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );
    
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
      }
}
