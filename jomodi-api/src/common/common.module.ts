import { Module } from '@nestjs/common';
import { BcryptAdapter } from './adapters/bcrypt.adapter';
// import { DiskImageHandlerAdapter } from './adapters/disk-image-handler-adapter';
import { S3ImageHandlerAdapter } from './adapters/s3-image-handler-adapter';
import { StringFormatter } from './string-formatter';
import { UuidService } from './uuid.service';

@Module({
  providers: [
    {
      provide: 'ImageStoragePort',
      useClass: S3ImageHandlerAdapter,
    },
    UuidService,
    StringFormatter,
    {
      provide: 'EncryptionPort',
      useClass: BcryptAdapter,
    },
  ],
  exports: ['ImageStoragePort', UuidService, StringFormatter, 'EncryptionPort'],
})
export class CommonModule {}
