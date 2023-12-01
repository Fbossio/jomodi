import { Inject, Injectable } from '@nestjs/common';
import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../common/string-formatter';
import { CreateBannerDto, UpdateBannerDto } from './Dtos/banner';
import { Banner } from './Entities/banner';
import { BannerRepository } from './ports/banner-repository';

@Injectable()
export class BannerGalleryService {
  constructor(
    @Inject('ImageStoragePort')
    private readonly imageStoragePort: ImageStoragePort,
    @Inject('BannerRepository')
    private readonly bannerRepository: BannerRepository,
    private readonly stringFormatter: StringFormatter,
  ) {}

  async uploadImage(
    name: string,
    image: Buffer,
    mimeType: string,
  ): Promise<string> {
    const formattedName = this.stringFormatter.fileNameFormat(name);
    const namePrefix = 'banner-';
    const savedImage = await this.imageStoragePort.save(
      formattedName,
      image,
      mimeType,
      namePrefix,
    );
    return savedImage;
  }

  async create(banner: CreateBannerDto): Promise<Banner> {
    const createdBanner = await this.bannerRepository.create(banner);
    return createdBanner;
  }

  async remove(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findOne(id);
    const imageName = this.stringFormatter.extractSubstring(
      banner.imageUrl,
      'banner',
    );
    await this.imageStoragePort.remove(imageName);
    return this.bannerRepository.remove(id);
  }

  async list(): Promise<Banner[]> {
    return this.bannerRepository.findAll();
  }

  async listAdmin(month?: number, year?: number): Promise<Banner[]> {
    return this.bannerRepository.findAllAdmin(month, year);
  }

  async update(id: string, banner: UpdateBannerDto): Promise<Banner> {
    return this.bannerRepository.update(id, banner);
  }
}
