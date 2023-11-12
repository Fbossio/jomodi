import { Test, TestingModule } from '@nestjs/testing';
import { BannerGalleryService } from './banner-gallery.service';

describe('BannerGalleryService', () => {
  let service: BannerGalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerGalleryService],
    }).compile();

    service = module.get<BannerGalleryService>(BannerGalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
