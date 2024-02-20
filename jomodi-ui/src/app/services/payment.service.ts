import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api = environment.API_URL;

  constructor(private http: HttpClient) { }

  createPaymentIntent(orderId: string): Observable<any> {
    const endpoint = `${this.api}/payments/${orderId}`;
    return this.http.post(endpoint, {});
  }
}
