import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowcaseServiceService {
  api = environment.API_URL;
  endpoint = `${this.api}/products`

  constructor(private http: HttpClient) { }

  gedDataApi(): Observable<any> {
    return this.http.get(this.endpoint);
  }
}
