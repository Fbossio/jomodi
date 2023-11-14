export interface ImageStoragePort {
  save(name: string, image: Buffer): Promise<string>;
  remove(name: string): Promise<string>;
  list(): Promise<string[]>;
}
