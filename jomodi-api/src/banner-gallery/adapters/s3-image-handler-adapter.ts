import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { nanoid } from 'nanoid';
import { ImageStoragePort } from '../ports/image-storage';

@Injectable()
export class S3ImageHandlerAdapter implements ImageStoragePort {
  private readonly prefix = 'banner/';
  private readonly delimiter = '/';
  private readonly s3Client: S3Client;
  private getS3Client(): S3Client {
    return new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
    });
  }

  constructor(private readonly configService: ConfigService) {
    this.s3Client = this.getS3Client();
  }
  async save(name: string, image: Buffer): Promise<string> {
    const suffix = nanoid(7);
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
          Key: `${this.prefix}${name}-${suffix}`,
          Body: image,
        }),
      );

      const url = `https://${this.configService.getOrThrow(
        'AWS_S3_BUCKET',
      )}.s3.${this.configService.getOrThrow('AWS_REGION')}.amazonaws.com/${
        this.prefix
      }${name}-${suffix}`;
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
          Key: `${this.prefix}${name}`,
        }),
      );
      return 'Image removed';
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async list(): Promise<string[]> {
    try {
      const command = new ListObjectsCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Delimiter: this.delimiter,
        Prefix: this.prefix,
      });
      const response = await this.s3Client.send(command);
      return (
        response.Contents?.map((item) => {
          return `https://${this.configService.getOrThrow(
            'AWS_S3_BUCKET',
          )}.s3.${this.configService.getOrThrow('AWS_REGION')}.amazonaws.com/${
            item.Key
          }`;
        }) || []
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
