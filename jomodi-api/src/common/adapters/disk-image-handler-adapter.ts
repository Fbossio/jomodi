import { Injectable } from '@nestjs/common';
import { ImageStoragePort } from '../ports/image-storage';

import * as fs from 'fs';
import * as path from 'path';
import { UuidService } from '../uuid.service';

@Injectable()
export class DiskImageHandlerAdapter implements ImageStoragePort {
  private readonly imageDir = path.join(__dirname, '..', '..', '..', 'assets');

  constructor(private readonly uuidService: UuidService) {}

  async save(
    name: string,
    image: Buffer,
    mimeType: string,
    prefix: string,
  ): Promise<string> {
    const uuid = this.uuidService.generateUuid();
    try {
      await fs.promises.writeFile(
        path.join(this.imageDir, `${prefix}${uuid}-${name}`),
        image,
      );
      return Promise.resolve(
        path.join(this.imageDir, `${prefix}${uuid}-${name}`),
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(name: string): Promise<string> {
    try {
      await fs.promises.unlink(path.join(this.imageDir, name));
      return 'Image removed';
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
