import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BannerGalleryModule } from './banner-gallery/banner-gallery.module';

@Module({
  imports: [BannerGalleryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
