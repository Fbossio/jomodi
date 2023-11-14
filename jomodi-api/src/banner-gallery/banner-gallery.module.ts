import { Module } from '@nestjs/common';
import { BannerGalleryService } from './banner-gallery.service';
import { BannerGalleryController } from './banner-gallery.controller';

@Module({
  providers: [BannerGalleryService],
  controllers: [BannerGalleryController],
})
export class BannerGalleryModule {}
