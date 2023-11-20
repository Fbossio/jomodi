import { CreateBannerDto, UpdateBannerDto } from '../Dtos/banner';
import { Banner } from '../Entities/banner';

export interface BannerRepository {
  create(banner: CreateBannerDto): Promise<Banner>;
  findAll(): Promise<Banner[]>;
  findAllAdmin(month?: number, year?: number): Promise<Banner[]>;
  findOne(id: string): Promise<Banner>;
  update(id: string, banner: UpdateBannerDto): Promise<Banner>;
  remove(id: string): Promise<Banner>;
}
