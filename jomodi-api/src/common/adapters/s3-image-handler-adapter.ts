import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ImageStoragePort } from '../ports/image-storage';
import { UuidService } from '../uuid.service';

@Injectable()
export class S3ImageHandlerAdapter implements ImageStoragePort {
  private readonly s3Client: S3Client;
  private getS3Client(): S3Client {
    return new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
    });
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly uuidService: UuidService,
  ) {
    this.s3Client = this.getS3Client();
  }

  async save(
    name: string,
    image: Buffer,
    mimeType: string,
    prefix: string,
  ): Promise<string> {
    const uuid = this.uuidService.generateUuid();

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: `${prefix}${uuid}-${name}`,
          Body: image,
          ContentType: mimeType,
          ContentDisposition: 'inline',
        }),
      );

      const url = `https://${this.configService.getOrThrow(
        'AWS_S3_BUCKET',
      )}.s3.${this.configService.getOrThrow(
        'AWS_REGION',
      )}.amazonaws.com/${prefix}${uuid}-${name}`;
      return url;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async remove(name: string): Promise<string> {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: name,
        }),
      );
      return 'Image removed';
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
