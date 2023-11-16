import { UuidService } from './uuid.service';

describe('UuidService', () => {
  let uuidService: UuidService;

  beforeEach(() => {
    uuidService = new UuidService();
  });

  it('should generate a UUID', () => {
    const uuid = uuidService.generateUuid();
    expect(typeof uuid).toBe('string');
  });
});
