import { Injectable } from '@nestjs/common';

@Injectable()
export class StringFormatter {
  fileNameFormat(fileName: string): string {
    return fileName.trim().replace(/\s+/g, '-').toLowerCase();
  }

  extractSubstring(originalString: string, pattern: string): string | null {
    const regex = new RegExp(`${pattern}-.*`);
    const match = originalString.match(regex);

    return match ? match[0] : null;
  }
}
