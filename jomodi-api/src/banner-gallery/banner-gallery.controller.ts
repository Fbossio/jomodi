import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateBannerDto } from './Dtos/banner';
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

  @Get('admin')
  listAdmin(@Query('month') month?: string, @Query('year') year?: string) {
    const monthInt = month ? parseInt(month, 10) : undefined;
    const yearInt = year ? parseInt(year, 10) : undefined;
    return this.bannerGalleryService.listAdmin(monthInt, yearInt);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerGalleryService.remove(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() banner: UpdateBannerDto) {
    return this.bannerGalleryService.update(id, banner);
  }
}
