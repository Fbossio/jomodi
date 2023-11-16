import { Inject, Injectable } from '@nestjs/common';
import { ImageStoragePort } from './ports/image-storage';

@Injectable()
export class BannerGalleryService {
  constructor(
    @Inject('ImageStoragePort')
    private readonly imageStoragePort: ImageStoragePort,
  ) {}

  async save(name: string, image: Buffer, mimeType: string): Promise<string> {
    return this.imageStoragePort.save(name, image, mimeType);
  }

  async remove(name: string): Promise<string> {
    return this.imageStoragePort.remove(name);
  }

  async list(): Promise<string[]> {
    return this.imageStoragePort.list();
  }
}
