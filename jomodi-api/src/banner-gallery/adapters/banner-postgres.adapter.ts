import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto, UpdateBannerDto } from '../Dtos/banner';
import { Banner, BannerStatus } from '../Entities/banner';
import { BannerRepository } from '../ports/banner-repository';
import { BannerEntity } from '../schemas/banner.schema';

@Injectable()
export class BannerPostgresAdapter implements BannerRepository {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
  ) {}
  async create(banner: CreateBannerDto): Promise<Banner> {
    const createdBanner = this.bannerRepository.create(banner);
    try {
      await this.bannerRepository.save(createdBanner);
      return new Banner(createdBanner);
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<Banner[]> {
    try {
      const banners = await this.bannerRepository.find({
        where: { status: BannerStatus.ACTIVE },
      });
      return banners.map((banner) => new Banner(banner));
    } catch (error) {
      throw error;
    }
  }

  async findAllAdmin(month?: number, year?: number): Promise<Banner[]> {
    try {
      const query = this.bannerRepository.createQueryBuilder('banner');

      if (month !== undefined && year !== undefined) {
        // Case: both month and year are present
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        query.where(
          'banner.createdAt >= :startDate AND banner.createdAt <= :endDate',
          { startDate, endDate },
        );
      } else if (year !== undefined) {
        // Case: only year is present
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);
        query.where(
          'banner.createdAt >= :startDate AND banner.createdAt < :endDate',
          { startDate, endDate },
        );
      } else if (month !== undefined) {
        // Case: only month is present

        throw new Error(
          'Month provided without year. Please provide both month and year, or year only.',
        );
      }
      // Case: neither month nor year is present
      const banners = await query.getMany();
      return banners.map((banner) => new Banner(banner));
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id: Number(id) },
      });
      return new Banner(banner);
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, status: UpdateBannerDto): Promise<Banner> {
    try {
      await this.bannerRepository.update(id, status);
      const updatedBanner = await this.bannerRepository.findOne({
        where: { id: Number(id) },
      });
      return new Banner(updatedBanner);
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id: Number(id) },
      });
      await this.bannerRepository.delete(id);
      return new Banner(banner);
    } catch (error) {
      throw error;
    }
  }
}
