import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  createOrder(order: any, options: any): Observable<any> {
    const endpoint = `${this.api}/orders`;
    return this.http.post(endpoint, order, options);
  }
}
