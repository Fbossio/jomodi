import { Injectable } from '@nestjs/common';
import { EncryptionPort } from '../ports/encription.port';

@Injectable()
export class BcryptAdapter implements EncryptionPort {
  hashPassword(password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
