import { Expose } from 'class-transformer';

export class BannerDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  imageUrl: string;
}

export class BannerAdminDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  imageUrl: string;
  @Expose()
  status: string;
  @Expose()
  createdAt: string;
  @Expose()
  updatedAt: string;
}
