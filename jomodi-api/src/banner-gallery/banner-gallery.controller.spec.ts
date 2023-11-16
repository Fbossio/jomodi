import { Test, TestingModule } from '@nestjs/testing';
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
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BannerGalleryController>(BannerGalleryController);
    service = module.get<BannerGalleryService>(BannerGalleryService);
  });

  describe('uploadFile', () => {
    it('should call BannerGalleryService.save with the uploaded file', async () => {
      const name = 'test.jpg';
      const image = Buffer.from('test image');
      const mimeType = 'image/jpeg';
      const file = {
        originalname: name,
        buffer: image,
        mimetype: mimeType,
      } as Express.Multer.File;
      await controller.save(file);
      expect(service.save).toHaveBeenCalledWith(name, image, mimeType);
    });
  });
});
