import { Injectable } from '@nestjs/common';
import { ImageStoragePort } from '../ports/image-storage';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DiskImageHandlerAdapter implements ImageStoragePort {
  private readonly imageDir = path.join(__dirname, '..', 'assets');

  async save(name: string, image: Buffer): Promise<string> {
    try {
      await fs.promises.writeFile(path.join(this.imageDir, name), image);
      return Promise.resolve(path.join(this.imageDir, name));
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

  async list(): Promise<string[]> {
    try {
      const files = await fs.promises.readdir(this.imageDir);
      return files;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
