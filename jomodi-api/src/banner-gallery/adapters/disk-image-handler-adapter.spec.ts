import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import { DiskImageHandlerAdapter } from './disk-image-handler-adapter';

describe('DiskImageHandlerAdapter', () => {
  let adapter: DiskImageHandlerAdapter;
  const imageDir = path.join(__dirname, '..', 'assets');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiskImageHandlerAdapter],
    }).compile();

    adapter = module.get<DiskImageHandlerAdapter>(DiskImageHandlerAdapter);
  });

  afterEach(async () => {
    // delete all files in the imageDir
    const files = await fs.promises.readdir(imageDir);
    for (const file of files) {
      await fs.promises.unlink(path.join(imageDir, file));
    }
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('save', () => {
    it('should save an image', async () => {
      const name = 'test-image.png';
      const image = Buffer.from('test-image-data');

      const result = await adapter.save(name, image);

      expect(result).toBe(path.join(imageDir, name));
    });
  });

  describe('remove', () => {
    it('should remove an image', async () => {
      const name = 'test-image.png';
      const image = Buffer.from('test-image-data');

      await adapter.save(name, image);

      const result = await adapter.remove(name);

      expect(result).toEqual('Image removed');
    });
  });

  describe('list', () => {
    it('should list all images', async () => {
      const name = 'test-image.png';
      const image = Buffer.from('test-image-data');

      await adapter.save(name, image);

      const result = await adapter.list();

      expect(result).toEqual([name]);
    });
  });
});
