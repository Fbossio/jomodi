import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  getBannerData() : Observable<any> {
    const endpoint = `${this.api}/banner`;
    return this.http.get(endpoint);
  }

  updateBannerData(id: number, data: any, options: any) : Observable<any> {
    const endpoint = `${this.api}/banner/${id}`;
    return this.http.put(endpoint, data, options);
  }

  deleteBannerData(id: number, options: any) : Observable<any> {
    const endpoint = `${this.api}/banner/${id}`;
    return this.http.delete(endpoint, options);
  }

  createBanner(banner: FormData, options: any) : Observable<any> {
    const endpoint = `${this.api}/banner`;
    return this.http.post(endpoint, banner, options);
  }
}
