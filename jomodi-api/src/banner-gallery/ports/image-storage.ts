export interface ImageStoragePort {
  save(name: string, image: Buffer, mimeType: string): Promise<string>;
  remove(name: string): Promise<string>;
  list(): Promise<string[]>;
}
