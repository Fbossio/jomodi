import {
  Controller,
  Delete,
  Get,
  Post,
  Query,
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

  @Get()
  list() {
    return this.bannerGalleryService.list();
  }

  @Delete()
  remove(@Query('name') name: string) {
    return this.bannerGalleryService.remove(name);
  }
}
