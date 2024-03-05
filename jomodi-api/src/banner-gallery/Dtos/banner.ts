import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BannerStatus } from '../Entities/banner';

export class CreateBannerDto {
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}

export class UpdateBannerDto {
  @IsString()
  title: string;
}
