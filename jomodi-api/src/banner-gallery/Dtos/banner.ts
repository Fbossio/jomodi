import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BannerStatus } from '../Entities/banner';

export class CreateBannerDto {
  @ApiProperty({ example: 'Banner Title' })
  @IsString()
  title: string;
  @ApiProperty({ example: 'https://www.example.com/image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}

export class UpdateBannerDto {
  @ApiProperty({ example: 'Banner Title' })
  @IsString()
  title: string;
}
