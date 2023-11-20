import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringFormatter } from '../utils/string-formatter';
import { BannerPostgresAdapter } from './adapters/banner-postgres.adapter';
import { DiskImageHandlerAdapter } from './adapters/disk-image-handler-adapter';
// import { S3ImageHandlerAdapter } from './adapters/s3-image-handler-adapter';
import { BannerGalleryController } from './banner-gallery.controller';
import { BannerGalleryService } from './banner-gallery.service';
import { BannerEntity } from './schemas/banner.schema';
import { UuidService } from './uuid.service';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity])],
  providers: [
    BannerGalleryService,
    UuidService,
    StringFormatter,
    {
      provide: 'ImageStoragePort',
      useClass: DiskImageHandlerAdapter,
    },
    {
      provide: 'BannerRepository',
      useClass: BannerPostgresAdapter,
    },
  ],
  controllers: [BannerGalleryController],
})
export class BannerGalleryModule {}
