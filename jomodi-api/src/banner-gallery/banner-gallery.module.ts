import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { StringFormatter } from '../utils/string-formatter';
import { BannerPostgresAdapter } from './adapters/banner-postgres.adapter';
import { BannerGalleryController } from './banner-gallery.controller';
import { BannerGalleryService } from './banner-gallery.service';
import { BannerEntity } from './schemas/banner.schema';

@Module({
  imports: [TypeOrmModule.forFeature([BannerEntity]), CommonModule],
  providers: [
    BannerGalleryService,
    StringFormatter,
    {
      provide: 'BannerRepository',
      useClass: BannerPostgresAdapter,
    },
  ],
  controllers: [BannerGalleryController],
})
export class BannerGalleryModule {}
