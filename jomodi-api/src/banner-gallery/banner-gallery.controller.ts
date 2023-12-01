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
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { CreateBannerDto, UpdateBannerDto } from './Dtos/banner';
import { BannerAdminDto, BannerDto } from './Dtos/banner.dto';
import { BannerGalleryService } from './banner-gallery.service';

@Controller('banner')
export class BannerGalleryController {
  constructor(private readonly bannerGalleryService: BannerGalleryService) {}

  @Post()
  @Serialize(BannerDto)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() banner: CreateBannerDto,
  ) {
    const savedImage = await this.bannerGalleryService.uploadImage(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    banner.imageUrl = savedImage;

    return this.bannerGalleryService.create(banner);
  }

  @Get()
  @Serialize(BannerDto)
  list() {
    return this.bannerGalleryService.list();
  }

  @Get('admin')
  @Serialize(BannerAdminDto)
  listAdmin(@Query('month') month?: string, @Query('year') year?: string) {
    const monthInt = month ? parseInt(month, 10) : undefined;
    const yearInt = year ? parseInt(year, 10) : undefined;
    return this.bannerGalleryService.listAdmin(monthInt, yearInt);
  }

  @Delete(':id')
  @Serialize(BannerDto)
  remove(@Param('id') id: string) {
    return this.bannerGalleryService.remove(id);
  }

  @Put(':id')
  @Serialize(BannerDto)
  update(@Param('id') id: string, @Body() banner: UpdateBannerDto) {
    return this.bannerGalleryService.update(id, banner);
  }
}
