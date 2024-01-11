import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  api = environment.API_URL;


  constructor(private http: HttpClient) { }

  getItems(page: number=1, limit:number=10): Observable<any> {
    const endpoint = `${this.api}/products/?page=${page}&limit=${limit}`
    return this.http.get(endpoint);
  }

  getItem(id: number): Observable<any> {
    const endpoint = `${this.api}/products/${id}`
    return this.http.get(endpoint);
  }
}
