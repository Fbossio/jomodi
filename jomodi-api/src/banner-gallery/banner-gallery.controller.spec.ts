import { Test, TestingModule } from '@nestjs/testing';
import { BannerGalleryController } from './banner-gallery.controller';

describe('BannerGalleryController', () => {
  let controller: BannerGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerGalleryController],
    }).compile();

    controller = module.get<BannerGalleryController>(BannerGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
