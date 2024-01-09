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
}
