import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BannerStatus } from '../Entities/banner';

export class CreateBannerDto {
  @IsString()
  imageUrl: string;
  @IsOptional()
  @IsEnum(BannerStatus)
  status?: BannerStatus;
}

export class UpdateBannerDto {
  @IsEnum(BannerStatus)
  status: BannerStatus;
}
