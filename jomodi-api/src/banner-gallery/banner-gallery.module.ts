import { Module } from '@nestjs/common';
import { DiskImageHandlerAdapter } from './adapters/disk-image-handler-adapter';
// import { S3ImageHandlerAdapter } from './adapters/s3-image-handler-adapter';
import { BannerGalleryController } from './banner-gallery.controller';
import { BannerGalleryService } from './banner-gallery.service';
import { UuidService } from './uuid.service';

@Module({
  providers: [
    BannerGalleryService,
    UuidService,
    {
      provide: 'ImageStoragePort',
      useClass: DiskImageHandlerAdapter,
    },
  ],
  controllers: [BannerGalleryController],
})
export class BannerGalleryModule {}
