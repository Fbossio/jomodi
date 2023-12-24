import * as fs from 'fs';
import { UuidService } from '../uuid.service';
import { DiskImageHandlerAdapter } from './disk-image-handler-adapter';

jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    unlink: jest.fn(),
    readdir: jest.fn().mockResolvedValue(['image1.png', 'image2.png']),
  },
}));

describe('DiskImageHandlerAdapter', () => {
  let diskImageHandlerAdapter: DiskImageHandlerAdapter;
  let mockUuidService: UuidService;
  let mockConfigService: any;

  beforeEach(() => {
    mockUuidService = { generateUuid: jest.fn().mockReturnValue('test-uuid') };
    mockConfigService = { get: jest.fn().mockReturnValue('test-path') };
    diskImageHandlerAdapter = new DiskImageHandlerAdapter(
      mockUuidService,
      mockConfigService,
    );
  });

  it('should save an image', async () => {
    const testImage = Buffer.from('test-image');
    const savedImagePath = await diskImageHandlerAdapter.save(
      'test-name',
      testImage,
      'image/png',
      'test-',
    );

    expect(mockUuidService.generateUuid).toHaveBeenCalled();
    expect(fs.promises.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('test-uuid-test-name'),
      testImage,
    );
    expect(savedImagePath).toContain('test-uuid-test-name');
  });

  it('should remove an image', async () => {
    const response = await diskImageHandlerAdapter.remove('test-image.png');

    expect(fs.promises.unlink).toHaveBeenCalledWith(
      expect.stringContaining('test-image.png'),
    );
    expect(response).toBe('Image removed');
  });

  // it('should list all images', async () => {
  //   const files = await diskImageHandlerAdapter.list();

  //   expect(fs.promises.readdir).toHaveBeenCalledWith(expect.any(String));
  //   expect(files).toEqual(['image1.png', 'image2.png']);
  // });
});
