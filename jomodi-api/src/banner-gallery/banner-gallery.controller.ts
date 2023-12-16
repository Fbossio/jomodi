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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Serialize } from '../common/interceptors/serialize.interceptor';
import { UserRole } from '../users/entities/user.entity';
import { CreateBannerDto, UpdateBannerDto } from './Dtos/banner';
import { BannerDto } from './Dtos/banner.dto';
import { BannerGalleryService } from './banner-gallery.service';

@Controller('banner')
@Serialize(BannerDto)
export class BannerGalleryController {
  constructor(private readonly bannerGalleryService: BannerGalleryService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile()
    file: Express.Multer.File,
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
  list() {
    return this.bannerGalleryService.list();
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  listAdmin(@Query('month') month?: string, @Query('year') year?: string) {
    const monthInt = month ? parseInt(month, 10) : undefined;
    const yearInt = year ? parseInt(year, 10) : undefined;
    return this.bannerGalleryService.listAdmin(monthInt, yearInt);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.bannerGalleryService.remove(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() banner: UpdateBannerDto) {
    return this.bannerGalleryService.update(id, banner);
  }
}
