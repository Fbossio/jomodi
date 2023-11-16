import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { S3ImageHandlerAdapter } from './s3-image-handler-adapter';

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => {
      return {
        send: jest.fn(),
      };
    }),
    PutObjectCommand: jest.fn(),
    DeleteObjectCommand: jest.fn(),
    ListObjectsCommand: jest.fn(),
  };
});

jest.mock('nanoid', () => {
  return {
    nanoid: jest.fn(() => 'mocked-id'),
  };
});

describe('S3ImageHandlerAdapter', () => {
  let s3ImageHandlerAdapter: S3ImageHandlerAdapter;
  let configService: ConfigService;
  let s3Client: S3Client;

  beforeEach(() => {
    configService = new ConfigService();
    jest.spyOn(configService, 'getOrThrow').mockImplementation((key) => {
      if (key === 'AWS_REGION') return 'us-east-1';
      if (key === 'AWS_S3_BUCKET') return 'my-test-bucket';
    });

    s3Client = new S3Client({});
    s3ImageHandlerAdapter = new S3ImageHandlerAdapter(configService);
  });

  it('should successfully save an image', async () => {
    const name = 'test-image.jpg';
    const image = Buffer.from('test-image-data');

    const url = await s3ImageHandlerAdapter.save(name, image);
    const expectedKey = `banner/${name}-mocked-id`;

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: 'my-test-bucket',
      Key: expectedKey,
      Body: image,
    });
    expect(url).toBe(
      `https://my-test-bucket.s3.us-east-1.amazonaws.com/${expectedKey}`,
    );
  });

  it('should successfully remove an image', async () => {
    const name = 'test-image.jpg';

    await s3ImageHandlerAdapter.remove(name);

    expect(DeleteObjectCommand).toHaveBeenCalledWith({
      Bucket: 'my-test-bucket',
      Key: `banner/${name}`,
    });
  });
});
