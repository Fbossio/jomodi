import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { UuidService } from '../uuid.service';
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

jest.mock('../uuid.service', () => {
  return {
    UuidService: jest.fn().mockImplementation(() => {
      return {
        generateUuid: jest.fn().mockReturnValue('mocked-id'),
      };
    }),
  };
});

describe('S3ImageHandlerAdapter', () => {
  let s3ImageHandlerAdapter: S3ImageHandlerAdapter;
  let configService: ConfigService;
  let uuidService: any;
  let s3Client: S3Client;

  beforeEach(() => {
    configService = new ConfigService();
    uuidService = new UuidService();
    jest.spyOn(configService, 'getOrThrow').mockImplementation((key) => {
      if (key === 'AWS_REGION') return 'us-east-1';
      if (key === 'AWS_S3_BUCKET') return 'my-test-bucket';
    });

    s3Client = new S3Client({});
    s3ImageHandlerAdapter = new S3ImageHandlerAdapter(
      configService,
      uuidService,
    );
  });

  it('should successfully save an image', async () => {
    const name = 'test-image.jpg';
    const image = Buffer.from('test-image-data');
    const mimeType = 'image/jpeg';

    const url = await s3ImageHandlerAdapter.save(name, image, mimeType);
    const expectedKey = `banner/mocked-id-${name}`;

    expect(PutObjectCommand).toHaveBeenCalledWith({
      Bucket: 'my-test-bucket',
      Key: expectedKey,
      Body: image,
      ContentType: mimeType,
      ContentDisposition: 'inline',
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
