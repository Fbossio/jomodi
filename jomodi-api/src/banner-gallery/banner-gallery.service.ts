import { Inject, Injectable } from '@nestjs/common';
import { UpdateBannerDto } from './Dtos/banner';
import { Banner } from './Entities/banner';
import { BannerRepository } from './ports/banner-repository';
import { ImageStoragePort } from './ports/image-storage';

@Injectable()
export class BannerGalleryService {
  constructor(
    @Inject('ImageStoragePort')
    private readonly imageStoragePort: ImageStoragePort,
    @Inject('BannerRepository')
    private readonly bannerRepository: BannerRepository,
  ) {}

  async save(name: string, image: Buffer, mimeType: string): Promise<Banner> {
    const savedImage = await this.imageStoragePort.save(name, image, mimeType);
    const banner = await this.bannerRepository.create({ imageUrl: savedImage });
    return banner;
  }

  async remove(id: string): Promise<Banner> {
    const banner = await this.bannerRepository.findOne(id);
    const regex = /banner-.*/;
    const imageName = banner.imageUrl.match(regex)[0];
    await this.imageStoragePort.remove(imageName);
    return this.bannerRepository.remove(id);
  }

  async list(): Promise<Banner[]> {
    return this.bannerRepository.findAll();
  }

  async listAdmin(): Promise<Banner[]> {
    return this.bannerRepository.findAllAdmin();
  }

  async update(id: string, banner: UpdateBannerDto): Promise<Banner> {
    return this.bannerRepository.update(id, banner);
  }
}
