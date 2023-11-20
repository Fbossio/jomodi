import { Injectable } from '@nestjs/common';
import ShortUniqueId from 'short-unique-id';

@Injectable()
export class UuidService {
  generateUuid(): string {
    const uid = new ShortUniqueId({ length: 7 });
    return uid.randomUUID();
  }
}
