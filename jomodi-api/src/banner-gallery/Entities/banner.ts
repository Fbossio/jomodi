export class Banner {
  id: number;
  imageUrl: string;
  status: string;

  constructor(banner: Partial<Banner>) {
    Object.assign(this, banner);
  }
}
