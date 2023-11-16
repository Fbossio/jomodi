import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BannerGalleryService } from './banner-gallery.service';

@Controller('banner')
export class BannerGalleryController {
  constructor(private readonly bannerGalleryService: BannerGalleryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  save(@UploadedFile() file: Express.Multer.File) {
    return this.bannerGalleryService.save(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
  }
}
