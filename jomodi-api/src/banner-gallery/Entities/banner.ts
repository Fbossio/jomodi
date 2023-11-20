export class Banner {
  id: number;
  imageUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(banner: Partial<Banner>) {
    Object.assign(this, banner);
  }
}
