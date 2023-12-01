import { Expose } from 'class-transformer';

export class BannerDto {
  @Expose()
  id: string;
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  image: string;
  @Expose()
  link: string;
  @Expose()
  order: number;
}
