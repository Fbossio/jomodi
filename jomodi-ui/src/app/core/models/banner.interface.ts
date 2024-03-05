export interface Banner {
  id: number;
  title: string;
  imageUrl: string;
}

export interface CreateBanner {
  title: string;
  imageUrl: string;
}

export interface UpdateBanner {
  title: string;
}
