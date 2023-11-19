import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto, UpdateBannerDto } from '../Dtos/banner';
import { Banner } from '../Entities/banner';
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
      Promise.reject(error);
    }
  }
  async findAll(): Promise<Banner[]> {
    try {
      const banners = await this.bannerRepository.find({
        where: { status: 'active' },
      });
      return banners.map((banner) => new Banner(banner));
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findAllAdmin(): Promise<Banner[]> {
    try {
      const banners = await this.bannerRepository.find();
      return banners.map((banner) => new Banner(banner));
    } catch (error) {
      Promise.reject(error);
    }
  }

  async findOne(id: string): Promise<Banner> {
    try {
      const banner = await this.bannerRepository.findOne({
        where: { id: Number(id) },
      });
      return new Banner(banner);
    } catch (error) {
      Promise.reject(error);
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
      Promise.reject(error);
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
      Promise.reject(error);
    }
  }
}
