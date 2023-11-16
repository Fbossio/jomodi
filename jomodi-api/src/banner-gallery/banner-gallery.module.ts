import { Module } from '@nestjs/common';
import { DiskImageHandlerAdapter } from './adapters/disk-image-handler-adapter';
import { BannerGalleryController } from './banner-gallery.controller';
import { BannerGalleryService } from './banner-gallery.service';

@Module({
  providers: [
    BannerGalleryService,
    {
      provide: 'ImageStoragePort',
      useClass: DiskImageHandlerAdapter,
    },
  ],
  controllers: [BannerGalleryController, ,],
})
export class BannerGalleryModule {}
