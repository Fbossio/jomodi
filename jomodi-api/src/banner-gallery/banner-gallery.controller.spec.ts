import { Test, TestingModule } from '@nestjs/testing';
import { BannerStatus } from './Entities/banner';
import { BannerGalleryController } from './banner-gallery.controller';
import { BannerGalleryService } from './banner-gallery.service';

describe('BannerGalleryController', () => {
  let controller: BannerGalleryController;
  let service: BannerGalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerGalleryController],
      providers: [
        {
          provide: BannerGalleryService,
          useValue: {
            uploadImage: jest.fn(),
            create: jest.fn(),
            list: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BannerGalleryController>(BannerGalleryController);
    service = module.get<BannerGalleryService>(BannerGalleryService);
  });

  // describe('uploadFile', () => {
  //   it('should call BannerGalleryService.save with the uploaded file', async () => {
  //     const name = 'test.jpg';
  //     const image = Buffer.from('test image');
  //     const mimeType = 'image/jpeg';
  //     const file = {
  //       originalname: name,
  //       buffer: image,
  //       mimetype: mimeType,
  //     } as Express.Multer.File;
  //     await controller.save(file);
  //     expect(service.save).toHaveBeenCalledWith(name, image, mimeType);
  //   });
  // });

  describe('create', () => {
    it('should call BannerGalleryService.save with the uploaded file', async () => {
      const name = 'test.jpg';
      const image = Buffer.from('test image');
      const mimeType = 'image/jpeg';
      const file = {
        originalname: name,
        buffer: image,
        mimetype: mimeType,
      } as Express.Multer.File;

      const mockSavedImage = 'test.jpg';
      const mockCreateBannerDto = {
        title: 'test',
        status: BannerStatus.ACTIVE,
      };
      const mockCreateBanner = {
        ...mockCreateBannerDto,
        imageUrl: mockSavedImage,
      };
      service.uploadImage = jest.fn().mockResolvedValue(mockSavedImage);
      service.create = jest.fn().mockResolvedValue(mockCreateBanner as any);

      const result = await controller.create(file, mockCreateBannerDto);
      expect(result).toEqual(mockCreateBanner);
      expect(service.uploadImage).toHaveBeenCalledWith(name, image, mimeType);
      expect(service.create).toHaveBeenCalledWith(mockCreateBannerDto);
    });
  });

  describe('list', () => {
    it('should call BannerGalleryService.list', async () => {
      await controller.list();
      expect(service.list).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should call BannerGalleryService.remove with the name', async () => {
      const name = 'test.jpg';
      await controller.remove(name);
      expect(service.remove).toHaveBeenCalledWith(name);
    });
  });
});
