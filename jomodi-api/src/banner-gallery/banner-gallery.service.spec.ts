import { BannerGalleryService } from './banner-gallery.service';
import { ImageStoragePort } from './ports/image-storage';

describe('BannerGalleryService', () => {
  let service: BannerGalleryService;
  let mockImageStoragePort: jest.Mocked<ImageStoragePort>;

  beforeEach(async () => {
    mockImageStoragePort = {
      save: jest.fn().mockResolvedValue('mocked-url'),
      remove: jest.fn().mockResolvedValue('mocked-remove'),
      list: jest.fn().mockResolvedValue(['mocked-list']),
    };

    service = new BannerGalleryService(mockImageStoragePort as any);
  });

  describe('save', () => {
    it('should call imageStoragePort.save with the correct arguments', async () => {
      const name = 'test.jpg';
      const image = Buffer.from('test image');

      await service.save(name, image);

      expect(mockImageStoragePort.save).toHaveBeenCalledWith(name, image);
    });
  });

  describe('remove', () => {
    it('should call imageStoragePort.remove with the correct arguments', async () => {
      const name = 'test.jpg';

      await service.remove(name);

      expect(mockImageStoragePort.remove).toHaveBeenCalledWith(name);
    });
  });

  describe('list', () => {
    it('should call imageStoragePort.list', async () => {
      await service.list();

      expect(mockImageStoragePort.list).toHaveBeenCalled();
    });
  });
});
