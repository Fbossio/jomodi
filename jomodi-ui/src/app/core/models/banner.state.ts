import { Banner } from "./banner.interface";

export interface BannerState {
  loading: boolean;
  banners: ReadonlyArray<Banner>
}
