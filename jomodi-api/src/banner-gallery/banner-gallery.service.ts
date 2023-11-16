import { Injectable } from '@nestjs/common';
import { ImageStoragePort } from './ports/image-storage';

@Injectable()
export class BannerGalleryService {
  constructor(private readonly imageStoragePort: ImageStoragePort) {}

  async save(name: string, image: Buffer): Promise<string> {
    return this.imageStoragePort.save(name, image);
  }

  async remove(name: string): Promise<string> {
    return this.imageStoragePort.remove(name);
  }

  async list(): Promise<string[]> {
    return this.imageStoragePort.list();
  }
}
