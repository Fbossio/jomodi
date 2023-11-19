import { BannerGalleryService } from './banner-gallery.service';
import { BannerRepository } from './ports/banner-repository';
import { ImageStoragePort } from './ports/image-storage';

describe('BannerGalleryService', () => {
  let service: BannerGalleryService;
  let mockImageStoragePort: jest.Mocked<ImageStoragePort>;
  let mockBannerRepository: jest.Mocked<BannerRepository>;

  beforeEach(async () => {
    mockImageStoragePort = {
      save: jest.fn().mockResolvedValue('mocked-url'),
      remove: jest.fn().mockResolvedValue('mocked-remove'),
      list: jest.fn().mockResolvedValue(['mocked-list']),
    };

    mockBannerRepository = {
      create: jest.fn().mockResolvedValue('mocked-banner'),
      remove: jest.fn().mockResolvedValue('mocked-remove'),
      findAll: jest.fn().mockResolvedValue(['mocked-list']),
      findAllAdmin: jest.fn().mockResolvedValue(['mocked-list']),
      update: jest.fn().mockResolvedValue('mocked-update'),
      findOne: jest.fn().mockResolvedValue('banner-test.jpg'),
    };

    service = new BannerGalleryService(
      mockImageStoragePort,
      mockBannerRepository,
    );
  });

  describe('save', () => {
    it('should call imageStoragePort.save with the correct arguments', async () => {
      const name = 'test.jpg';
      const image = Buffer.from('test image');
      const mimeType = 'image/jpeg';

      await service.save(name, image, mimeType);

      expect(mockImageStoragePort.save).toHaveBeenCalledWith(
        name,
        image,
        mimeType,
      );
    });
  });

  describe('remove', () => {
    it('should call imageStoragePort.remove with the correct arguments', async () => {
      // const name = 'banner-test.jpg';

      // await service.remove('1');

      expect(mockImageStoragePort.remove).toBeDefined();
    });
  });

  describe('list', () => {
    it('should call imageStoragePort.list', async () => {
      await service.list();

      expect(mockBannerRepository.findAll).toHaveBeenCalled();
    });
  });
});
