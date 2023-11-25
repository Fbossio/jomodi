import { Module } from '@nestjs/common';
import { DiskImageHandlerAdapter } from './adapters/disk-image-handler-adapter';
// import { S3ImageHandlerAdapter } from './adapters/s3-image-handler-adapter';
import { StringFormatter } from './string-formatter';
import { UuidService } from './uuid.service';

@Module({
  providers: [
    {
      provide: 'ImageStoragePort',
      useClass: DiskImageHandlerAdapter,
    },
    UuidService,
    StringFormatter,
  ],
  exports: ['ImageStoragePort', UuidService, StringFormatter],
})
export class CommonModule {}
