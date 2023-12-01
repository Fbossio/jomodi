export class Banner {
  id: number;
  title: string;
  imageUrl: string;
  status: BannerStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(banner: Partial<Banner>) {
    Object.assign(this, banner);
  }
}

export enum BannerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
