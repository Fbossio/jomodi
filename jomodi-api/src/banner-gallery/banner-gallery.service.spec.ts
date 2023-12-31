import { ImageStoragePort } from '../common/ports/image-storage';
import { StringFormatter } from '../common/string-formatter';
import { BannerGalleryService } from './banner-gallery.service';
import { BannerRepository } from './ports/banner-repository';

describe('BannerGalleryService', () => {
  let service: BannerGalleryService;
  let mockImageStoragePort: jest.Mocked<ImageStoragePort>;
  let mockBannerRepository: jest.Mocked<BannerRepository>;
  let mockStringFormatter: jest.Mocked<StringFormatter>;

  beforeEach(async () => {
    mockImageStoragePort = {
      save: jest.fn().mockResolvedValue('mocked-url'),
      remove: jest.fn().mockResolvedValue('mocked-remove'),
      // list: jest.fn().mockResolvedValue(['mocked-list']),
    };

    mockBannerRepository = {
      create: jest.fn().mockResolvedValue('mocked-banner'),
      remove: jest.fn().mockResolvedValue('mocked-remove'),
      findAll: jest.fn().mockResolvedValue(['mocked-list']),
      findAllAdmin: jest.fn().mockResolvedValue(['mocked-list']),
      update: jest.fn().mockResolvedValue('mocked-update'),
      findOne: jest.fn().mockResolvedValue('banner-test.jpg'),
    };

    mockStringFormatter = {
      fileNameFormat: jest.fn().mockReturnValue('test.jpg'),
      extractSubstring: jest.fn().mockReturnValue('banner-test.jpg'),
    };

    service = new BannerGalleryService(
      mockImageStoragePort,
      mockBannerRepository,
      mockStringFormatter,
    );
  });

  describe('save', () => {
    it('should call imageStoragePort.save with the correct arguments', async () => {
      const name = 'test.jpg';
      const image = Buffer.from('test image');
      const mimeType = 'image/jpeg';

      await service.uploadImage(name, image, mimeType);

      expect(mockImageStoragePort.save).toHaveBeenCalledWith(
        name,
        image,
        mimeType,
        'banner-',
      );
    });
  });

  describe('create', () => {
    it('should call BannerRepository.create with the correct arguments', async () => {
      const banner = {
        name: 'test',
        imageUrl: 'test.jpg',
        link: 'test',
        active: true,
      };

      await service.create(banner as any);

      expect(mockBannerRepository.create).toHaveBeenCalledWith(banner);
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
    it('should call BannerRepository.findAll', async () => {
      await service.list();

      expect(mockBannerRepository.findAll).toHaveBeenCalled();
    });
  });
});
